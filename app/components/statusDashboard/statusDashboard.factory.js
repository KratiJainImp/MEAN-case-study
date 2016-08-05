/**
 * Created by krati.jain on 1/4/2016.
 */
angular.module("meanStackApp").factory('statusFactory', ['$resource', function statusFactory($resource) {

    //$resource(url, [paramDefaults], [actions], options);
    return $resource('/status',{}, {

        getAllStatus: {
            method: 'GET',
            isAjax: true,
            isArray : true
           /* param: {
                action: 'showECFHeaderLiteAction',
                showEcf: 'true'
            }*/
        },
        createNewStatus :{
            method: 'POST',
            isAjax: true,

        },
        updateStatus:{
            method : 'PUT',
            isAjax :true
        },
        deleteStatus : {
            method: 'DELETE',
            isAjax : true
        }



    });
}]);
