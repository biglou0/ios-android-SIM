const express = require('express')
const  router = express.Router()



const Medic  = require('../controllers/Medicontro')

const upload    = require('../middleware/upload')

 
router.post('/add',upload.single('photo'), Medic.add)
router.get('/aff', Medic.Show)


module.exports= router