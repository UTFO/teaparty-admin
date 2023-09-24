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

    db_connect
    .collection("code")
    .find({})
    .toArray()
    .then((response) => {
        if(response[0].passcode == null) {
            res.sendStatus(400);
            return;
        }

        if(req.body.passcode != response[0].passcode) {
            res.json({"access": false});
            return;
        }

        db_connect.collection("passcode").insertOne(myobj, function (err, res) {
            if (err) { 
                res.sendStatus(400);
                console.log(err);
                return;
            }
        })

        res.json({"access": true, "token": uid});
    });
    
});

module.exports = router;