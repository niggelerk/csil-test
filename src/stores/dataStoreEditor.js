import {observable,action,toJS} from 'mobx'
import sha1 from 'sha1'
import superagent from 'superagent'
import {inject,observer} from 'mobx-react'
import accessData from '../secret/accessData.json'
import fetch from 'isomorphic-fetch'

class DataStoreEditor {
 constructor(storeUIEditor) {
   this.storeUIEditor = storeUIEditor
 }

 riddleId

 @observable items = [
  {url:"http://thecatapi.com/api/images/get?format=src&type=gif", id: 1},
  {url:"http://thecatapi.com/api/images/get?format=src&type=gif", id: 2},
  {url:"http://www.lastwordonnothing.com/wp-content/uploads/2013/08/dophin-sci-fi.jpg", id: 3},
  {url:"http://thecatapi.com/api/images/get?format=src&type=gif", id: 4}
 ]

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

 createNewRiddle(){
   fetch('/api/riddle/create', {
     method: 'GET'
   })
 }

 uploadItemToServer (url) {
   fetch('/api/editor/upload', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({url:url,riddleId:this.riddleId})
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
    this.uploadItemToServer(resp.body.secure_url)

   // upload succeeded, create image in RAM
   var img = new Image()
   img.onload = () => {
    // image finished loading, push to items
    this.items.push({url:resp.body.secure_url, id:5})
    this.storeUIEditor.toggleItemLoading()
   }
   img.src = resp.body.secure_url
  })
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

}

export default DataStoreEditor
