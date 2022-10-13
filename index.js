const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 7000

require('dotenv/config')

app.use(express.static("assets"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')



app.get('/',(req, res)=>{
    res.render("index.ejs")
})

app.get('/todo',(req, res)=>{
    res.render('todo.ejs')
})
app.get('/lemme',(req, res)=>{
    res.render('lemme.ejs')
})
app.listen(port,()=>console.log(`live on ${port}`))