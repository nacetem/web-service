const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const apicache = require('apicache');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
// let cache = apicache.middleware;
// app.use(cache('10 minutes'));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: '*',
  credentials: true, // <-- REQUIRED backend setting
  headers:'Content-Type, Authorization, x-access-token, Content-Length, X-Requested-With'
};
app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nacetem web service." });
});
require("./routes/students.routes.js")(app);
require("./routes/users.routes.js")(app);
require("./routes/credentials.routes.js")(app);
require("./routes/academics.routes.js")(app);
require("./routes/journals.routes.js")(app);

// set port, listen for requests
app.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
