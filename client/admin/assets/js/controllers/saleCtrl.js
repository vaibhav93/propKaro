'use strict';
/**
 * controllers for for city

 * Simple table with sorting and filtering on AngularJS
 */
 app.controller('saleCtrl', ["$scope", "$filter","$timeout", "UQUser", "usSpinnerService","toaster",
    function ($scope,$filter,$timeout,UQUser,usSpinnerService,toaster) {

        $scope.form = {
            firstname:'',
            lastname:'',
            primaryno:'',
            secondaryno:''
        };
        
        $scope.generatePassword=function(length) {
            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
            var pass = "";
            for (var x = 0; x < length; x++) {
                var i = Math.floor(Math.random() * chars.length);
                pass += chars.charAt(i);
            }
            $scope.newUser.password = pass;
        }
        $scope.toasterSuccess = {
            type: 'success',
            title: 'Success',
            text: 'New User Created'
        };
        $scope.toasterError = {
            type: 'error',
            title: 'Error',
            text: 'Username already exists'
        };
        $scope.master = $scope.newUser;
        $scope.form = {

            submit: function (form) {

                usSpinnerService.spin('spinner-1');
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

                    // SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                    return;

                } else {
                    $scope.newUser.email = $scope.newUser.username + '@uniquick.com';
                    $scope.newUser.role = 'users';
                    UQUser.create($scope.newUser,function(success){
                        usSpinnerService.stop('spinner-1');
                        $scope.form.reset(form);
                        // console.log(success);
                        toaster.pop($scope.toasterSuccess.type, $scope.toasterSuccess.title, $scope.toasterSuccess.text);
                    },function(err){
                        usSpinnerService.stop('spinner-1');
                        // console.log('errrrrroorrr');
                        $scope.form.reset(form);
                        console.log(err);
                        toaster.pop($scope.toasterError.type, $scope.toasterError.title, $scope.toasterError.text);
                    });
                //your code for submit
            }

        },
        reset: function (form) {

            $scope.sale = {
                firstname:'',
                lastname:'',
                primaryno:'',
                secondaryno:''
            };
            form.$setPristine(true);

        }
    };
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };
        $scope.endOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.dt = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.dt);
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

}]);