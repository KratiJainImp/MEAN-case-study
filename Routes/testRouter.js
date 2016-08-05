/**
 * Created by krati.jain on 12/29/2015.
 */
var express = require('express');

var testRouter = express.Router();

/*var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mean-stack-db';*/

// middleware that is specific to this router

/*
testRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
*/




/*
 testRouter.get('/', function (req, res) {

 console.log('Time: / ');
 res.json({success: "Successfully in /"});
 });

 testRouter.get('/testRouter', function (req, res) {
 console.log('Time: /testRouter ');
 res.json({success: "Successfully in testRouter"});

 });
 */

testRouter.route('/')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    })
    .delete(function(req,res){

    });



module.exports = testRouter;