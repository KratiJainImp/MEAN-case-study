var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require('mongodb');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));
var server = app.listen(8000);
console.log("connected to server at port 8000");

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mean-stack-db';


var testRouter = require("./Routes/testRouter");
var projectRouter = require("./Routes/projectRouter");
var statusRouter = require("./Routes/statusRouter");
app.use('/testRouter', testRouter);
app.use('/project', projectRouter)
app.use('/status', statusRouter)



app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    doLogin('users', username, password, function (userData) {
        res.json(userData);
    }, function () {
        res.json({error: "Invalid User"});
    });
});


app.post('/signup', function (req, res) {

    doRegistration('users', req.body, function (flag) {
        res.json({success: "Successfully Registered"});
    }, function () {
        res.json({error: "Some Error Occurred"});
    });
});


app.get('/barChartData', function (req, res) {
    find('bar-chart-data', function (data) {
        res.json(data);
    }, function () {
        res.json([]);
    });
});

app.get('/pieChartData', function (req, res) {
    find('pie-chart-data', function (data) {
        res.json(data);
    }, function () {
        res.json([]);
    });
});

app.post('/reset', function (req, res) {
    resetPassword("users", req.body.username, function (result, newPass) {
            if (result.result.nModified == 0) {

                res.json({resetMsg: "Unable to reset Password. Please check the username"});
            }
            else {
                res.json({resetMsg: "Password reset successfully to " + newPass});
            }

        },
        function (err) {
            res.json(data);
        });

});


app.get('/users', function (req, res) {
   /* getAllUsers("users", function (usersArr) {
        //TODO: this is second argument to the function getAllusers which will act as success callback method



        res.json(usersArr);
    }, function (err) {
        //this is third argument to the function getAllusers which will act as failure  callback method
    })*/
    find('users',function(data){
            res.json(data);
    },
    function(error){
        res.json(error);
    })

});


var doLogin = function (collectionName, username, password, successCallback, failureCallback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            var collection = db.collection(collectionName);
            var collectionPro = db.collection("project");
            collectionPro.insert([{name : "myProj"}]);
            find("project",function(data){

                    console.log("proj",data);
                },
                function(error){

                })
            collection.findOne({username: username, password: password}, function (err, doc) {
                if (doc) {
                    successCallback(doc);
                    db.close();
                } else {
                    failureCallback();
                    db.close();
                }
            });

        }
    });


}


var doRegistration = function (collectionName, userData, successCallback, failureCallback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            var collection = db.collection(collectionName);
            collection.insert([userData], function (err, result) {
                if (err) {
                    failureCallback();
                    db.close();

                } else {
                    successCallback(result);
                    db.close();
                }
            });

        }
    });


}

var find = function (collectionName, successCallback, failureCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            var collection = db.collection(collectionName);
            collection.find({}).toArray(function (err, docs) {
                if (docs) {
                    successCallback(docs);
                    db.close();
                } else {
                    failureCallback();
                    db.close();
                }
            });

        }
    });
}

var resetPassword = function (collectionName, username, successCallback, failureCallback) {

    var newPass = getRandomPassword();
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            var collection = db.collection(collectionName);
            collection.update({username: username},
                {
                    $set: {
                        password: newPass
                    }
                },
                function (err, result) {
                    if (err) {
                        failureCallback();
                        db.close();

                    } else {
                        successCallback(result, newPass);
                        db.close();
                    }
                }
            )
        }
    });


}

var getAllUsers = function (collectionName, successCallBack, failureCallback) {
    /* TODO
     MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            var myCursor = db.collection(collectionName).find();
            console.log("myCursor", myCursor);
            var myDocument = myCursor.hasNext() ? myCursor.next() : null;
            console.log("myDocument", myDocument);
            if (myDocument) {
                var myName = myDocument.username;
                console.log("myName", myName);
            }


        }
    });*/


    var usersArr = [
        {
            username: "Kyle"
        },
        {
            username: "Daniel"
        },
        {
            username: "Graham"
        },
        {
            username: "Nicol"
        },
        {
            username : "Bredd"
        },
        {
            username: "Martin"
        },
        {
            username: "Austin"
        },
        {
            username : "Laurie"
        },
        {
            username : "Bryan"
        }
    ]
    successCallBack(usersArr)
}

var getRandomPassword = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}
