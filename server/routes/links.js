const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
router.get("/", function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("links")
    .find({})
    .toArray()
    .then((response) => {
      console.log(response);
      res.json(response);
    });
});

//update a record
router.patch("/:id", async function (req, response) {
  const header = req.headers["authorization"]
  if (!header) {
    res.sendStatus(403)
    console.log("no auth")
    return;
  }
  const token = header.split(" ")[1]
  
  let db_connect = dbo.getDb();
  const tokenResults = await db_connect.collection("passcode").find({token: token}).toArray()
  if (tokenResults.length != 1) {
    res.sendStatus(403)
    console.log("invalid token")
    return;
  }
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      signup: req.body.signup,
      email: req.body.email,
      instagram: req.body.instagram,
    },
  };
  db_connect
    .collection("links")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) {
        res.sendStatus(400);
        console.log(err);
        return;
      }
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = router;
