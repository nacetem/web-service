const Credentials = require("../models/credentials.model.js");
const path = require('path')

exports.UploadCredential = (req, res) => {
    // Validate request
    if (!req.file || !req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a credential
    const { path, mimetype } = req.file;
    const student = new Credentials({file_path: path,
      file_mimetype: mimetype, user_id: req.body.user_id})
      
    // Save Credentials in the database
    Credentials.UploadCredentials(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the credential."
        });
      else res.send(data);
    });
  };

exports.RetrieveCredential = (req, res) => {
    Credentials.RetrieveCredential(req.body.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found credentials with id ${req.body.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving credentials with id " + req.body.user_id
          });
        }
      } else res.send(data);
    });
  };

  exports.findCredential = (req, res) => {
    Credentials.findById(req.params.credential_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Credentials with credential_id ${req.params.credential_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Credentials with credential_id " + req.params.credential_id
          });
        }
      } else{ 
        res.set({
            'Content-Type': data.file_mimetype
          });
          res.sendFile(path.join(__dirname, '..', data.file_path));

        //   res.send(data)
    };
    });
  };