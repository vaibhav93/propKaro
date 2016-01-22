'use strict';
/** 
  * Controller for login
*/
app.controller('LoginCtrl', ["User","$scope","$state","$rootScope","$localStorage","toaster", 
	function (User,$scope,$state,$rootScope,$localStorage,toaster) {
	    $scope.toaster = {
        type: 'error',
        title: 'Invalid login',
        text: 'Unauthorized access'
    };

	$scope.credentials = {
    username: '',
    password: ''
  	};
  	$rootScope.$on('$stateChangePermissionDenied',function(){
  		toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  	});

	$scope.login = function (){
		$scope.loginResult = User.login($scope.credentials,
			function(res) {
			$localStorage.accessToken = res.id;
			$rootScope.user = res.user; 
			$localStorage.user = res.user;
        	$state.go('app.dashboard');
      }, function(res) {
        //console.log('invalid login');
      	toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        $state.go('login.signin');
      });		
	};

	
}]);