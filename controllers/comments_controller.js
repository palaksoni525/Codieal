
const Comment=require('../models/comment');
const Post=require('../models/post');
const Like= require('../models/like');
const commentsMailer=require('../mailers/comments_mailers');
//   module.exports.create= async function(req,res)
//  {  console.log("in comments create");
//         console.log(req.body);
//         console.log(req.body.post);
//         console.log(req.user._id.email);
//       Post.findById(req.body.post,function(err,post)
//       {   console.log("in comments create");
//              if(err)
//              {    console.log(err);
//                  console.log("error in finding the post");
//                   return
//             }
            
//             if(post)
//            {    
//                         Comment.create({
//                         content:req.body.content,
//                          post:req.body.post ,    
//                          user:req.user._id
                                                    
//                  },function(err,comment)
//                   {       console.log(comment.user);
//                         let email=User.findById(comment.user._id);
//                         console.log(email);
//                         if (err)
//                         { req.flash('success','err'); return}
//                          post.comments.push(comment);
//                          post.save();
//                          console.log("comment saved");
//                          comment=comment.populate('user','name email');
                         
//                          //commentsMailer.newComment(comment);
//                         if(req.xhr)
//                          {      
//                                return res.json(200,{
//                                     data:{comment:comment},
//                                     message:'Comment Created'
//                              })
//                          }
//                           req.flash('success','Comment Created');

//                           res.redirect('/');
//                    });
//           }
//        })


                  
//   }
module.exports.create = async function (req, res) {
  try{
    let post = await Post.findById(req.body.post);
    if (post) {
      let comments = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comments);
      post.save();
      comments=await comments.populate('user','name email');
      commentsMailer.newComment(comments);
      if(req.xhr){
        return res.status(200).json({
          data:{
            comments:comments
          },
          message:"Commented successfully !"
        })
      }
      req.flash('success',"Successfully commented");
      res.redirect("/");
    } else {
      req.flash('error','no post with this id');
    }
  }catch(err)
  {
      req.flash('error',err);
  }
};

  module.exports.destroy= async function(req,res)
  {    await Comment.findById(req.params.id,function(err,comment)
      {           if(err)
            {

                  console.log("errror in fiding the post",err);
                  return;
            }
            
                  if(comment.user==req.user.id)
                  { 
                    let postId=comment.post;
                     Like.deleteMany()
                        comment.remove({likeable:comment._id,onModel:'Comment'});
                         req.flash('success','Comment Deleted');
                        Post.findByIdAndUpdate(postId,{$pull:{comments:req.param.id}},function(err,post)
                        {
                              return res. redirect('back');
                        })
                        
                  }
                  else {
                  return res.redirect('back');
                  }
      }) ;
  }