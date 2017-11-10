import {observable,action} from 'mobx'
import sha1 from 'sha1'
import superagent from 'superagent'
import accessData from '../secret/accessData.json'
import fetch from 'isomorphic-fetch'
import { getUrlParameter } from '../utils/utils'


class DataStoreEditor {

 constructor(storeUIEditor) {
   this.storeUIEditor = storeUIEditor
 }

 @observable riddleId
 @observable shortId
 @observable history
 @observable items = []
 @observable isDeleted = false

 @action.bound removeItem(indexToRemove) {
  if (this.items.length !== 0) {
   let indexToDelete = 0
   for (let i = 0; i < this.items.length; i++) {
     let item = this.items[i]
     if (item.id === indexToRemove) {
       indexToDelete = i
       break
     }
   }
   this.items.splice(indexToDelete, 1)
  }
 }

 @action.bound setHistory (history) {
   this.history = history
 }

 @action.bound setShortId (shortId) {
   this.shortId = shortId
 }

 @action.bound deleteShortId () {
   this.shortId = null
   this.history.push({
     search:''
   })
 }

 @action.bound checkRiddle (cb) {
   const riddleShortId = getUrlParameter('r')

   if (riddleShortId && riddleShortId !== '' && (this.isDeleted == false)) {
     // get riddle content from server
    this.setShortId(riddleShortId)
    this.getRiddle(riddleShortId)

    if (this.checkDeletion(riddleShortId)) {
     this.isDeleted = true
    }
   }  else {
     // create new riddle on server
     this.createNewRiddle( (shortId) => {
      this.setShortId(shortId)
      if (cb) cb()
     })
   }
 }

 @action.bound checkDeletion(riddleShortId){
   fetch('/api/riddle/checkDeletion', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({shortId:this.shortId})
   })
   .then((resp) => resp.json())
   .then((data) => {
     if (data.deleted) {
       this.isDeleted = true
     }
   })
 }

 @action.bound deleteRiddle() {
   if (this.shortId && this.shortId !== '') {
     fetch('/api/riddle/delete', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({shortId:this.shortId})
     })
     .then((resp) => resp.json())
     .then((data) => {
       if (data.success) {
         this.isDeleted = true
         this.deleteShortId()
       }
     })
   }
 }

 @action.bound getRiddle (shortId) {
   fetch('/api/riddle/get', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({shortId:shortId})
   })
   .then((resp) => resp.json())
   .then((data) => {
     if (data && data.items) {
       this.items = data.items
     }
   })
 }

 @action.bound createNewRiddle(cb){
   fetch('/api/riddle/create', {
     method: 'GET'
   })
   .then((resp) => resp.json())
   .then((data) => {
     this.history.replace({
       search: '?r='+data.shortId
     })
     this.isDeleted = false
     cb(data.shortId)
   })
 }

 @action.bound uploadItemToServer (url,cb) {
   fetch('/api/editor/upload', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({url:url,shortId:this.shortId})
   })
   .then((resp) => resp.json())
   .then((data) => {
    if (data.success) {
      cb(data.itemId)
    }
   })
 }

 @action.bound uploadFile(files) {
  this.storeUIEditor.toggleItemLoading()

  const
   image = files[0],
   cloudName = accessData.cloudinary.cloudName,
   url = "https://api.cloudinary.com/v1_1/" + cloudName + '/image/upload',
   timestamp = Date.now() / 1000,
   uploadPreset = accessData.cloudinary.uploadPreset,
   paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + accessData.cloudinary.paramsStrPart,
   signature = sha1(paramsStr),
   params = {
    'api_key': accessData.cloudinary.api_key,
    'timestamp': timestamp,
    'upload_preset': uploadPreset,
    'signature': signature
   }
  let uploadRequest = superagent.post(url)
  uploadRequest.attach('file', image)
  Object.keys(params).forEach((key) => {uploadRequest.field(key, params[key])})
  uploadRequest.end((err, resp) => {
   if (err) { console.log(err); return }

    // image to db
    this.uploadItemToServer(resp.body.secure_url, (itemId) => {
      // upload succeeded, create image in RAM
      var img = new Image()
      img.onload = () => {
       // image finished loading, push to items
       this.addItem(resp.body.secure_url,itemId)
       this.storeUIEditor.toggleItemLoading()
      }
      img.src = resp.body.secure_url
    })
  })
 }

 @action.bound addItem (url,id) {
   this.items.push({url:url,id:id})
 }

 @action.bound turnRight(url, id){
  let urlString = url
  let urlBeginning = "https://res.cloudinary.com/niggelerk/image/upload/"
  let urlParameter = "a_90"
  let urlArray = urlString.split("/")
  let urlEnd = "/" + urlArray[6]+"/"+urlArray[7]
  let modifiedUrl = urlBeginning+urlParameter+urlEnd
  this.items[id-1] = {url: modifiedUrl, id: id}
 }

 @action.bound swapItems(obj) {
  const array = this.items.slice(0), newIndex = obj.newIndex, previousIndex = obj.oldIndex
  if (newIndex >= array.length) {
    let k = newIndex - array.length
    while (k-- + 1) {
      array.push(undefined)
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0])
  this.items = array
 }

 @action.bound deleteItem(id, shortId, cb){
   fetch('/api/editor/deleteImage', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({id:id, shortId:shortId})
   })
   .then((resp) => resp.json())
   .then((data) => {
     this.removeItem(id)
    if (cb) cb()
   })
 }

}

export default DataStoreEditor
