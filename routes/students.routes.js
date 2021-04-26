
const verifyToken = require('../auth/verity-token')
const upload = require('../upload/multer-upload')
module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    // Create a new Student
    app.post("/students", students.create);
  
    // Search all Students
    app.get("/students", students.search);

    // Retrieve all Students
    app.post("/allstudents", students.findAll);

    // Retrieve all Students for excel export
    app.post("/excelexport", students.excelExport);

    // Retrieve all Students for excel export
    app.post("/rankedApplicants", students.rankedApplicants);
  
    // Retrieve a single Student with studentId
    app.get("/students/:student_id", students.findOne);
    
    app.put("/photo", upload.single('file'), students.updatePhoto);

    //Update a Student with studentId
    app.put("/students/:studentId", students.update);

    // Update a Student with credential meta data
    app.put("/uploads/:studentId", upload.single('file'), students.updateCredentials);
    
    app.get("/preview/:student_id", students.findPhoto);
    // Delete a Student with studentId
    app.delete("/students/:studentId", students.delete);
  
    // Create a new Student
    app.delete("/students", students.deleteAll);
  };