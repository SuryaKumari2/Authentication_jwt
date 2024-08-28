const express=require('express');
const router=express.Router();
const middleware=require('../middlewares/verifyToken')
const userController=require('../controllers/UserController')
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin)
router.get('/profile',middleware,userController.userProfile)
module.exports=router;