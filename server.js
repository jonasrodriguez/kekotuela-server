const express = require('express');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

const dotenv = require('dotenv');
dotenv.config();

// Connecting to the database
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_URI+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
});

// use jwt
const jwt = require('jsonwebtoken');
jwtToken = process.env.TOKEN_SECRET;

// use helmet
const helmet = require('helmet');
app.use(helmet());

// enable cors
const cors = require('cors');
app.use(cors());

// Require routes
const routes = require('./app/routes');
app.use('/api', routes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
