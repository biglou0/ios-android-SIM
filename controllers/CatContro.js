const { error } = require('console')
const { response } = require('express')
const Cats = require('../models/categorie')





const join = (req, res,next)=>{
    let cats = new Cats({

       ...req.body
    
    })
    cats.save()
    .then(response=>{
        res.json({
            message:' categorie  add with succes ! ',
            cats:cats,
            name: cats.name,
        })
    })


    .catch(error =>{
        res.json({
            message : error.toString()
        })
    })


}
const Show = (req, res)=> {
    Cats.find()
    .then(response => {
        res.json(
            response
        )
    })
        .catch(error =>{
            res.json({
                message:'An error Occured ! '
            })
        })
}
module.exports ={
   join,Show
}