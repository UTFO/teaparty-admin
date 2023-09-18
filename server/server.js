const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/about", require("./routes/about"));
app.use("/event", require("./routes/event"));
app.use("/faq", require("./routes/faq"));
app.use("/team", require("./routes/team"));
app.use("/home", require("./routes/home"));
app.use("/links", require("./routes/links"));
app.use("/passcode", require("./routes/passcode"));

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
