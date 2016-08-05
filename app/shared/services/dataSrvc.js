'use strict';
angular.module("meanStackApp").service('dataSrvc', function ($http, $uibModal) {

    this.alertClassObj = {
        '1': 'alert alert-success',
        '0': 'alert alert-warning',
        '-1': 'alert alert-danger'
    }

    this.selectedProject = null;
    this.getData = function (dataURI) {
        return $http({method: 'GET', url: dataURI})
            .success(function (resp) {
                return resp;
            })
            .error(function (err) {
                console.log("Error While Fetching Data " + dataURI);
            });
    }
    this.postData = function (dataURI, data) {
        return $http({method: 'POST', url: dataURI, data: data})
            .success(function (resp) {
                return resp;
            })
            .error(function (err) {
                console.log("Error While Fetching Data " + dataURI);
            });
    }

    this.resetPassword = function (dataURI, data) {
        return $http({method: 'POST', url: dataURI, data: data})
            .success(function (resp) {
                return resp;
            })
            .error(function (err) {
                alert("Error resetting password" + err);
                console.log("Error resetting password" + err);
            });
    }


    this.testRouter = function (dataURI) {
        return $http({method: 'GET', url: dataURI})
            .success(function (resp) {
                console.log("Success testing", resp);
            })
            .error(function (err) {
                console.log("Error testing");
            });
    }

    this.getAllUsers = function (dataURI) {
        return $http({method: 'GET', url: dataURI})
            .success(function (resp) {
                return resp;
            })
            .error(function (err) {
                console.log("Error users");
            });
    }

    this.openModal = function (template, ctrl, ctrlAs, resolveObj,size) {


        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: ctrl,
            controllerAs: ctrlAs,
            resolve: resolveObj,
            size : size,
            backdrop: 'static'
        });

        return modalInstance;
    }

    this.setAlert = function(alertObj,scope){
        scope.alertClass = this.alertClassObj[alertObj.resFlag];
        scope.showAlert = true;
        scope.alertMsg = alertObj.msg;
        setTimeout(function () {
            scope.showAlert = false;
            scope.$apply();
        }, 3000);
    }

    this.setSelectedProject = function(projectTitle){
        this.selectedProject=projectTitle;
    }
    this.getSelectedProject = function(){
        return this.selectedProject;
    }

});