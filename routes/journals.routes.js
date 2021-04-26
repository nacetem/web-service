const upload = require('../upload/multer-upload')
module.exports = app => {
    const journals = require("../controllers/journal.controller.js");
  
    // Create a new Journal 
    app.post("/journals",  journals.create);
    // Retrieve all Journals
    app.get("/journals", journals.findAll);
    
    app.put("/fileupload", upload.single('file'), journals.updateFileById);

    // Retrieve a single Journal with journalId
    app.get("/download/:id", journals.findFile);
    
    
    // Update a Journal with journalId
    app.put("/journals/:journalId", journals.update);
  
    // Delete a Journal with journalId
    app.delete("/journals/:journalId", journals.delete);
  
// Delete all journals
    app.delete("/journals", journals.deleteAll);
  };