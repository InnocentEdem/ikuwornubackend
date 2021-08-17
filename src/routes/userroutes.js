const express = require ('express');
 const { pool } = require("../config/dbconfig")
 
 const bcrypt = require('bcrypt');
 const passport = require('passport');
//require("dotenv").config();

const app = express.Router();

const initialized = require('../config/passportconfig');
  initialized(passport);

//middleware




app.use(passport.initialize());

//get

app.get('/',  (req, res) => {
    res.render("index")
});

app.get('/login', checkAuthenticated, (req, res) => {
    
    res.render("login")
});



// app.get('/userdashboard', checkNotAuthenticated, async function  (req, res) {
//     const keys = await pool.query( `SELECT access_key,status, start_date,start_date+interval'5 DAYS' AS expiry_date FROM keystorage ORDER BY id DESC`);
//     const allKeys = keys.rows;
//      res.render("userdashboard", {allKeys})
    
// });

//create
app.post("admin/register",  async function (req,res) {
    let { username,  userpassword } = req.body;

    console.log({
      username,
      userpassword,
     
  });

    let errors = [];
    

     if(!username || !userpassword ){
        errors.push("Please enter all fields")
    }
      
      if (errors.lenght>0){
         
      }
      else{
          //validation passed

          let hashedpassword = await bcrypt.hash(userpassword,10);
          console.log(hashedpassword);

          pool.query(
            `SELECT * FROM quizmasters
            WHERE username = $1`,
          [username],
          (err, results) => {
            if (err) {
              console.log(err);
            } 
            if (results.rows.length > 0) {
                
              } else {
                pool.query(
                  `INSERT INTO quizmasters (username, password)
                      VALUES ($1, $2)
                      RETURNING id, password`,
                  [username, hashedpassword],
                  (err, results) => {
                    if (err) {
                      throw err;
                    }
                    console.log(results.rows);
                    req.flash("success_msg", "Quizmaster registered. Please log in");
                    res.redirect("/users/login");
                  }
                );
              }
            } 
        
          );
      } 

});

app.post('/login', 
passport.authenticate('local'), async (req,res)=> {
  const {username} = req.body
  let results = await pool.query(`SELECT * FROM quizmaster WHERE email = $1`,[username])
  
  try{
    if(results.rows[0].roles === null ){ //user is not admin
      
      console.log(results.rows[0].roles)
      return res.redirect('userdashboard')
    }
    
    
  }
  catch (err){
    console.log(err)
    
  }

}) 

    
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/userdashboard"); //redirect user to homepage
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login"); //redirect to login page
  }
  app.get('/logout', (req, res) => {
    req.logout();
    req.flash("success_msg","you are logged out") //logout and redirect to login page
    res.redirect('/users/login')
 });

module.exports = app
