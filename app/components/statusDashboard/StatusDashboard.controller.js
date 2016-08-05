/**
 * Created by krati.jain on 12/11/2015.
 */
'use strict';
/**
 * Controller : dashboard controller
 */
angular.module("meanStackApp")
    .controller('statusDashboardCtrl', ['$scope', '$uibModal', '$location', 'statusFactory', 'dataSrvc', statusDashboardController]);

function statusDashboardController($scope, $uibModal, $location, statusFactory, dataSrvc) {
    var vm = this;
    vm.createStatusBoard = createStatusBoard;
    vm.openStatusBoard = openStatusBoard;
    vm.addStatusRow = addStatusRow;
    vm.saveStatusChange = saveStatusChange;
    vm.discardStatusChange = discardStatusChange;
    var today = new Date();
    vm.currentStatusObj = {
        date: today.toDateString(),
        singleDateStatusArray: []
    };
    vm.ifAddRow = false;
    var currentIndex=-1;
    var projectTitle= dataSrvc.getSelectedProject();
    var updateCriteria = {"projectTitle" : projectTitle};
$scope.username= "tes";

    /* TODO: No more required
     var modalTemplateUrl = 'app/components/statusDashboard/addStatusModal.html',
     modalCtrl = 'addStatusCtrl',
     modalCtrlAs = 'addStatusCtrl',
     size = 'lg';*/

    init();
    function init() {
        statusFactory.getAllStatus(
            function (data) {
                //  TODO: commented as right now testing via static data
              /*  data = [
                    {
                        "date": "01/11/2016",
                        "singleDateStatusArray": [{
                            "name": "Chris",
                            "todayStatus": "todayusadfiuas",
                            "tomorrowStatus": "tomorrowsdafsad",
                            "impediments": " tesat asdf asdf asdf asdf "
                        }]
                    },
                    {
                        "date": "08/01/2016",
                        "singleDateStatusArray": [{
                            "todayStatus": "todayusadfiuas",
                            "tomorrowStatus": "tomorrowsdafsad",
                            "impediments": " tesat asdf asdf asdf asdf "
                        }]
                    },
                    {
                        "date": "07/01/2016",
                        "singleDateStatusArray": [{
                            "name": "krati",
                            "todayStatus": "todayusadfiuas",
                            "tomorrowStatus": "tomorrowsdafsad",
                            "impediments": " tesat asdf asdf asdf asdf "
                        }]
                    }
                ]*/

                vm.statusBoardArray = data;
                vm.statusBoardArray =[]; //TODO : added to check the first case
                checkForCurrentStatus();

                if(currentIndex==-1){
                        vm.statusBoardArray.unshift(vm.currentStatusObj);
                        currentIndex = 0;

                }
            },
            function (err) {
                console.log("Request Failed due to ", err)
            }
        )


    }

    function createStatusBoard() {
        var statusObj = {
                "status": {},
                "isEditMode": false // TODO: Not in use yet
            },
            resolveObj = {
                "statusDashboardCtrl": function () {

                    return statusObj;

                }
            }

        var modalInstance = dataSrvc.openModal(modalTemplateUrl, modalCtrl, modalCtrlAs, resolveObj, size);

        modalInstance.result.then(function (statusBoard, test) {
                alert(test)
                vm.statusBoardArray.push(statusBoard);
            },
            function () {

            })
    }


    function openStatusBoard(status, index) {

        vm.currentStatusObj  = status;
        /* TODO : no more required

         var statusObj = {
         "status": status,
         "isEditMode": true     // TODO: Not in use yet
         },
         resolveObj = {
         "statusDashboardCtrl": function () {

         return statusObj;

         }
         }

         var modalInstance = dataSrvc.openModal(modalTemplateUrl, modalCtrl, modalCtrlAs, resolveObj, size);
         modalInstance.result.then(function (updatedStatus) {
         vm.statusBoardArray[index].statusArray = updatedStatus;

         },
         function () {

         });
         */
    }

    function addStatusRow() {
        vm.currentStatusObj.singleDateStatusArray.push(angular.copy(vm.newStatusRow));
        vm.newStatusRow = {};
    }

    function checkForCurrentStatus() {
        angular.forEach(vm.statusBoardArray, function (data, index) {
            var date = new Date(data.date).toDateString()
            if (date == today.toDateString()) {
                vm.currentStatusObj = angular.copy(data);
                currentIndex = index;
            }

        })
    }

    function saveStatusChange(){
        //TODO : API call for status update
        vm.statusBoardArray[currentIndex] =  angular.copy(vm.currentStatusObj);

        statusFactory.createNewStatus({},
            {"updateCriteria" :updateCriteria,"updatedObj" :  vm.currentStatusObj},
        function(res){
            console.log(res);
        },
        function(err){

        })
    }

    function discardStatusChange(){
        vm.currentStatusObj = angular.copy(vm.statusBoardArray[currentIndex]);
    }
}


