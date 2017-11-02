app.factory('user', function($http){
	var user = {};
	user.investments = [];
	user.founded_companies =[];
	user.profile = [];
	// user.getUser = function(){}
	// user.saveUser = function(user){{
	// 	// save user using nodejs
	// }}
	// user.userExists = function(user){}

	return user;
})