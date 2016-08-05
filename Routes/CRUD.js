/**
 * Created by pc on 01-03-2016.
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mean-stack-db';
exports.insert = function (collectionName, postObj, successCallback, failureCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            var collection = db.collection(collectionName);
            collection.insert([postObj], null, function (err, result) {
                if (err) {
                    console.log(err)
                    failureCallback(err);
                }
                else {
                    successCallback(result);
                }
            });

        }
    });
}
var _this = this;

exports.getAll = function (collectionName, successCallback, failureCallback) {
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
                    failureCallback(err);
                    db.close();
                }
            });

        }
    });
}

exports.update = function (collectionName, updatedData, successCallback, failureCallback) {
    /*  MongoClient.connect(url, function (err, db) {
     if (err) {
     console.log('Unable to connect to the mongoDB server. Error:', err);
     }
     else {
     console.log('Connection established to', url);
     var collection = db.collection(collectionName);
     collection.save([updatedData,function(err,docs){
     if (docs) {
     successCallback(docs);
     db.close();
     } else {
     failureCallback(err);
     db.close();
     }
     }])
     }
     });*/
}

exports.updateProjectInfo = function (collectionName,updateCriteria, updatedData, successCallback, failureCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            var collection = db.collection(collectionName);
            /*collection.save([updatedData, function (err, docs) {
                if (docs) {
                    successCallback(docs);
                    db.close();
                } else {
                    failureCallback(err);
                    db.close();
                }
            }])*/

            collection.updateOne(updateCriteria,{$set : updatedData},function(err,res){
                if(err){
                    console.log("errrrrrr :(")
                    failureCallback(err);
                    db.close();
                }
                else
                console.log("successsssssssssss :) update")
                successCallback();
                db.close();
            })

        }
    });
}


exports.deleteProject = function (collectionName,deleteCriteria, successCallback, failureCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection for delete established to', url);
            var collection = db.collection(collectionName);
            collection.deleteOne(deleteCriteria,function(err,res){
                if(err){
                    console.log("errrrrrr :(")
                    failureCallback(err);
                    db.close();
                }
                else
                    console.log("successsssssssssss :) delete")
                _this.getAll(collectionName,successCallback,failureCallback);
                db.close();
            })

        }
    });

}

exports.test = function () {
    console.log("testset works");
}