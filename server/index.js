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


app.get('/data', (req, res) => {
    const item = req.query.item
    var qry = "select * from data where author like '%"+item+"%' or title like '%"+item+"%' order by author ;"
    db.query(qry, (err, result) => {
        
        if(err)
        {
            return res.status(404).send("nothing found")
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
            return res.send(404)
        }
        else {
            return res.send(result)
        }
    })
})

app.get('/recomend', (req, res) => {
    const item = req.query.item
    var qry = "select title from data where author like '%"+item+"%' or title like '%"+item+"%' order by author limit 5 ;"
    db.query(qry, (err, result) => {
        
        if(err)
        {
            return res.status(404).send("nothing found")
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
