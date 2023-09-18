const express = require("express");
const router = express.Router();
const dbo = require("../db/conn");
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(); 

router.post("/", function (req, res) {
    let db_connect = dbo.getDb();
    const uid = uidgen.generateSync()
    let myobj = {
        token: uid
      };
    
    db_connect.collection("passcode").insertOne(myobj, function (err, res) {
        if (err) { 
            res.sendStatus(400);
            console.log(err);
            return;
        }
    })
    console.log("token: " + uid)
    // TODO: generate UUID token
    res.json({"access": req.body.passcode == "passcode", "token": uid});
});

module.exports = router;