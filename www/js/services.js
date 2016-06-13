angular.module('starter.services', [])

.factory('IonicTwitter', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
    
    var consumerID = 'fMNg8ecQmeOTHNFGgJKsGwYbw'; // put your twitter ap id here
    var consumerSecretKey = 'cPOHMNSrDXLb1dXrVQP0e3CaeSlVGONzYgGq92gpPh38q9g51Q'; // your app secret key

    function saveToken(data) {
        window.localStorage.setItem("TWITTER_KEY", JSON.stringify(data));   
    }

    function readToken() {
        return window.localStorage.getItem("TWITTER_KEY");
    }

    function createTwitterSignature(method, url) {
        var token = angular.fromJson(readToken());
        
        var oauthObject = {
            oauth_consumer_key: consumerID,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };
        var twitterSignature = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, 
        													consumerSecretKey, token.oauth_token_secret);
        													
        $http.defaults.headers.common.Authorization = twitterSignature.authorization_header;
    }

    return {
        
        isLoggedIn: function() {
            return readToken() !== null;
        },
      
        getTwitterFeed: function() {
            var twitterRequestURL = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
            createTwitterSignature('GET', twitterRequestURL);
            return $resource(twitterRequestURL).query();
    
        },
        
        saveToken: saveToken,
        readToken: readToken,
        createTwitterSignature: createTwitterSignature
    };
});