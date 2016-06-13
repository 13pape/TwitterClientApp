angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, IonicTwitter) {

  $scope.$on('$ionicView.enter', function(e) {
 
        if (IonicTwitter.isLoggedIn()) {
            $scope.showFeed();
        } else {
       		$scope.logout();
        }
  });
  
    $scope.formatTime = function(string) { // SHOW MINUTES SINCE POST
    	
    	var now = new Date();
    	var postTime = new Date(Date.parse(string));
    	now = now.getTime() - postTime.getTime();
    	
        return ( Math.round(now/1000/60 ));
    };
  
    $scope.showFeed = function() {
        $scope.twitterFeed = IonicTwitter.getTwitterFeed();
    };
   
    $scope.doRefresh = function() {
        $scope.showFeed();
        $scope.$broadcast('scroll.refreshComplete');
    };
    
  	  $scope.logout = function(){
    		alert('logout!');		
	        window.localStorage['TWITTER_KEY'] = null ;
    
    	  $state.transitionTo('login');
    };
})

.controller('LoginPage', function($scope, $state, IonicTwitter, $ionicLoading, $cordovaOauth, $http) {

	 $scope.$on('$ionicView.enter', function(e) {
 
         if ( window.localStorage.getItem('TWITTER_KEY') != "null" )
         { // CHECK IF THERE IS A TWITTER SESSION
            	 $state.transitionTo('tab.dash');
          }
 	 });
  
	
    $scope.twitterLogin = function(){

          // YOUR TWITTER CALLBACK WILL HAVE TO BE HTTP://LOCALHOST/CALLBACK FOR TESTING BUT
          // IT NEEDS TO BE SET VIA TINYURL.COM
          // SET YOUR CONSUMER KEY AND SECRET HERE
           var consumerKey = "fMNg8ecQmeOTHNFGgJKsGwYbw"; 
           var consumerSecretKey = "cPOHMNSrDXLb1dXrVQP0e3CaeSlVGONzYgGq92gpPh38q9g51Q";

          $cordovaOauth.twitter( consumerKey,  consumerSecretKey)
              .then(function(result){
                
                IonicTwitter.saveToken(result);       
                $state.transitionTo('tab.dash');
        });
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, IonicTwitter) {

})

.controller('AccountCtrl', function($scope) {

});
