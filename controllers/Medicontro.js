const { error } = require('console')
const { response } = require('express')
const Cats = require('../models/categorie')

const medi = require('../models/medicament')


const add = (req, res, next)=>{


    let med = new medi({

       ...req.body
    
    })
    Cats.findOne({name: req.body.cate}, function(err, cate){
        if(!cate) {
            res.json({
                message : "categorie not found"
            })
          }else{
        med.categorie = cate.name.toString()
        console.log(cate)
    med.save()
    .then(response=>{
        res.json({
            message:' medicament  add with succes ! ',
            med:med
        })
    })


    .catch(error =>{
        res.json({
            message : error.toString()
        })
    })


}
    })
}
const Show = (req, res)=> {
    medi.find()
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
   add,Show
}