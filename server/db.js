const sql = require('mysql')
const accessData = require('../src/secret/accessData')
const shortId = require('shortid')
const async = require('async')

let pool = null

if (!pool) {
 pool = sql.createPool({
  host     : '127.0.0.1',
  user     : accessData.myPhpAdmin.username,
  password : accessData.myPhpAdmin.password,
  database : accessData.myPhpAdmin.database
 })
}

class Database {
  constructor () {
  }

  query (sql,cb) {
   pool.query(sql,function (err,results) {
    return cb(err,results)
   })
  }

  saveItem (url, shortId, cb) {
    const fk_riddleShortId = shortId
    const sql = "INSERT INTO items (url, fk_riddleShortId) VALUES ("+pool.escape(url)+","+pool.escape(fk_riddleShortId)+")"
    this.query(sql,(err,result) => {
      cb(result.insertId)
    })
  }

  createNewRiddle (cb) {
    const shortid = shortId.generate()
    const sql = "INSERT INTO riddles (shortid,lastupdate) VALUES ("+pool.escape(shortid)+",NOW())"
    this.query(sql,() => {
      cb(shortid)
    })
  }

  getRiddle (shortId,cb) {
   this.getRiddleByShortId(shortId, (riddle) => {
     this.getRiddleItemsByShortId(shortId, (items) => {

       cb({
         riddle:riddle,
         items:items
       })

     })
   })
  }

  getRiddleByShortId (shortId,cb) {
    const sql = "SELECT created,lastupdate FROM riddles WHERE shortid = " + pool.escape(shortId)
    this.query(sql,(err,results) => {
      if (results && results.length === 1) {
        cb(results[0])
      } else cb(null)
    })
  }

  getRiddleItemsByShortId (shortId,cb) {
    const sql = "SELECT id,url FROM items WHERE fk_riddleShortId = " + pool.escape(shortId)
    this.query(sql,(err,results) => {
      if (results && results.length > 0) {
        cb(results)
      } else cb(null)
    })
  }

  deleteRiddle (shortId,cb) {
    const sql = "Update riddles SET deleted = 1 WHERE shortid="+pool.escape(shortId)
    this.query(sql, cb)
  }

  checkDeletion (shortId, cb) {
    const sql = "SELECT deleted FROM items WHERE shortid="+pool.escape(shortId)
    this.query(sql, cb)
  }

}


module.exports = Database
