const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Quizmaster } = require('../models');

app.use(express.json());

exports.register =  async (req, res) => {
  try {
    const { fname, lname, email, password, isAdmin } = req.body;

    if (!(fname && lname && email && password)) {
      res.status(400).json({ success:false, message: "All input is required" });
    }

    const existingQuizmaster = await Quizmaster.findOne({ where: { email } });
    if (existingQuizmaster) {
         res.status(409).json({ success: false, message: "User Already Exist. Please Login" });
    } else{
        encryptedPassword = await bcrypt.hash(password, 10);
        const registeredQuizmaster = await Quizmaster.create({
            fname,
            lname,
            email,
            isAdmin,
            password: encryptedPassword,
        });

    const token = jwt.sign(
        { quizmaster_id: registeredQuizmaster.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      registeredQuizmaster.token = token;
      await registeredQuizmaster.save();

    res.status(201).json({ success:true, message: registeredQuizmaster });
    }

  } catch (error) {
    console.log(error);
    res.status(201).json({ success:false, message: error });
  }
};


exports.login =  async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).json({ success:false, message: "All input is required" });
      }

      const existingQuizmaster = await Quizmaster.findOne({ where: { email } });
      if (existingQuizmaster && (await bcrypt.compare(password, existingQuizmaster.password))) {
        const token = jwt.sign(
          { user_id: existingQuizmaster._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        existingQuizmaster.token = token;
        await existingQuizmaster.save();
  
        res.status(200).json(existingQuizmaster);
      }
      res.status(400).json({ success:false, message: "Invalid Credentials" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success:false, message: error });
    }
  };
