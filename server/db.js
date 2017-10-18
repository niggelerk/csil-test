var sql = require('mysql')
var accessData = require('../src/secret/accessData')
var shortId = require('shortid')
var pool = null

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

  saveItem (url,cb) {
    const fk_riddle = 1
    const sql = "INSERT INTO images (url,fk_riddle) VALUES ("+pool.escape(url)+","+fk_riddle+")"
    this.query(sql,cb)
  }

  createNewRiddle (cb) {
    const shortid = shortId.generate()
    const sql = "INSERT INTO riddles (shortid) VALUES ("+pool.escape(shortid)+")"
    this.query(sql,() => {
      cb(shortid)
    })
  }

}











module.exports = Database
