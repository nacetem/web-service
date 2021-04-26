const Journal = require("../models/journals.model.js");
const path = require('path')
// Create and Save a new Journal
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Journal
    const journal = new Journal({
    author: req.body.author,
    title: req.body.title,
    pub_date: req.body.pub_date,
    journal_links: req.body.journal_links,
    reportable_activities: req.body.reportable_activities,
    });
    
    // Save Journal in the database
    Journal.create(journal, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Journal."
        });
      else res.send(data);
    });
  };
  
  ////////////////////////////

// Retrieve all Journals from the database.
exports.findAll = (req, res) => {
    Journal.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving journals."
        });
      // else res.send(data);
      // author, pub_date, title, journal_links, academic_pub, conference, workshops, scho_grant_awards_fellow, other_acada_engage, `other_useful_acada_engage`
      else {
        const {search} = req.query;
        let results = [...data];
        if (search) {
        const searchList = search.split(' ')
        const searchTitle = searchList.map(item=>results.filter(r => new RegExp(item, 'gi').exec(r.title)))
        const concatTitleLists = [].concat.apply([], searchTitle)
        // searchTitle.reduce(function(arr, e) {
        //   return arr.concat(e);
        // })
        console.log('concatTitleLists: ', concatTitleLists)
        const searchAuthor = searchList.map(item=>results.filter(r => new RegExp(item, 'gi').exec(r.author)))
        const concaAuthorLists = [].concat.apply([], searchAuthor)
        // searchAuthor.reduce(function(arr, e) {
        //   return arr.concat(e);
        // })
        resultsEachWord = concatTitleLists.concat(concaAuthorLists)
        
          restitle = results.filter(r => new RegExp(search, 'gi').exec(r.title));
          resauthor = results.filter(r => new RegExp(search, 'gi').exec(r.author));
          respub_date = results.filter(r => new RegExp(search, 'gi').exec(r.pub_date));
          // results = [ ...restitle, ...resauthor, ...respub_date]
          resultsContinuosWord = restitle.concat(resauthor).concat(respub_date)
      
      results= resultsContinuosWord.concat(resultsEachWord)
      results = [...new Set(results)];
      
    }
    res.send(results);}
    });
  };


// Find a single Journal with a journalId
exports.findFile = (req, res) => {
    Journal.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Journal`
          });
        } else {
          res.status(500).send({
        
            message: "Error retrieving Journals with id " + req.params.id
          });
        }
      } else{ 
        res.set({
          'Content-Type': data.file_mimetype
        });
        res.sendFile(path.join(__dirname, '..', data.file_path));
        // res.send(data);
      };
    });
  };

// U-*ate a Journal identified by the journalId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Journal.updateById(
      req.params.journalId,
      new Journal(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Journal with id ${req.params.journalId}.`
            }); } else {
            res.status(500).send({
              message: "Error updating Journal with id " + req.params.journalId
            });
          }
        } else res.send(data);
      }
    );
  };

  
  exports.updateFileById = (req, res) => {
    // Validate Request
    if (!req.file) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const { path, mimetype } = req.file;
    const journal = new Journal(
      {
        file_path: path,
        file_mimetype: mimetype
      }
    )
    Journal.updateFileById(
      req.body.id,
      journal,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Journal with id ${req.body.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Journal with id " + req.body.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Journal with the specified journalId in the request
exports.delete = (req, res) => {
    Journal.remove(req.params.journalId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Journal with id ${req.params.journalId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Journal with id " + req.params.journalId
          });
        }
      } else res.send({ message: `Journal was deleted successfully!` });
    });
  };
// Delete all Journals from the database.
exports.deleteAll = (req, res) => {
    Journal.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all journals."
        });
      else res.send({ message: `All Journals were deleted successfully!` });
    });
  };