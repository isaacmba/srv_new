app.factory('crunch',function($http){
	
	var details = [];
	var investments = [];


	return {
		getInfo : function(first,last){
			return $http.get('https://api.crunchbase.com/v3.1/people/'+first+'-'+last+'?user_key=2a3d08f3d5d44364196be2c6255e8187')
				.then(function(response){
					// console.log(response);
					return response;
				})

		},

		getInvestments : function(first,last){
			return $http.get('https://api.crunchbase.com/v3.1/people/'+first+'-'+last+'/investments?user_key=2a3d08f3d5d44364196be2c6255e8187')
				.then(function(res){
					// console.log(res);
					return res;
				})
		},
		getFounded_Companies : function(first,last){
			return $http.get('https://api.crunchbase.com/v3.1/people/'+first+'-'+last+'/founded_companies?user_key=2a3d08f3d5d44364196be2c6255e8187')
				.then(function(res){
					// console.log(res);
					// save user as curret user in 'db' var
					return res;
				})
		} ,   
		saveUser: function(name){ 
			return $http.get('/data', name)
				.then(function(req,res){
					return res
				},function(err){})
		}        
	}

});
