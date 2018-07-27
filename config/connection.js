// Set up MySQL connection.
const mysql = require("mysql");

const connection = mysql.createConnection({
  port: 3306,
  host: "127.0.0.1",
  user: "root",
  password: "baseball",
  database: "tjk_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;