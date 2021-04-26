const sql = require("./db.js");

// constructor
const Users = function(users) {
    this.email= users.email;
    this.password = users.password;
};

Users.signup = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

Users.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };

Users.findByEmail = (email, result) => {
    sql.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found users: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Users with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Users;