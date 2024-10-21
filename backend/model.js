const mongoose = require("mongoose");
const TODO=mongoose.Schema({
    todo:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('todolist',TODO)