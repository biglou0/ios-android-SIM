const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const useSchema = new Schema({
    username:{
        type : String
    },

    email :{
        type : String,
   
    },
    phone : {
        type :String

    },
    password : {
        type :String

    },
    avatar : {
        type : String
    },
    isVerified: { type: Boolean },
} , {timestamps: true})

const Use = mongoose.model('use',useSchema)
module.exports =Use