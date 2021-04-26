const Students = require("../models/students.model.js");
const path = require('path')
const excel = require('exceljs');

// Create and Save a new Students
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Students
    const student = new Students({
      user_id: req.body.user_id,
    });
  
    // Save Students in the database
    Students.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Students."
        });
      else res.send(data);
    });
  };
   
  // Retrieve all Studentss from the database.
exports.findAll = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Students.getAll(new Students(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    else res.send(data);
  });
  }
    // Retrieve all Studentss from the database.
exports.rankedApplicants = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Students.rankedApplicants(new Students(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    else {
      // const result = data.map(res => transformer(res.english_language))
      // result.sort(function(a, b) {
      //   var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      //   var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      
      //   // names must be equal
      //   return 0;
      // });
      
      //  console.log('result for ranked: ', result);
      res.send(data)
    
    }
  });
  }
  // 
exports.excelExport = (req, res) => {
    Students.excelExport(new Students(req.body), (err, data) => {
      if (err){res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        })}
      else {
        const jsonStudents = JSON.parse(JSON.stringify(data));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('AllStudents'); //creating worksheet
        //  WorkSheet Header
        // `surname`, `mname`, `fname`, `studyCentre`, `preferred`, `dob`, `gender`, `state_origin`, `religion`
        worksheet.columns = [
          { header: 'Surname', key: 'surname', width: 30 },
          { header: 'Middle Name', key: 'mname', width: 30},
          { header: 'First Name', key: 'fname', width: 30},
          { header: 'Study Centre', key: 'studyCentre', width: 30 },
          { header: 'Preferred Study Centre', key: 'preferred', width: 30},
          { header: 'Date of Birth', key: 'dob', width: 30},
          { header: 'Gender', key: 'gender', width: 30 },
          { header: 'State of Origin', key: 'state_origin', width: 30},
          { header: 'Religion', key: 'religion', width: 30}
        ];
      
        // Add Array Rows
        worksheet.addRows(jsonStudents);
        const file_base = `${req.body.preferred !=='Pgd'? req.body.session + ' Session ' + req.body.preferred + ' Master' : req.body.session + ' Session ' + req.body.preferred + '_' + Date.parse(Date()) }.xlsx`
        
        // Write to File
         workbook.xlsx.writeFile(path.format({
          dir: 'C:\\',
          base: file_base
        }))
        .then(function() {
            res.send({exported: `File exported successfully to your C drive as `+ file_base});
	//https://www.w3schools.com/js/js_date_methods.asp
        }).catch(err => console.log(err));
        
          };
        });
    }

// Search all Studentss from the database.
exports.search = (req, res) => {
    Students.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      // else res.send(data);
      else {const { surname, mname, fname, search } = req.query;
      let results = [...data];
      if (surname) {
        results = results.filter(r => r.surname === surname);
      }
    
      if (mname) {
        results = results.filter(r => r.mname === mname);
      }
    
      if (fname) {
        results = results.filter(r => +r.fname === +fname);
      }
      if (search) {
        ressurname = results.filter(r => r.surname === search);
        resmname = results.filter(r => r.mname === search);
        resfname = results.filter(r => r.fname === search);
        results = [ ...ressurname, ...resmname, ...resfname]
      }
      res.send(results);
    }

    });
  };

// Find a single Students with a studentId
exports.findOne = (req, res) => {
    Students.findById(req.params.student_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Students with id ${req.params.student_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Students with id " + req.params.student_id
          });
        }
      } else res.send(data);
    });
  };

  // Create a student id @ sign up
  // createStudentId
 
// Update a Students identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Students.updateById(
      req.params.studentId, req.body.step,
      new Students(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Students with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Students with id " + req.params.studentId
            });
          }
        } else res.send(data);
      }
    );
  };

    // Update a Students credential mata data
exports.updatePhoto = (req, res) => {
  // Validate Request
  if (!req.file) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const { path, mimetype } = req.file;
  console.log('req.file: ', path)
  const students = new Students({photo_path: path,
    photo_mimetype: mimetype})
  Students.updatePhoto(
    req.body.student_id, 
    students,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Students with id ${req.body.student_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Students with id " + req.body.student_id
          });
        }
      } else {
        console.log('req.file', req.file)
        res.send(data);
      }
    }
  );
};
  // Update a Students credential mata data
exports.updateCredentials = (req, res) => {
    // Validate Request
    if (!req.file) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const { path, mimetype } = req.file;
    console.log('req.file', path)
    const students = new Students({photo_path: path,
      photo_mimetype: mimetype})
    Students.UploadCredentials(
      req.params.studentId, 
      students,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Students with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Students with id " + req.params.studentId
            });
          }
        } else {
          console.log('req.file', req.file)
          res.send(data);
        }
      }
    );
  };


// Delete a Students with the specified studentId in the request
exports.delete = (req, res) => {
    Students.remove(req.params.studentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Students with id ${req.params.studentId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Students with id " + req.params.studentId
          });
        }
      } else res.send({ message: `Students was deleted successfully!` });
    });
  };
// Delete all Studentss from the database.
exports.deleteAll = (req, res) => {
    Students.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Studentss were deleted successfully!` });
    });
  };

exports.findPhoto = (req, res) => {
  Students.findById(req.params.student_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Credentials with student_id ${req.params.student_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Credentials with student_id " + req.params.student_id
          });
        }
      } else{ 
        res.set({
            'Content-Type': data.photo_mimetype
          });
          path? res.send(path.join(__dirname, '..', data.photo_path)): null
          // res.sendFile(path.join(__dirname, '..', data.photo_path));

        //   res.send(data)
    };
    });
  };