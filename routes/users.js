const express = require('express')
 const  router = express.Router()

 const usersController = require ('../controllers/usersController')
 
 router.get('/',usersController.index)
 router.post('/show',usersController.show)
 router.post('/store',usersController.store)
 router.post('/update',usersController.update)
 router.post('/delete',usersController.destroy)

module.exports = router