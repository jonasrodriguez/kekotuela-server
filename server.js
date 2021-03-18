const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
});

// enable cors
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Koketuela!!"});
});

// Require Clients routes
require('./app/api/client/client.routes.js')(app);

// Require Users routes
require('./app/api/user/user.routes.js')(app);

// Require Orders routes
require('./app/api/order/order.routes.js')(app);

// Require Materials routes
require('./app/api/material/material.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
