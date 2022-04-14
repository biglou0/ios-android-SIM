const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const catsSchema = new Schema({
    
   name:{
        type : String,
      
    }

 
} , {timestamps: true})

const Cats = mongoose.model('cats',catsSchema)
module.exports =Cats