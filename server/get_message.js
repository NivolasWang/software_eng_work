const express = require('express')
const mysql = require('mysql2')
const router = express.Router()

const sql_function = require('./mysql')

//取数据
router.get('/get', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql_function.get_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log(results)
      res.send(results)
    }
  })
})


// const data = { ID: 7, name: 'Peter Griffin', age: 35, phone: 1111111, gender: 1, time: '2024:02:01' }
//存数据
router.post('/post', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body)
  sql_function.post_sql((err, results) => {
    if (err) {
      console.error('Error fetching data')
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("存储成功")
      res.send("存储成功")
      console.log('-------------------------------------')
    }
  }, req.body)
})


//删数据
router.delete('/delete', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.body.id
  console.log(id)

  sql_function.delete_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("删除成功")
      res.send("删除成功")
      console.log('-------------------------------------')
    }
  }, id)
})

router.get('/find', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let id = req.query.id
  console.log(id)

  sql_function.find_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("寻找成功")
      res.send(results)
    }
  }, id)
})

// const data = { ID: 53, name: '3Peter ', age: 3, phone: 3, gender: 1, time: '2024:02:01' }
router.post('/patch', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body)

  sql_function.patch_sql((err, results) => {
    if (err) {
      console.error('Error fetching data:', err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log("替换成功")
      res.send(results)
    }
  }, req.body)
})


module.exports = router