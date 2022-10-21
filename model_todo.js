const mongoose = require('mongoose')
const todo = new mongoose.Schema({
    task: String,
    time: String
})

const dairy = new mongoose.Schema({
    activity: String,
    events: String,
    ideas: String,
    progress: String,
    classified: String,
    sticker: String,
    today: {type: Date, default:Date.now}
})
const Todo = new mongoose.model('todo', todo)
const Dairy = new mongoose.model('dairy', dairy)
module.exports = {Todo, Dairy}