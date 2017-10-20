const express = require('express');
const app = express.Router();
const path = require('path')
const Database = require('./db'), db = new Database()
const bodyParser = require('body-parser')
const success = {success:true}, fail = {success:false}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/editor/upload', (req,res) => {
 const url = req.body.url ? req.body.url : ''
 const shortId = req.body.shortId ? req.body.shortId : ''

 if ((url && url !== '') &&(shortId && shortId !== '')) {
   db.saveItem(url, shortId, (itemId) => {
     res.json({success:true,itemId:itemId})
   })
 } else res.json(fail)
})

app.get('/api/riddle/create', (req,res) => {
  db.createNewRiddle( (shortId) => {
    res.json({shortId:shortId})
  })
})

app.post('/api/riddle/get', (req,res) => {
  const shortId = req.body.shortId ? req.body.shortId : ''

  if (shortId && shortId !== '') {
    db.getRiddle(shortId, (riddle) => {
      res.json(riddle)
    })
  } else res.json(fail)
})

// wildcard route (needed for browserhistory on react spa pattern)
app.get('*', function(req, res) {
 res.sendFile(path.resolve(__dirname, '../', 'index.html'))
})
module.exports = app
