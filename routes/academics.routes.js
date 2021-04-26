
module.exports = app => {
    const academics = require("../controllers/academics.controller.js");
  
    // Create a new Student
    app.post("/academics", academics.create);
  
    // Retrieve all Students
    app.get("/academics", academics.findAll);

    // // Delete a Student with studentId
    // app.delete("/academics/:studentId", academics.delete);
  
    // // Create a new Student
    // app.delete("/academics", academics.deleteAll);
  };