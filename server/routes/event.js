const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
router.get("/", function (req, res) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("event")
    .find({})
    .toArray().then(response => {
      console.log(response);
      res.json(response);
    })
});

//post a new record
router.post("/", function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
    };
    db_connect.collection("event").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

//update a new record
router.put("/:id", function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
      },
    };
    db_connect
      .collection("event")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
   });

//delete a record
router.delete("/:id", (req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("event").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });

module.exports = router;