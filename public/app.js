
var app = angular.module('app', ["ngMaterial","ngMdIcons","ui.router", "socialLogin",'angular-loading-bar','ngTable']);

// routing
app.config(

	function($stateProvider, $urlRouterProvider,socialProvider) {
		
		socialProvider.setLinkedInKey("77rfytzqxr2hp2");
		// console.log(app);
		// 	states
		$stateProvider
			.state('login', {
				url:'/login',
				controller: 'LoginC',
				templateUrl: 'templates/Login.html'
				
			})
			.state('dash', { 
				url: '/dash',
				controller: 'DashC',
				templateUrl: 'templates/Dashboard.html',
			})
			
			.state('dash.sessions',{
				url:'/dash',
				controller:'SessionController',
				templateUrl: 'templates/session.html'
			})
			.state('portfolio',{
				url:'/dash',
				controller:'PortController',
				templateUrl: 'templates/portfolio.html'
			})	
			.state('profile',{
				url:'/profile',
				controller:'ProfileC',
				templateUrl: 'templates/profile.html'
			})
			// .state('dash.search',{
			// 	url:'/dash',
			// 	controller:'SearchController',
			// 	templateUrl: 'templates/search.html'
			// })			
			.state('waitingroom',{
				url:'/dash/waitingroom',
				controller:'DashC',
				templateUrl: 'templates/waitingroom.html'
			})
			// .state('dash.compare')

			.state('admin',{
				url:'/admin',
				controller:'AdminC',
				templateUrl: 'templates/admin.html'
			})

		$urlRouterProvider.otherwise('dash');

	}
)

// dash controller
app.controller('DashC',function($scope,dash, $stateParams,$state,$http,crunch,user,NgTableParams,$location){

	console.log(user);

	$scope.sessions = dash.upcoming;
	// 	console.log($scope.user.uid);

	///MENU//////
    $scope.menu = [
        {
            link: '/dash',
            title: 'Sessions/Protfolio',
            icon: 'home',
            ui: 'dash'
        }
        // {
        //     link: '/contacts',
        //     title: 'Connections',
        //     icon: 'group',
        //     ui: 'contacts'
        // },
        // {
        //   link : '/messages',
        //   title: 'Messages',
        //   icon: 'message',
        //   ui: 'messages'
        // },
        // {
        //     link: '/lamp',
        //     title: 'Stuff',
        //     icon: 'lightbulb_outline',
        //     ui: 'stuff'
        // }
    ]
    // $scope.investments = [];
    // $scope.founded_companies = [];
     $scope.tableParams = new NgTableParams({
      // initial sort order
      sorting: { name: "asc" } 
    });

     $scope.join = function(){
     	console.log("ccdjljff");
     	// $location.url('https://livestream-srv.herokuapp.com/demos/Video-Broadcasting.html#srv','blank');
     }

    $scope.getData = function(name){
    	var first = name.split(' ').slice(0, -1).join(' ');
    	var last = name.split(' ').slice(-1).join(' ');
    	crunch.getInfo(first,last)
    		.then(function(res){
    			console.log(res.data);
    			    var founded_companies = res.data.data.relationships.founded_companies.items;
          console.log(founded_companies);

          for (var x = 0; x < founded_companies.length; x++) {
            founded_companies[x].name = founded_companies[x].properties.name;
            founded_companies[x].founded_on = founded_companies[x].properties.founded_on;
            founded_companies[x].num_employees_max = founded_companies[x].properties.num_employees_max;
            founded_companies[x].num_employees_min = founded_companies[x].properties.num_employees_min;
          }

          $scope.founded_companies = founded_companies;
          $scope.tableParams = new NgTableParams( {data: founded_companies});
          var investments = res.data.data.relationships.investments.items;
          console.log(investments);


          for (var i = 0; i < investments.length; i++) {
            investments[i].raised = investments[i].relationships.funding_round.properties.money_raised;
    		investments[i].minEmployees = investments[i].relationships.invested_in.properties.num_employees_min;
    		investments[i].maxEmployees = investments[i].relationships.invested_in.properties.num_employees_max;
    		investments[i].name = investments[i].relationships.invested_in.properties.name;
    		investments[i].description = investments[i].relationships.invested_in.properties.short_description;
          }

          $scope.investments = investments;
    	})
    }

    crunch.getInfo('mark' , 'cuban')
    .then(function(response){
    	var investments = response.data.data.relationships.investments.items;
    	for(var i = 0; i < investments.length; i++ ){
    		         investments[i].raised = investments[i].relationships.funding_round.properties.money_raised;
    		investments[i].minEmployees = investments[i].relationships.invested_in.properties.num_employees_min;
    		investments[i].maxEmployees = investments[i].relationships.invested_in.properties.num_employees_max;
    		investments[i].name = investments[i].relationships.invested_in.properties.name;
    		investments[i].description = investments[i].relationships.invested_in.properties.short_description;
    		
    	}
    	// console.log(investments);
    	$scope.investments = investments;

    	var founded_companies = response.data.data.relationships.founded_companies.items;
    	console.log(founded_companies);
    	$scope.founded_companies = founded_companies;
		// $scope.founded_companies = response.data.data.relationships.founded_companies.items;
		// console.log(response.data.data.relationships.founded_companies.items);
    })

	$scope.admin =  function(){
		$state.go('admin');
	}		
});

// // Admin controller
// app.controller('AdminC', function(dash, $scope,$state){
// 	this.myDate = new Date();
// });

// profile Controller
app.controller('ProfileC', function(dash,$scope, $stateParams, $state){
	console.log(dash.user);
	// if(!dash.user.uid){
	// 	$state.go('login');
	// }
	$scope.user = dash.user;});
// Login controller
// 'hi' yitz
// 3 login state controls: login, logout, go to dashboard state. login page js invokes action from the function factory. the function factory takes care of 
// whatever its asked. 
app.controller('LoginC', function($scope, $mdDialog, $state, crunch, socialLoginService,user){

	// var ref = firebase.database().ref().child("users");	
	// var obj = $firebase.Object(ref);
    var user = {};
    $scope.error = false;



    // login
    $scope.$on('event:social-sign-in-success', (event, userDetails)=> {

		console.log(userDetails);
		// lower case 'name'
		userDetails.name = userDetails.name.toLowerCase();
		// split it for crunchabse api call
		user.first = userDetails.name.split(' ').slice(0, -1).join(' ');
		user.last = userDetails.name.split(' ').slice(-1).join(' ');
		console.log(user);

		// api call
		// crunch.getInfo(user.first,user.last)
		crunch.getInfo(user.first , user.last)
			.then(function(response){
				console.log("STATUS:  "+response.status);
				// user.user = data.data;
				console.log(response.data.data);
				user.profile = response.data.data.properties;
				user.investments = response.data.data.relationships.investments.items;
				user.founded_companies = response.data.data.relationships.founded_companies.items;
				console.log(user);
				$state.go('dash');
	
			})
			,function(error){
				console.log("STATUS:  "+status);
				$scope.error = true;

			}
	});

    // function showDialog() {
    //    var parentEl = angular.element(document.body);
    //    $mdDialog.show({
    //      parent: parentEl,
    //      template:
    //          '<md-dialog ng-cloak flex="50" >' +
    //             '<form>' +
                
				// 	'<md-dialog-actions  layout="column" >' +                    
    //                 '' + 
    //                 '<!--  <ng-md-icon  icon="linkedin" style="fill: #0275d8"> --></ng-md-icon> ' + 
    //                 'Login w/LinkedIn</md-button>' +
    //               '</md-dialog-actions>' +
    //               '<md-dialog-actions layout="column" >' +
          
    //                 '<md-button ng-click="cancel()" style="height: 100px; line-height: 100px;">Cancel</md-button>' +
    //               '</md-dialog-actions>' +
    //             '</form>' +
    //           '</md-dialog>',
    //      controller: DialogController
    //   });
    //   function DialogController(dash,$scope, $mdDialog, socialLoginService, $state) {

    //     $scope.cancel = function() {
    //       $mdDialog.hide();
    //     }
    //     //retrieve user linkedin
		
    //   }
    // }
 

    
});
 app.controller('table', function($scope, $http,  $filter, $q, NgTableParams)  {
    $scope.investment = [];
    $scope.jobs = [];
    $scope.affiliation = [];
    var data;

     $scope.names = [{id: "", title: ""}, {id: 'Moroni', title: 'Moroni'}, {id: 'Enos', title: 'Enos'}, {id: 'Nephi', title: 'Nephi'}];
     $scope.tableParams = new NgTableParams({page: 1, count: 2}, {data: data});

    $scope.getData = function() {   //scope is the binding part between the HTML (view) and the JavaScript (controller).
      // $http.get means go to that link and take the data
      $http.get('https://api.crunchbase.com/v3.1/people/ashton-kutcher?user_key=2a3d08f3d5d44364196be2c6255e8187')
        .then(function(res){
          console.log(res.data.data);
          // console.log("investments: " + res.data.data.relationships.investments.items);
          // console.log("jobs: " + res.data.data.relationships.jobs.items);
          // console.log("founded companies: " + res.data.data.relationships.founded_companies.items);

          var founded_companies = res.data.data.relationships.founded_companies.items;
          console.log(founded_companies);

          for (var x = 0; x < founded_companies.length; x++) {
            founded_companies[x].name = founded_companies[x].properties.name;
            founded_companies[x].founded_on = founded_companies[x].properties.founded_on;
            founded_companies[x].num_employees_max = founded_companies[x].properties.num_employees_max;
            founded_companies[x].num_employees_min = founded_companies[x].properties.num_employees_min;
          }
//
          $scope.founded_companies = founded_companies;
          $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: founded_companies});
          var investments = res.data.data.relationships.investments.items;
          console.log(investments);


          for (var x = 0; x < investments.length; x++) {
            investments[x].name = investments[x].relationships.funding_round.relationships.funded_organization.properties.name;
            investments[x].announced_on = investments[x].properties.announced_on;
            investments[x].founded_on = investments[x].relationships.funding_round.relationships.funded_organization.properties.founded_on;
            investments[x].num_employees_max = investments[x].relationships.funding_round.relationships.funded_organization.properties.num_employees_max;
            investments[x].num_employees_min = investments[x].relationships.funding_round.relationships.funded_organization.properties.num_employees_min;
          }
//
          $scope.investments = investments;

          var jobs = res.data.data.relationships.jobs.items;
          console.log(jobs);
          for (var x = 0; x < jobs.length; x++) {
            jobs[x].name = jobs[x].relationships.organization.properties.name;
            jobs[x].title = jobs[x].properties.title;
            jobs[x].started_on = jobs[x].properties.started_on;
            jobs[x].num_employees_max = jobs[x].relationships.organization.properties.num_employees_max;
            jobs[x].num_employees_min = jobs[x].relationships.organization.properties.num_employees_min;
          }
//
          $scope.jobs = jobs;
          // $scope.founded_companies = founded_companies;
          // $scope.jobs = jobs;
          //
          // if(investments.lenght < pages){
          //   http.get
          // }

        })
      }
  })

// waiting room controller
app.controller('waitingroomCtrl', ['$scope', 'dash',function($scope,dash){
	// $scope.sessions = dash.sessions;
	// $scope.user = dash.user;
	// // console.log($stateParams.id);
	// // console.log($scope.id)
	$scope.upcoming = dash.upcoming;
	console.log(dash);
	$scope.addSession = function(sessionId){
		dash.addUpcomingSession(sessionId);
	}}]);
