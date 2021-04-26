const upload = require('../upload/multer-upload')
module.exports = app => {
    const credential = require("../controllers/credential.controller.js");
  
    // Create a new credential
    app.post("/credentials", upload.single('file'), credential.UploadCredential);

    // Create a credential
    app.post("/usercredentials", credential.RetrieveCredential);
  
    // Retrieve one file meta data
    app.get("/download/:credential_id", credential.findCredential);
  
    // // Sign in
    // app.post("/signin", users.findUser);
 
    // // Delete a user with studentId
    // app.delete("/students/:studentId", students.delete);
  
    // // Create a new user
    // app.delete("/students", students.deleteAll);
  };