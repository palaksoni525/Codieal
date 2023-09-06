const nodeMailer=require('../config/nodemailer');

    exports.newComment = (comment) => {
    let htmlString= nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log("inside comment mailer");
    console.log(" new comment",comment.user);
    console.log(htmlString);
    nodeMailer.transporter.sendMail({
        from:"psonilnct@gmail.com",
        to:comment.user.email,
        subject:'New comment added',
        html:htmlString
         },(err,info)=>  
          {
            if(err)
            {
                console.log("error in sending the mail",err);
                return;
            }
            console.log("mail dilevired",info);
            return 
         })
         
}
