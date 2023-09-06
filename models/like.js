const mongoose =require('mongoose');
const likeSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
     likeable:{ type:mongoose.Schema.Types.ObjectId,
            require:true,
            refPath:'onModel'
     },
     onModel:{

         type:String,
          require:true,
           enum:[ 'Post','Comment' ]
     },
    
},{
    timestamps:true
}
);
     let Like=mongoose.model('Like',likeSchema);
      module.exports=Like;