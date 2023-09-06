const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');


module.exports.toggleLike= async function(req,res)
{
    try{   let likeable;
          let deleted=false;
           if(req.query.type=='Post')
           {   likeable= await Post.findById(req.query,id).populate('likes');
               

           }else{
            likeable= await Comment.findById(req.query,id).populate('likes');
           }
        //check if user had liked or not if liked no again liking the post
          let exsistingLike= await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
          });
           if(exsistingLike){
            likeable.likes.pull(exsistingLike._id);
            likeable.save();
            exsistingLike.remove();
            deleted=true;
           }else {
                let newLike=await Like.create({
                      user:req.user._id,
                       likeable:req.query.id,
                      onModel:req.query.type

                })
                likeable.likes.push(newLike._id);
           }
              return res.json(200,{
                      message:" Requested Successfully!",
                      data:{
                        deleted:deleted
                      }
              })

    }catch(err)
    {
        console.log(err);
        return res.json( 500,{
             message:'Internal Server Error'
        })
    }
}