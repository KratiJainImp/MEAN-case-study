/**
 * Created by krati.jain on 12/11/2015.
 */
'use strict';
/**
 * Controller : dashboard controller
 */
angular.module("meanStackApp")
    .controller('projectDashboardCtrl', ['$scope', '$uibModal', 'dataSrvc', '$location', 'projectFactory', projectDashboardController]);

function projectDashboardController($scope, $uibModal, dataSrvc, $location, projectFactory) {
    var vm = this;
    vm.projectBoardArray = [];
    vm.editProjectBoard = editProjectBoard;
    vm.createProjectBoard = createProjectBoard;
    vm.openProjectStatusBoard = openProjectStatusBoard;
    vm.deleteProjectBoard = deleteProjectBoard;
    var alertClassObj = {
        '1': 'alert alert-success',
        '0': 'alert alert-warning',
        '-1': 'alert alert-danger'
    }
    $scope.alertMsg = ""
    $scope.alertClass = "";
    $scope.showAlert = true;
    var modalTemplateUrl = 'app/components/projectDashboard/addProjectModal.html',
        modalCtrl = 'addProjectCtrl',
        modalCtrlAs = 'addProjectCtrl';

    init();
    /* TODO : to be removed
     vm.projectBoardArray = [{
     projectTitle: "Kronos",
     projectDesc: "Lorem ipsum",
     projectTeam:['mem1','mem2']

     },
     {
     projectTitle: "Amex",
     projectDesc: "Lorem ipsum",
     projectTeam:['mem1','mem2']
     }]*/


    function init() {
        projectFactory.getAllProjects(
            function (data) {
                vm.projectBoardArray = data;
            },
            function (err) {
                console.log("Request Failed due to ", err)
            }
        )

        var users = dataSrvc.getAllUsers('/users');

    }

    function createProjectBoard() {

        var projectObj = {
                "project": {},
                "isEditMode": false
            },
            resolveObj = {
                "projectDashboardCtrl": function () {
                    return projectObj;

                }
            }
        var modalInstance = dataSrvc.openModal(modalTemplateUrl, modalCtrl, modalCtrlAs, resolveObj);

        modalInstance.result.then(function (obj) {

                var response = obj.responseObj;
                if (response.resFlag == 1)
                   init();
                dataSrvc.setAlert(response,$scope);

            },
            function (response) {
                console.log('dismiss');
                dataSrvc.setAlert(response,$scope);
            })
    }

    function editProjectBoard(projectBoard, index) {

        var projectObj = {
                "project": projectBoard,
                "isEditMode": true
            },
            resolveObj = {
                "projectDashboardCtrl": function () {
                    return projectObj;

                }
            }

        var modalInstance = dataSrvc.openModal(modalTemplateUrl, modalCtrl, modalCtrlAs, resolveObj);

        modalInstance.result.then(function (edittedProjectBoard) {
                init();

            },
            function () {

            })
    }

    function openProjectStatusBoard(projectTilte) {

        dataSrvc.setSelectedProject(projectTilte);
        $location.path('/statusDashboard');
    }

    function deleteProjectBoard(projectTitle){
        var deleteCriteria = {"projectTitle":projectTitle};
        projectFactory.deleteProject({},{"deleteCriteria":deleteCriteria},
        function(res){
            vm.projectBoardArray = res.data;
            dataSrvc.setAlert(res,$scope);
        },
        function(err){
            console.log(err);
        })
    }
    vm.clearAll = function(){
        //projectFactory.deleteProject()
    }

}
