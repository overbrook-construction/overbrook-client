var constants = require(__dirname + '/../../constants');

module.exports = function() {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var token;
    var url = constants.baseUrl;
    var auth = {

      // SERVICE FOR GETTING TOKENS WHEN USING ADMIN FUNCTIONALITY
      getToken() {
        return token || $window.localStorage.token;
      }
    }
    return auth;
  }])
}
