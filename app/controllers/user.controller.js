const User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config/database.config.js');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const db = require("../models");
const UserOP = db.User;
const Op = db.Sequelize.Op;
// Create and Save a new user
exports.register = (req, res) => {
    // Validate request
    if(!req.body) { // I make it req.body from req.body.content
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    console.log(req.body.password);
    var hashedPassword = bcrypt.hashSync(req.body.password, 8); // Generate hash for the password

    const userToBeSavedInSQL = {
        username: req.body.username,
        password : hashedPassword,
        email: req.body.email || 'default@email.com',
        photolink: req.body.photoLink || 'defalt photo link',
        phoneNumber: req.body.phoneNumber,
        totalSpendAmount: 0,
        totalPaidAmount: 0,
        finalStatus: 0,
};

    UserOP.create(userToBeSavedInSQL).
    then(data => {
        var token = jwt.sign({ id: data._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token, data });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
    // Save User in the database
   
};

// Loging user
exports.login = (req, res) => {

      
      UserOP.findAll({raw: true, where: {email:req.body.email} })
    .then(user => {
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User" + err
      });
    });
}

// Logout user
exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    UserOP.findAll()
    .then(users => {
        res.json(user)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserS" 
      });
    });
    
};

// Find a single user with a username
exports.findOne = (req, res) => {
   console.log(req.params.userId);

   UserOP.findAll({raw: true, where: {username:req.params.userId} })
   .then(doc => {
       res.send(doc)
   })
   .catch(err => {
     res.status(400).send({
       message: "Error retrieving Users" 
     });
   });
    
};

// Update a user identified by the userid in the request
exports.update = (req, res) => {
    body = req.body;
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    if(req.params.userId !== body.username){
      return res.status(401).send({message: "You are not authorized"+req.params.userId +body.username});
   }
    // Find user and update it with the request body
    query = req.params.userId;
    console.log(query);
    UserOP.update(req.body, {
        where: { username: req.params.userId }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update User with id. Maybe User was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User with id=" +req.params.userId
          });
        });


  
};

// Delete a user with the specified username in the request
exports.delete = (req, res) => {
    UserOP.destroy({
        where: {username: req.params.userId  }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete User with id. Maybe User was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with id=" + id
          });
        });
    };


exports.me = (req,res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        User.findById(decoded.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            
            res.status(200).send(user);
          });
    });
}