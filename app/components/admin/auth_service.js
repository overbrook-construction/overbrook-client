var constants = require(__dirname + '/../../constants');

module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var token;
    var url = constants.baseUrl;
    var auth = {
      createUser(user, cb) {
        cb || function() {};
        console.log('USER COMING IN : ', user);
        $http.post(url + '/addUser', user)
          .then((res) => {
            token = $window.localStorage.token = res.data.token;
            cb(null, res)
          }, (err) => {
            cb(err)
          })
      },
      getToken() {
        return token || $window.localStorage.token;
      },
    signOut(cb) {
      // cb = cb || function() {}
      token = null;
      $window.localStorage.token = null;
      cb && cb();
    },
    signIn(user, cb) {
      console.log('AUTH SERVICE : SIGN IN HIT WITH : ', user);
      cb = cb || function() {};
      $http.get(url + '/signin', {
        headers: {
          authorization: 'Basic ' + btoa(user.username + ':' + user.password)
        }})
      .then((res) => {
        // cb = cb || function() {};
        token = $window.localStorage.token = res.data.token;
        console.log('AUTH SERVICE : TOKEN GEN : ', token);
        cb(null, res);
      }, (err) => {
        cb(err);
      })
    }
  }
    return auth;
  }])
}
