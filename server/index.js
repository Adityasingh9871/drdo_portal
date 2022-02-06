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





app.post('/data2', (req, res) => {
    const user = req.body.user
    const id = req.body.product_id
    const pname = req.body.product_name
    const stock = req.body.stock
    var qry = "select * from data;"
    db.query(qry, (err, result) => {
        if (err)
        {
            console.log(err)
        }
        else {
            return res.send("hello")
        }
    })

})


app.get('/data', (req, res) => {
    const item = req.query.item
    var qry = "select * from data where author like '%"+item+"%';"
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
