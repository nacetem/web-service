const Academics = require("../models/academics.model.js");
const path = require('path')

// Create and Save a new Academics
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Academics
    const academics = new Academics({
      session: req.body.session,
    });
  
    // Save Academics in the database
    Academics.create(academics, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Academics."
        });
      else res.send(data);
    });
  };
   
  // Retrieve all Studentss from the database.
exports.findAll = (req, res) => {
  Academics.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving academics."
      });
    else res.send(data);
  });
  }