const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  

  const authenticate =  (username, userpassword, done) => {
   
  pool.query(
      `SELECT * FROM quizmaster WHERE email = $1`,[username],
      (err, results) => {
        if (err) {
          throw err;
        }
        //console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(userpassword, user.password, (err, isMatch) => {
            
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null,user);
            } 
            
                
            else {
              //password is incorrect
              return done(null, false, { message: "Incorrect Credentials" });
            }
          });
        } 
        
        
        
        else {
          // No user
          return done(null, false, {
            message: "Incorrect Credentials"
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "user_password" },
      authenticate
    )
  );
 
  passport.serializeUser((user, done) => done(null, user.id));

  
  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM quizmasters WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;