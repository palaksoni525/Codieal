 const User=require('../models/user');
 const bodyParser=require('body-parser');
 const fs=require('fs');
 const path=require('path');
 const passport=require('passport');
 module.exports.profile=function(req,res)
 {    console.log("in profile");
      if(!req.user)
     {
         return res.redirect('/users/sign-in');
     } 
     //  console.log(req.user);
     // console.log(req.user.email);
     // console.log(req.user.name);
     // console.log(req.user.createdAt);
        console.log(req.params.id);
        User.findById(req.params.id,function(err,user)
        {  
             console.log(user); 
          return res.render('users_profile',{
           title:'User | Profile',
           profile_user:user
           });
        })
       
         
 }

module.exports.update= async function(req,res)
 {
//     if(req.user.id==req.params.id)
//     {
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
//         {
//             return res.redirect('back');
//         });
       
//     }
//     else {
//         req.flash('error',Unauthorised);
//         return res.status(401).send('Unauthorised');
//     }
           if(req.user.id==req.params.id){
              try{
                let user=await User.findById(req.params.id)
                
                User.uploadedAvatar(req,res,function(err)
                {  if(err){  console.log("***** multer error",err);}
                    user.name=req.body.name;
                    user.email=req.body.email;
                    console.log(req.file);
                     if(req.file)
                      {    if(user.avatar)
                         {
                          fs.unlinkSync(path.join(__dirname,'..'+ user.avatar));
                         }
                         //svaing the path of file in the avatar field in user
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                     }
                     user.save();  
                      return res.redirect('back');
                });

              }catch(err)
              {  req.flash(err);
                      return;

              }

           }else {
                    req.flash('error',Unauthorised);
                    return res.status(401).send('Unauthorised');
           }

}
// for sign in
module.exports.signIn=function(req,res)
{   if(req.isAuthenticated())
    {     
          console.log(" In isAuthenticated");
          return res.redirect('/users/profile');

    }
    return res.render('user_sign_in',{
        title:'signIn'
    });
}
//for sign up
module.exports.signup=function(req,res)
{   if(req.isAuthenticated())
    {  return res.redirect('/users/profile');

    }
    return res.render('user_sign_up',{
        title:'signup'
    });
}
// to get data from sign up
module.exports.create=function(req,res)
{  
    
    if(req.body.password!==req.body.confirmPassword)
    {
        return res.redirect('back');
    }  
    
    User.findOne({email:req.body.email},function(err,user)
        {   if(err)
            {console.log('error in finding user while siging up');return }
              if(!user)
              {
                User.create(req.body,function(err,user)
                {if(err)
                {console.log('error in creating user'); return }
                })
                return res.redirect('/users/sign-in');
              } 
                return res.redirect('back');

        });
    
    
}
// to sign in and create session 
module.exports.createSession=function(req,res)
{    req.flash('success',"Logged in successfully");
    return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{    
    req.logout(function(err)
    {
        if(err){console.log("error ",err); return }
    });
    req.flash('success',"Logged out successfully");

    return  res.redirect('/');
      
}


