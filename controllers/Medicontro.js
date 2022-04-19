const { error } = require('console')
const { response } = require('express')
const Cats = require('../models/categorie')

const Medi = require('../models/medicament')


/*const add = (req, res, next)=>{


    let med = new Medi({

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
}*/

const ajoutermedicament= async (req, res) => {

    const { idPhoto,description,name,prix} = req.body;

    const nouvellemedi = new Medi();

    nouvellemedi.name = name;
    nouvellemedi.description = description;
    nouvellemedi.prix = prix;
    nouvellemedi.idPhoto = idPhoto;
  
    
    nouvellemedi.save();

    res.status(201).send({ message: "success", medi: nouvellemedi });
}

const recuperermedicament = async (req, res) => {

    var medi;
    if (req.body._id) {
        medi = await Medi.findById(req.body._id)
    } else {
        medi = await Medi.find()
    }

    res.send({ medi })
}

module.exports ={
   /*add,Show*/ajoutermedicament,recuperermedicament
}