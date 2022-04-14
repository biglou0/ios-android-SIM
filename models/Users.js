const mongoose   =require('mongoose')
const  Schema    =mongoose.Schema




const usersSchema = new Schema({
    name:{
        type : String
    },

    email :{
        type : String,
        required : true,
        trim :true,
        unique : true
       

    },
    phone : {
        type :String

    },
    password : {
        type :String

    }


}, {timestamps: true})
const users = mongoose.model('users',usersSchema)
module.exports = users