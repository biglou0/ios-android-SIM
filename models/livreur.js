const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const useSchema = new Schema({
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

    matricule : {
        type :String

    },
} , {timestamps: true})

const Use = mongoose.model('livreur',useSchema)
module.exports =Use