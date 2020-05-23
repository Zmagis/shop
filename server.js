const express = require("express");

const cors = require("cors");
var mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS niddleware, enable CORS on the server
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

// Create connection to database
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sys", // If database not exist, for the first time running npm start, comment this line and uncomment later.
  // insecureAuth: true,
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
// query to check if database is exist, if not create one named 'sys'
db.query("CREATE DATABASE IF NOT EXISTS sys", function (err) {
  if (err) throw err;
  // query to check for tables and create them if not exist
  db.query("USE sys", function (err) {
    if (err) throw err;
    db.query(
      "CREATE TABLE IF NOT EXISTS users(" +
        "id INT NOT NULL AUTO_INCREMENT," +
        "PRIMARY KEY(id)," +
        "username VARCHAR(30)," +
        "userpass VARCHAR(30)" +
        ")",
      function (err) {
        if (err) throw err;
      }
    );
    db.query(
      "CREATE TABLE IF NOT EXISTS products(" +
        "idProducts INT NOT NULL AUTO_INCREMENT," +
        "PRIMARY KEY(idProducts)," +
        "Name VARCHAR(100)," +
        "Price DECIMAL(10,2)" +
        ")",
      function (err) {
        if (err) throw err;
      }
    );
  });
});

// route for showing products in client index page
app.get("/api/product", (req, res) => {
  //const product  = [
  //{ id: 1, name: 'Tv', price: 10 },
  //{ id: 2, name: 'PC', price: 11 },
  // { id: 3, name: 'batas', price: 12 },
  // ];
  let sql = "SELECT * FROM products"; // Selecting products from already created table on mySQL workbench
  let query = db.query(sql, (err, product) => {
    if (err) throw err;
    console.log(product);
    res.json(product);
  });
  //res.json(product);
});

// get route from client submited data to register form
app.post("/create", (req, res) => {
  const userInput = {
    username: req.body.username.value,
    userpass: req.body.password.value,
  };
  console.log(userInput);
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, userInput, (err, result) => {
    if (err) throw err;
    console.log(result);
  });

  res.status(201).json({ some: "connected" });
});

// get route from client submited data to login form
app.post("/login", (req, res) => {
  var username = req.body.username.value;
  var userpass = req.body.password.value;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if (results.length > 0) {
          //const comparision = await bcrypt.compare(userpass, results[0].userpass)
          const comparision = userpass == results[0].userpass;
          if (comparision) {
            console.log("connected");
            res.send({
              code: 200,
              success: "login sucessfull",
            });
          } else {
            console.log("wrond username and/or password");
            res.send({
              code: 204,
              success: "Email and password does not match",
            });
          }
        } else {
          console.log("username does not exits");
          res.send({
            code: 206,
            success: "Email does not exits",
          });
        }
      }
    }
  );
});

const port = 9000;

app.listen(port, () => console.log(`server started on port ${port}`));
