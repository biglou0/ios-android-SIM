const { error } = require('console');
const { response } = require('express');
const { setThePassword } = require('whatwg-url');
const users = require('../models/Users');



//Show the List of  Users

const index = (req, res, next)=> {
    users.find()
    .then(response => {
        res.json({
            response
        })
    })
        .catch(error =>{
            res.json({
                message:'An error Occured ! '
            })
        })
}
// show signel user
const show =(req, res, next )=>{
    let usersID = req.body.usersID
    users.findById(usersID)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'An error Occured!'
        })
    })
}
 
// add new user
const store = (req, res, next)=>{
    let user = new users({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    
    })
    user.save()
    .then(response=>{
        res.json({
            message:' user add with succes ! '
        })
    })


    .catch(error =>{
        res.json({
            message :'An error with adding user!'
        })
    })


}

// updtae user


const update = (req, res, next)=>{
    let usersID = req.body.usersID

    let updateData ={

  
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    
    }

    users.findByIdAndUpdate(usersID , {$set :  updateData})
    .then (() =>{
        res.json({
            message : ' user update with succes !'
        })

    })
.catch(error =>{
    res.json({
        message : 'error with updtaing user !'
    })
})

}

const destroy = (req, res, next)=>{
    let usersID = req.body.usersID
    
    users.findByIdAndRemove(usersID)
    .then (() => {
        res.json({
            message : 'users deleted '
        })

    })

    .catch(error =>{
        res.json({
            message : 'error with deleting user !'
        })
    })
}
 module.exports ={
     index, show , store, update ,destroy
 }