const express = require('express')
const  router = express.Router()


const AuthController  = require('../controllers/AuthController')
const Authpharm  = require('../controllers/Authpharm')

const upload    = require('../middleware/upload')

 
router.post('/register',upload.single('avatar'), AuthController.register)
router.post('/login',AuthController.login)
router.post('/registerpharm',Authpharm.registerpharm)
router.post('/loginpharm',Authpharm.loginpharm)
router.post("/reEnvoyerConfirmationEmail", AuthController.reEnvoyerConfirmationEmail);
router.get("/confirmation/:token", AuthController.confirmation);
router.post("/motDePasseOublie", AuthController.motDePasseOublie);
router.put("/changerMotDePasse", AuthController.changerMotDePasse);

module.exports= router