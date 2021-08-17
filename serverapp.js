const express = require ('express');

 const { pool } = require("./src/config/dbconfig")
 const bcrypt = require('bcrypt');
 const passport = require('passport');
 const flash = require('express-flash');
const session = require ('express-session');


require("dotenv").config();

const userroutes = require('./src/routes/userroutes');
const adminroutes = require('./src/routes/adminroutes');

const app = express();

const PORT = process.env.PORT || 4000;

const initialized = require('./src/config/passportconfig');
  initialized(passport);

  

  


//middleware
app.use(express.urlencoded({extended:false}));


app.use(session(
    {
        secret: "secret",
        resave:false,
        saveUninitialized: false,
    }
));

app.use(passport.initialize());

app.use(passport.session());


app.use(flash());


app.use('/login', userroutes)
app.use('/admin', adminroutes)





 app.get('/users/logout', (req, res) => {
     req.logout();
     req.flash("success_msg","you are logged out")
     res.redirect('/users/login')
  });

  app.get('/admin/logout', (req, res) => {
    req.logout();
    req.flash("success_msg","you are logged out")
    res.redirect('/admin/adminlogin')
 });







app.listen(PORT,()=>(
    console.log(`server is running ${PORT}`)
));


