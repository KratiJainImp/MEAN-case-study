/**
 * Created by krati.jain on 1/4/2016.
 */
angular.module("meanStackApp").factory('projectFactory', ['$resource', function projectFactory($resource) {

    //$resource(url, [paramDefaults], [actions], options);
    return $resource('/project',{}, {

        getAllProjects: {
            method: 'GET',
            isAjax: true,
            isArray : true
           /* param: {
                action: 'showECFHeaderLiteAction',
                showEcf: 'true'
            }*/
        },
        createNewProject :{
            method: 'POST',
            isAjax: true,

        },
        updateProject:{
            method : 'PUT',
            isAjax :true
        },
        deleteProject : {
            method: 'PUT',
            isAjax : true,

        }



    });
}]);
