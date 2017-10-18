var express = require('express');
var app = express.Router();
var path = require('path')
var DB = require('./db'), db = new DB()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/editor/upload', (req,res) => {
 const url = req.body.url ? req.body.url : ''
 if (url && url !== '') {
   db.saveItem(url, () => {
     res.json()
   })
 } res.json()
})

app.get('/api/riddle/create', (req,res) => {
  db.createNewRiddle( (shortid) => {
    res.json({shortid:shortid})
  })
})


// wildcard route (needed for browserhistory on react spa pattern)
app.get('*', function(req, res) {
 res.sendFile(path.resolve(__dirname, '../', 'index.html'))
})
module.exports = app
