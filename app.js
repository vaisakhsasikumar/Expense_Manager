const express = require('express');
const bodyParser = require('body-parser');


const app = express(); // create express app

app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const db = require("./app/models");
db.sequelize.sync().then(() => {
    console.log("Synching to DB.");
  });



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});


// Require Users routes
require('./app/routes/user.routes.js')(app);

// Require Expenses routes
require('./app/routes/expense.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});