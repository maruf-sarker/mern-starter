const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const playersRouter = require("./routes/players");

// Now define a port number in which our app needs to be started.
const port = process.env.PORT || 3001;

// Use the logger package we have imported to get the log details of our application if needed.
app.use(logger("dev"));

// Now use cors to enable Cross-Origin Resource Sharing.
app.use(cors());

// Also, use body-parser to handle HTTP POST requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// We did not create any route yet. But in the upcoming steps, it will be made and configured. So just add the below lines in our root file to set up a /players route.

app.use("/players", playersRouter);

// We already defined a port number and it needs to be used when starting our project. So this port number must listen to our application.
app.listen(port, function () {
  console.log("Runnning on " + port);
});

// Now export the module app we have created.
module.exports = app;
