const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const pharmSchema = new Schema({
   username:{
        type : String
    },

    email :{
        type : String,
   
    },
    password : {
        type :String

    },
    phone : {
        type :String

    },
  
    idu : {
        type :String,
        unique : true
      

    },
    region : {
        type :String

    },
} , {timestamps: true})

const Pharm = mongoose.model('pharm',pharmSchema)
module.exports =Pharm