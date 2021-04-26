const sql = require("./db.js");

// constructor
const Credentials = function(credentials) {
    this.user_id= credentials.user_id;
    this.file_path = credentials.file_path;
    this.file_mimetype = credentials.file_mimetype;
};

Credentials.UploadCredentials = (newCredentials, result) => {
sql.query("INSERT INTO credentials SET ?", newCredentials, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }

    console.log("created credentials: ", { id: res.insertId, ...newCredentials });
    result(null, { id: res.insertId, ...newCredentials });
});
};

Credentials.RetrieveCredential = (user_id, result) => {
    sql.query('SELECT * FROM credentials WHERE user_id = ?', [user_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found credentials: ", res);
        result(null, res);
        return;
      }
      // not found Users with the id
      result({ kind: "not_found" }, null);
    });
  };

  Credentials.findById = (credential_id, result) => {
    sql.query(`SELECT * FROM credentials WHERE credential_id = ${credential_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found credential_id: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found credential with the credential_id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Credentials