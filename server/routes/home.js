const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
router.get("/", function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("home")
    .find({})
    .toArray()
    .then((response) => {
      // console.log(response);
      res.json(response);
    });
});

//post a new record
router.post("/", async function (req, response) {
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
  let myobj = {
    header: req.body.header,
    text: req.body.text,
    image: req.body.image.replaceAll(" ", "+"),
  };

  db_connect.collection("home").insertOne(myobj, function (err, res) {
    if (err) {
      res.sendStatus(400);
      console.log(err);
      return;
    }
    console.log("new record entered")
    response.json(res);
  });
});

//update a record
router.put("/:id", async function (req, response) {
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
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      header: req.body.header,
      text: req.body.text,
      image: req.body.image.replaceAll(" ", "+"),
    },
  };
  db_connect
    .collection("home")
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

//delete a record
router.delete("/:id", async (req, response) => {
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
  db_connect.collection("home").deleteOne(myquery, function (err, obj) {
    if (err) {
      res.sendStatus(400);
      console.log(err);
      return;
    }
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = router;
