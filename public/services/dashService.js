app.factory('dash', ['$state', '$http',function($http,$state){
	
	var dashData = {};

	dashData.addUpcomingSession = function(id){
		dashData.sessions.push(dashData.upcoming[id]);
		console.log(dashData.sessions);
	}

	dashData.user = {};
	

	dashData.sessions = [
		{
			id: 1,
			data: 
			{
				date: 'Tuesday 8/30/17',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		},	
		{
			id: 2,
			data: 
			{
				date: 'Tuesday 8/30/17',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		},	
		{
			id: 3,
			data: 
			{
				date: 'Tuesday 8/30/17',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		},	
		{
			id: 4,
			data: 
			{
				date: 'Tuesday 8/30/17',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		}
		
		
	];



    dashData.upcoming = [
    	{
    		id:1, 
    		data : {
    			date: 'Today',
				time: '11:00 - 12:00 EST',
				title: 'Random Company',
				timeToStart:'5:00',
				link:'https://livestream-srv.herokuapp.com/demos/Video-Broadcasting.html#srv',
				message:'click to join',
				disabled:false
    		}
    	}
    	,{
    		id:2, 
    		data : {
    			date: 'TBD',
				time: 'TBD',
				title: 'TBD',
				timeToStart:'TBD',
				link: null,
				message:'cant join this one yet',
				disabled:true
    		}
    	},{
    		id:3, 
    		data : {
    			date: 'TBD',
				time: 'TBD',
				title: 'TBD',
				timeToStart:'TBD',
				link: null,
				message:'cant join this one either',
				disabled:true
    		}
    	},{
    		id:4, 
    		data : {
    			date: 'TBD',
				time: 'TBD',
				title: 'TBD',
				timeToStart:'TBD',
				link: null,
				message:'or this one!',
				disabled:true
    		}
    	}
    
    ]

    return dashData;
}])