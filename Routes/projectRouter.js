/**
 * Created by krati.jain on 1/4/2016.
 */

var express = require('express');
var commonCrudOp = require("./CRUD.js");
var responseObj;
var projectRouter = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mean-stack-db';
var collectionNameProject = "project";
// middleware that is specific to this router

/*
 testRouter.use(function timeLog(req, res, next) {
 console.log('Time: ', Date.now());
 next();
 });
 */


//when /project is hit

/*projectRouter.get('/', function (req, res) {

 console.log('Time: / ');
 res.json({success: "Successfully in /"});
 });

 projectRouter.get('/testRouter', function (req, res) {
 console.log('Time: /testRouter ');
 res.json({success: "Successfully in testRouter"});

 });*/


projectRouter.route('/')
    .get(function (req, res) {

        commonCrudOp.getAll(collectionNameProject, function (data) {
                res.json(data);
        },
        function(err){
            res.json(err);
        });
    })
    .post(function (req, res) {

        var projObj = req.body;
         projObj.statusArray =[];
        commonCrudOp.insert(collectionNameProject, projObj, function () {
                var responseObj = {msg: "Project Added Succussfully", resFlag: 1};
                res.send(responseObj)
            },
            function () {
                var responseObj = {msg: "Duplicate Project Name.", resFlag: 0};
                res.send(responseObj);
            });
    })
    .put(function (req, res) {

        var reqBody =req.body;

        if(reqBody.updateCriteria){
            var updateCriteria = reqBody.updateCriteria;
            var updatedProjObj = reqBody.updatedObj;

            console.log("reqObjs",updateCriteria,updatedProjObj);
            commonCrudOp.updateProjectInfo(collectionNameProject,updateCriteria,updatedProjObj,function(){
                    res.send("success")
                },
                function(){
                    res.send("failure")
                });
        }

        if(reqBody.deleteCriteria){
            var deleteCriteria = reqBody.deleteCriteria;
            console.log("delete",reqBody,deleteCriteria);
            commonCrudOp.deleteProject(collectionNameProject,deleteCriteria,function(data){
                    res.json( {msg: "Project Deleted Succussfully", resFlag: 1 ,data :data});
                },
                function(err){
                    res.json({msg: "Error deleting Project", resFlag: -1});
                })
        }


    })
        .delete(function(req,res){
            var reqBody = req.body;
        var deleteCriteria = reqBody.deleteCriteria;
        console.log("delete",reqBody,deleteCriteria);
        commonCrudOp.deleteProject(collectionNameProject,deleteCriteria,function(data){
                res.json( {msg: "Project Deleted Succussfully", resFlag: 1 ,data :data});
            },
            function(err){
                res.json({msg: "Error deleting Project", resFlag: -1});
            })
        });

var updateProjectInfo = function(projObj){

}
module.exports = projectRouter;