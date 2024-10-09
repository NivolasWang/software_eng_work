const mysql = require('mysql2')

const Time = require('./dateFormat')

//请提前创建一个名叫informations，包含ID,name,age,phone,gender,time属性的mysql表
const client = mysql.createPool({
  host: '127.0.0.1',
  user: '',//输入mysql用户名
  password: '',//输入mysql密码
  database: ''//输入mysql所使用数据库名
})

function get_sql(callback) {
  let sqlStr = 'select * from informations'
  client.query(sqlStr, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

//{ ID: 1, name: 'Peter Griffin', age: 35, phone: 1111111, gender: 1, time: '2024:02:01' }

function post_sql(callback, data) {
  let sqlStr = 'INSERT INTO informations (name,age,phone,gender,time) VALUES(?,?,?,?,?)'

  const dt = new Date()
  const Format_dt = Time.dateFormat(dt)
  client.query(sqlStr, [data.name, data.age, data.phone, data.gender, Format_dt], (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
    }
    else {
      callback(null, results)
    }
  })
}

function delete_sql(callback, id) {

  let sqlStr = 'DELETE FROM informations WHERE id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function find_sql(callback, id) {
  let sqlStr = 'select * from informations WHERE id=?'
  client.query(sqlStr, id, (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

function patch_sql(callback, data) {
  const dt = new Date()
  const Format_dt = Time.dateFormat(dt)
  let sqlStr = 'update informations set name=?,age=?,phone=?,gender=?,time=? where id=?'

  client.query(sqlStr, [data.name, data.age, data.phone, data.gender, Format_dt, data.ID], (err, results) => {
    if (err) {
      console.log('Database query error:', err.message)
      callback(err, null)
    }
    else {
      callback(null, results)
    }
  })
}

module.exports = {
  get_sql,
  post_sql,
  delete_sql,
  find_sql,
  patch_sql
}