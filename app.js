const http = require("http"); // for create server

const path = require("path"); // for __dirname to replace
const express = require("express"); // express.js
const adminRoutes = require("./routes/admin"); //admin.js import file
const userRoutes = require("./routes/shop"); // shop.js import file
const db = require("./utils/database"); //import database
const bodyParser = require("body-parser"); // want to know data in the body
const app = express(); // object of express.js
const Port = 3000; //port number dynamic

console.log("🚀 ~ file: app.js:10 ~ Port:", Port);
const expressHbs = require("express-handlebars"); // view engine handlebars
const rootDir = require("./utils/path"); // import utils
const errorController = require("./controllers/error"); //import controller

app.set("view engine", "ejs"); // ask express.js to view engine is ejs

app.use(bodyParser.urlencoded({ extended: false })); // to output the body data
app.use("/admin", adminRoutes); // link the adminRoutes
app.use(express.static(path.join(rootDir, "public"))); // css file input
app.use(userRoutes); // link userRoutes
app.use(errorController.Page_404); // link 404 page

app.listen(
  Port,
  console.log(`Your Server is running http://localhost:${Port}`)
);
//server create port and log the link that the server is create
