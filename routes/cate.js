const express = require('express')
const  router = express.Router()



const Cats  = require('../controllers/CatContro')



 
router.post('/join', Cats.join)
router.get('/show', Cats.Show)


module.exports= router