   const User=require('../../../models/user');
   const jwt= require('jsonwebtoken');
   module.exports.createSession= async function(req,res)
{    try {
    let user= await User.findOne({email:req.body.email});
    if(!user || user.password!=req.body.password){
           return res.json(422,{
            message:'invalid user/password'
           })
    }
    return res.json(200,{
        message:'sign in completed and heres is your token',
        data:{
            token:jwt.sign(user.toJSON(),'codieal',{expiresIn: '10000'})
        }
    })
         }
         catch(err){
            console.log("*******",err);
            return res.json(500,{
            message:'internal server error'
        })
         }
}