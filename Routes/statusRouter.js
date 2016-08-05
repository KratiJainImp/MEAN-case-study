/**
 * Created by krati.jain on 1/7/2016.
 */
var express = require('express');
var collectionNameProject = 'project';
var statusRouter = express.Router();
var commonCrudOp = require("./CRUD.js");
statusRouter.route('/')
    .get(function (req, res) {

        var statusData = [
            {
                "date": "Mon Jan 11 2016",
                "singleDateStatusArray": [{
                    "name": "Chris",
                    "todayStatus": "Completed: D-04668 UI: Device Dashboard - Device display order changes after selecting multiple devices and then going to either Assign Groups or tags after making selecting or cancelling out of window",
                    "tomorrowStatus": "To Complete: D-04761 UI: Device Dashboard when setting specified columns and navigating away from page when you go back columns flash and then selected columns display. ",
                    "impediments": "No"
                },
                    {
                        "name": "Harry",
                        "todayStatus": "Completed 90%: [B-159756][TK-490147] Falconizing - Left panel.",
                        "tomorrowStatus": "To Complete : [B-159756][TK-490147] Falconizing - Left panel",
                        "impediments": "No"
                    },
                    {
                        "name": "Dan",
                        "todayStatus": "Resolved 50% D-04522 Regression: UI unable to assign Work Rule Defintions in Applicaiton Configuration Template",
                        "tomorrowStatus": "To Resolve D-04522 Regression: UI unable to assign Work Rule Defintions in Applicaiton Configuration Template ",
                        "impediments": "No"
                    }
                ]
            },
            {
                "date": "Fri Jan 8 2016",
                "singleDateStatusArray": [{
                    "name": "Kyle",
                    "todayStatus": "Completed: D-04764 UI: All dropdwons through XUY if you do not click directly on text the selection does not occur. (Verified on quick build # 744)",
                    "tomorrowStatus": "To Complete: D-04715  UI: 4500 Soft key Settings - Soft key schedules assigned are not getting saved",
                    "impediments": "No"
                }]
            },
            {
                "date": "Thu Jan 7 2016",
                "singleDateStatusArray": [{
                    "name": "Elixir",
                    "todayStatus": "todayusadfiuas",
                    "tomorrowStatus": "tomorrowsdafsad",
                    "impediments": "No"
                }]
            }
        ]

        res.json(statusData);
    })
    .post(function (req, res) {

        var reqBody =req.body;

            var updateCriteria = reqBody.updateCriteria;
            var updatedProjObj = reqBody.updatedObj;

            console.log("reqObjs",updateCriteria,updatedProjObj);
            commonCrudOp.updateProjectInfo(collectionNameProject,updateCriteria,updatedProjObj,function(){
                    res.send("success")
                },
                function(){
                    res.send("failure")
                });

    })
    .put(function (req, res) {
        res.send('status put');
    });


module.exports = statusRouter;

/*


db.project.updateOne({"projectTitle":"sdfasfTEST","statusArray.date":"4/4/4"}, {$set:{"statusArray.$.name":"haryy"} })



    db.students.update(
        { _id: 4, "grades.grade": 85 },
        { $set: { "grades.$.std" : 6 } }
    )

db.findOneAndUpdate ({"projectTitle":"sdfasfTEST","statusArray.date":"4/4/4"},{$set:{"statusArray.$.name":"haryy"} },upsert:true)*/
