const express = require("express");

const cors = require("cors");
const mysql = require("mysql"); //was var. Why?

// Create connection to database
const db = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "password",
  //   database: "sys",
  //   insecureAuth: true,
});

// Connect to database
db.connect((err) => {
  if (err) throw err;

  console.log("Connected!");
});

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

// route for showing products in client index page
app.get("/api/product", (req, res) => {
  const product = [
    { id: 1, name: "Tv", price: 10 },
    { id: 2, name: "PC", price: 11 },
    { id: 3, name: "batas", price: 12 },
  ];
  //    let sql = 'SELECT * FROM products'; // Selecting products from already created table on mySQL workbench
  //    let query = db.query(sql,(err, product) => {
  //     if (err) throw err;
  //     console.log(product);
  //     res.json(product)
  //    });
  res.json(product);
});

// get route from client submited data into login form

// app.post("/create", (req, res) => {
//   const userInput = {
//     username: req.body.username.value,
//     userpass: req.body.password.value,
//   };
//   console.log("userInput");
//   let sql = "INSERT INTO users SET ?";
//   let query = db.query(sql, userInput, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

//   res.status(201).json({ some: "connected" });
// });

const port = 9000;

app.listen(port, () => console.log(`server started on port ${port}`));
