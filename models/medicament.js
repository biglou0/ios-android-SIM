const mongoose  =require('mongoose')
const Cat = require('./categorie')
const Schema  =mongoose.Schema

const mediSchema = new Schema({
   name:{
        type : String
    },

   
    description : {
        type :String

    },
    prix : {
        type :String

    },
  
    photo : {
        type :String,
       
      

    },
    categorie : {
        type: String, 
      
        ref: 'cate'
       
      

    }

} , {timestamps: true})

const Medi = mongoose.model('medi',mediSchema)
module.exports =Medi