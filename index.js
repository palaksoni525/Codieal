   const express=require('express');
   const app=express();
   const port=8000;
   const expressLayouts=require('express-ejs-layouts');
   const cookieParser=require('cookie-parser');
   const bodyParser=require('body-parser');
   const db=require('./config/users');
   const session=require('express-session');
   const passport=require('passport');
   const passportLocal=require('./config/passport-local-strategy');
   const  passportJWT=require('./config/passport-jwt-strategy');
   const MongoStore=require('connect-mongodb-session')(session);
   const sassMiddleware=require('node-sass-middleware');
   const flash=require('connect-flash');
   const customMware=require('./config/Middleware');
   const chatServer=require('http').Server(app);
   const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
   chatServer.listen(5000);
   console.log('listening  the chat server on port 5000');
   
   app.use(sassMiddleware({
     src:'./assets/scss',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
      prefix:'/css'

   })
   );
   //make the uploads folder available to the browser
   
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(express.urlencoded());
   app.use(expressLayouts);
   app.set('layouts extractStyles' ,true);
   app.set('layouts extractScripts',true);
   //set up view
   app.set('view engine','ejs');
   app.set('views','./views');
   
  //mongo store is  used  to store session cookie
    app.use(cookieParser());
    app.use(session({
        name:'codieal',
        secret:'blahsomething',
        saveUninitialized:false,
        resave:false,
        cookie: {
            maxAge:(1000*60*100)
        },
        store:new MongoStore({
            mongooseConnection:db,
            autoRemove:'disabled'
        },function(err)
        {
            console.log(err || 'connection with mongodb setup ok');
        })
       
    
    }
    ));
    app.use('/uploads', express.static(__dirname +'/uploads'));
    app.use(express.static('./assets'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);
    app.use(flash());
    app.use(customMware.setflash);
     //use express rounter
   app.use('/',require('./routes'));
   
   //extract styles and scripts from sub pages into the layout
  
   app.listen(port,function(err)
   {
        if(err)
       {   console.log(`error in running the server:${err}`);
       return ;

       }
       console.log(`server is up on port:${port}`);
   });
