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
    data.length==0? res.render('todo.ejs') : res.render('todo.ejs',{items: data}) 
    if(req.query.delid){
        await Todo.deleteOne({_id:req.query.delid})
    }
    res.render('todo.ejs',{items: data})
    next()
})

app.get('/lemme',(req, res)=>{
    res.render('lemme.ejs')
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
app.post('/lemme',async(req, res)=>{
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
})
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(port,()=>console.log(`live on ${port}`))
})
