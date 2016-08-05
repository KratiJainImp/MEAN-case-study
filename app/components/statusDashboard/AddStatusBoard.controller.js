/* File no more in use and hence commented to avoid confusion
/!**
 * Created by krati.jain on 12/14/2015.
 *!/
/!**
 * Controller : dashboard controller
 *!/
angular.module("meanStackApp")
    .controller('addStatusCtrl', ['$scope', '$uibModalInstance','statusDashboardCtrl', addNewStatusController]);

function addNewStatusController($scope, $uibModalInstance,statusDashboardCtrl) {
    var vm = this;
    var statusBoardObj = angular.copy(statusDashboardCtrl);
    vm.statusArray = statusBoardObj.status.statusArray?statusBoardObj.status.statusArray : [];
    vm.newStatusRow = {};
    vm.statusDate = statusBoardObj.status.date;
    vm.isEditMode = statusBoardObj.isEditMode;

    vm.addStatusBoard = function addStatusBoard(){
        //TODO: API call for adding status
        var statusBoard = {
            statusArray : vm.statusArray
        }
        $uibModalInstance.close(vm.statusArray);
    }
    vm.addStatusRow = function(){
        vm.statusArray.push(angular.copy(vm.newStatusRow));
        vm.newStatusRow={};
    }
    vm.cancel = function(){
        $uibModalInstance.dismiss();
    }
}



*/
