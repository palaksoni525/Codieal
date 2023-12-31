const Post = require("../models/post")
const Comment=require('../models/comment');
const { response } = require("express");
const Like = require("../models/like");


module.exports.create= async function(req,res)
{     try{ let post=await Post.create({
     
    content:req.body.content,
    user:req.user._id
});
if(req.xhr)    
{
    return response.status(200).json({
        data:{
     post:post
        },
        message:'post created!'
    })
}
  req.flash('success',"Post Published");
     return res.redirect('back');
      } catch(err){
           req.flash('error',err);
      }
}
module.exports.destroy= async function(req,res)
{  try{
         let post= await Post.findById(req.params.id);
        {
             if(post.user==req.user.id)
            {   await Like.deleteMany({likeable:post,onModel:'Post'});

               await Like.deleteMany({_id:{$in: post.comments}})
                post.remove();

               await  Comment.deleteMany({post:req.params.id});
               if(req.xhr)
               {
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted "

                
                });
               }
                 req.flash('success','Post and associated comments deleted');
                return res.redirect('back')
            }
            else {
                return res.redirect('back');
            }
         }
      }catch(err){
         req.flash('error','you are not delete the post');
    return;}
    


        
}