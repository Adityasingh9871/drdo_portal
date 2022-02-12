const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv').config()


const app = express()
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({



    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE


})





app.get('/data2', (req, res) => {
    const item = req.query.item
    const counter=req.query.counter
    var qry = "select * from data where author like '%"+item+"%' or title like '%"+item+"%' order by author limit 15 offset "+counter+" ;"
    db.query(qry, (err, result) => {
        if (err)
        {
            console.log(err)
        }
        else {
            return res.send(result)
        }
    })

})


app.get('/data', (req, res) => {
    const item = req.query.item
    var qry = "select * from data where author like '%"+item+"%' or title like '%"+item+"%' order by author limit 15  ;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            return res.send(result)
        }
    })
})

app.get('/total_pages', (req, res) => {
    const item = req.query.item
    var qry = "select count(*) as total from data where author like '%"+item+"%' or title like '%"+item+"%' ;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            return res.send(result)
        }
    })
})
app.get('/data_default', (req, res) => {
    const item = req.query.item
    var qry = "select * from data order by year desc limit 15 ;"
    db.query(qry,[item], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            return res.send(result)
        }
    })
})



app.get('/', (req, res) => {
    res.send('server running')
})

app.listen(3001, () => {
    console.log('server running')
})
