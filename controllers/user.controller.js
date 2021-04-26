const Users = require("../models/users.model.js");
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
require('dotenv').config()
const Students = require("../models/students.model.js");
// Create and Save a new user
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new Users({
      email: req.body.email,
      password: hashedPassword,
    });
  
    // Save user in the database
    Users.signup(user, (err, data) => {
      try{
      if (err)
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the users."
        });
      // else {
      //   var token = jwt.sign({ id: data.id }, process.env.SECRET, {
      //       expiresIn: 86400 // expires in 24 hours
      //   });
      // Create a Students
    const student = new Students({
      user_id: data.id,
    });
  
    // Save Students in the database
    Students.create(student, (err, data) => {
      
      if (err)
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Students."
        });
      
    });
        res.status(200).send({ signedup: true});
      }catch(err){
        res.status(500).send({ signedup: false});

      }
    // };
    })
}
// Find a single User with a userId
exports.findUser = (req, res) => {
    Users.findByEmail(req.body.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Users with id ${req.body.email}.`
          });
          console.log("Not found Users with id");
        } else {
          res.status(500).send({
            message: "Error retrieving Users with email " + req.body.email
          });
          console.log("Error retrieving Users with email " + req.body.email);
        }
      } else {
        var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
        var token = jwt.sign({ id: data.id }, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        const {user_id} = data
        Students.findByUserId(user_id, (err, results) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Students with student_id ${results.student_id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Students with student_id " + results.student_id
              });
            }
          } else{
          const {student_id} = results
          res.status(200).send({ auth: true, token: token, user_id, student_id });
        console.log({ auth: true, token: token, user_id, student_id });}
        });
        
        
        //   res.send(data)
        };
    });
  };
exports.findAll = (req, res) => {
    Users.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    })
}