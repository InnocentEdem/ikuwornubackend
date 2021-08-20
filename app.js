const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
app.use(express.json());
const { sequelize } = require('./models');


const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const questionRoutes = require('./routes/question');
const sessionRoutes = require('./routes/session');
const contestantRoutes = require('./routes/contestant');




app.use(authRoutes);
app.use(indexRoutes);
app.use(questionRoutes);
app.use(sessionRoutes);
app.use(contestantRoutes);



const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // await sequelize.authenticate();
        // await sequelize.sync({ force: true }); // Drops db and create a new one.

    console.log('Database synced!');
});