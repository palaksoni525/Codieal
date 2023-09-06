const express=require('express');
  const router=express.Router();
  const userController=require('../controllers/users');
  const passport=require('passport');

   router.get('/profile/:id',userController.profile);
   
   router.post('/update/:id',userController.update);
  router.get('/sign-in',userController.signIn);
  router.get('/sign-up',userController.signup);
  router.post('/create',userController.create);
  router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

  ),userController.createSession)
  router.get('/sign-out',userController.destroySession);
  module.exports=router;