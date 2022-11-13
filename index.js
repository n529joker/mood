const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Todo, Dairy} = require('./model_todo')
const connectDB = require('./db.js')
 
const app = express()
const port = process.env.PORT || 7000
require('dotenv/config')

app.use(express.static("assets"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

//connectDB
connectDB()

app.get('/',(req, res)=>{
    res.render("index.ejs")
})

app.get('/todo',async(req, res, next)=>{
   let data = await Todo.find({})
    if(data.length==0){
         res.render('todo.ejs') 
         return
    }else{
         res.render('todo.ejs',{items: data})
         return
    }
    if(req.query.delid){
        await Todo.deleteOne({_id:req.query.delid})
        res.render('todo.ejs',{items: data})
    }
    
    next()
})
app.get('/timer',(req, res, next)=>{
   res.render('timer.ejs')
   next()
})
app.get('/lemme',(req, res, next)=>{
    res.render('lemme.ejs')
    next()
})
app.post('/todo',async(req, res)=>{
    let {task,time} = req.body
    let todo = {task, time}

    await Todo.create(todo, (err, item)=>{ 
        if(err){
            console.log(err) 
        }else{
            item.save() 
            res.redirect('/todo')
        }
    }) 
})
app.post('/lemme',find,async(req, res, next)=>{
    let {activity, events, ideas, progress, asides, sticker} = req.body
    let today={activity,events,ideas,progress,asides}
    await Dairy.create(today, (err, item)=>{ 
        if(err){
            console.log(err) 
        }else{
            item.save() 
            res.redirect('/lemme')
        }
    }) 
    next()
})

app.get('*',(req, res)=>{
    res.status(404).send('Page not found')
})

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(port,()=>console.log(`live on ${port}`))
})


function find(req, res, next){
let url = req.originalUrl
let date = new Date().toISOString()
console.log(url, date)
next()
}