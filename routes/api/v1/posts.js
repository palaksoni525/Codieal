const { application } = require('express');
const express=require('express');
  const router=express.Router();

   const postsApi=require('../../../controllers/api/v1/posts_api');
   router.get('/',postsApi.index);
   router.get('/:id',postsApi.destroy);
  module.exports=router;