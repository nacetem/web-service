const sql = require("./db.js");

// constructor
const Journals = function(journals) {
  this.author = journals.author;
  this.title = journals.title;
  this.pub_date = journals.pub_date;
  this.journal_links = journals.journal_links;
  this.reportable_activities = journals.reportable_activities;
  
  // this.file_path = journals.file_path;
  // this.file_mimetype = journals.file_mimetype;
};

Journals.create = (newJournals, result) => {
  sql.query("INSERT INTO journals SET ?", newJournals, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created journals: ", { id: res.insertId, ...newJournals });
    result(null, { id: res.insertId, ...newJournals });
  });
};


Journals.findById = (journalsId, result) => {
  sql.query(`SELECT * FROM journals WHERE id = ${journalsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  res.send(result)
  });
};


Journals.getAll = result => {
  sql.query("SELECT * FROM journals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("journals: ", res);
    result(null, res);
  });
};

Journals.updateFileById = (id, journals, result) => {
  sql.query(
    "UPDATE journals SET file_path = ?, file_mimetype = ? WHERE id = ?",
    [journals.file_path, journals.file_mimetype, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Journals with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated journals: ", { id: id, ...journals });
      result(null, { id: id, ...journals });
    }
  );
};

Journals.updateById = (id, journals, result) => {
  sql.query(
    "UPDATE journals SET title = ?, author = ?, vol = ? WHERE id = ?",
    [journals.title, journals.author, journals.vol, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Journals with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated journals: ", { id: id, ...journals });
      result(null, { id: id, ...journals });
    }
  );
};

Journals.remove = (id, result) => {
  sql.query("DELETE FROM journals WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Journals with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted journals with id: ", id);
    result(null, res);
  });
};

Journals.removeAll = result => {
  sql.query("DELETE FROM journals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} journals`);
    result(null, res);
  });
};

module.exports = Journals;