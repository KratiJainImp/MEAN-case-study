/**
 * Created by krati.jain on 12/14/2015.
 */
/**
 * Controller : dashboard controller
 */
angular.module("meanStackApp")
    .controller('addProjectCtrl', ['$scope', '$uibModalInstance', 'dataSrvc', 'projectDashboardCtrl', 'projectFactory', addNewProjectController]);

function addNewProjectController($scope, $uibModalInstance, dataSrvc, projectDashboardCtrl, projectFactory) {
    var vm = this;
    var projectOrig = angular.copy(projectDashboardCtrl);
    vm.selectedMember = {};
    vm.projectBoard = projectOrig.project;
    vm.isEditMode = projectOrig.isEditMode;
    vm.projectTitle = projectOrig.project.projectTitle;
    var updateCriteria = {"projectTitle" : projectOrig.project.projectTitle};
    vm.saveProjectBoard = saveProjectBoard;
    vm.deleteProjectBoard = deleteProjectBoard;

    var init = function init() {
        dataSrvc.getAllUsers("/users").then(
            function (response) {
                vm.userArray = response.data;
                angular.forEach(vm.userArray, function (value) {
                    value.isChecked = false;
                })
            },
            function (error) {

            }
        )
    }

    function saveProjectBoard() {
        vm.projectBoard.projectTeam = [];
        vm.userArray.filter(function (user) {
            if (user.isChecked)
                vm.projectBoard.projectTeam.push(user.username);
            return user.username;
        })
        //TODO: API call for adding project

        if (vm.isEditMode) {
            delete vm.projectBoard['_id'];
            projectFactory.updateProject({},
                {"updateCriteria" :updateCriteria,"updatedObj" : vm.projectBoard},
                function (response) {
                    $uibModalInstance.close({responseObj: response});
                },
                function (err) {
                    $uibModalInstance.dismiss(err);
                });
        }
        else {
            projectFactory.createNewProject({},
                vm.projectBoard,
                function (response) {
                    $uibModalInstance.close({responseObj: response});
                },
                function (err) {
                    $uibModalInstance.dismiss(err);
                });
        }


    }

    function deleteProjectBoard() {
        alert("Under Construction...!!!")
    }

    vm.cancel = function () {

        $uibModalInstance.dismiss();
    }

    init();

}



