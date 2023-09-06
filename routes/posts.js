const passport=require('passport');
const express=require('express');
  const router=express.Router();
  const postControllers= require('../controllers/post_controller');
    


 router.post('/create',passport.checkAuthentication ,postControllers.create);
 router.get('/destroy/:id',passport.checkAuthentication,postControllers.destroy);
 module.exports= router;