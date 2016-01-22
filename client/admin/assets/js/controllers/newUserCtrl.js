'use strict';
/**
 * controllers for for city

 * Simple table with sorting and filtering on AngularJS
 */
 app.controller('newUserCtrl', ["$scope", "$filter","$timeout",  
    function ($scope,$filter,$timeout) {

        $scope.newUser = {
            name:'',
            contact:null,
            username:'',
            password:''
        };
        
        $scope.master = $scope.newUser;
        $scope.form = {

            submit: function (form) {
                var firstError = null;
                if (form.$invalid) {

                    var field = null, firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }

                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }

                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                    return;

                } else {
                    SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
                //your code for submit
            }

        },
        reset: function (form) {
            console.log('reset');
            $scope.newUser = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };


}]);