module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new user
    app.post("/signup", users.signup);
  
    // Retrieve all users
    app.get("/signup", users.findAll);
  
    // Sign in
    app.post("/signin", users.findUser);

    // // Update a user with studentId
    // app.put("/students/:studentId", students.update);
  
    // // Delete a user with studentId
    // app.delete("/students/:studentId", students.delete);
  
    // // Create a new user
    // app.delete("/students", students.deleteAll);
  };