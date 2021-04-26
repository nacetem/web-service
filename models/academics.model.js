const sql = require("./db.js");

// constructor
const Academics = function(academics) {
  this.session = academics.session
  this.semester = academics.semester;
 
};

Academics.create = (newAcademics, result) => {
  sql.query("INSERT INTO academics SET ?", newAcademics, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created academics: ", { id: res.insertId, ...newAcademics });
    result(null, { id: res.insertId, ...newAcademics });
  });
};

Academics.getAll = result => {
  sql.query("SELECT * FROM academics", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("academics: ", res);
    result(null, res);
  });
};

Academics.remove = (id, result) => {
  sql.query("DELETE FROM academics WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Academics with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted academics with id: ", id);
    result(null, res);
  });
};

Academics.removeAll = result => {
  sql.query("DELETE FROM academics", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} academics`);
    result(null, res);
  });
};

module.exports = Academics;