var app = ( function () {

	// const TOKEN;
	// const LOGIN_URL = '/authenticate';
	// const DASHBOARD_URL = '/dashboard';
	// const SURVEY_URL = '/survey';

  function publicStartApp() {
		render.loginView();
	}

	function publicLoginUser() {
		// $.getJSON(LOGIN_URL, function(data) {
		// 	setUserToken(data.userLogin.token);
    // 	privateGetEvents(data);
  	// });
		let userData = model.userLogin;
		privateGetEvents(userData);
	}

	function privateGetEvents(loginObj) {
		let username = loginObj.name;
		let userType = loginObj.admin;
		let eventsData = model.dashboardData;
		// $.getJSON(DASHBOARD_URL, function(data) {
		// 	$('.login').empty();
		// 	render.printDash(loginObj.name, loginObj.admin, data);
		// 	window.location.hash = 'dashboard';
  	// });
		$('.login').empty();
		render.dashboardView(userType, username, eventsData);
		window.location.hash = 'dashboard';
  }

  function publicRegisterUser() {
		$('.login').empty();
		render.registerView();
	}

	// function setUserToken(token) {
	// 	TOKEN = token;
	// }
	// function getUserToken(token) {
	// 	return TOKEN;
	// }

	function publicRegisterNewUser() {
		// make an ajax call on submit
		// based on the register being a succes
		// redirect the user to the login page
		var success = true;
		if (success) { // mongo added user
			$('.register').empty();
			render.loginView();
			window.location.hash = '';
		} else {
			// modal displaying user input error
		}
	}

	function publicBuildChart(ctxObj, data ) {

	  var bgColor = ['rgba(54, 162, 235, 1)',
								'rgba(255,99,132,1)',
	 						 'rgba(255, 206, 86, 1)',
	 						 'rgba(75, 192, 192, 1)',
	 						 'rgba(255, 159, 64, 1)']

	 var hvrColor = ['rgba(54, 162, 235, 0.2)',
	 						 'rgba(255, 99, 132, 0.2)',
	 						 'rgba(255, 206, 86, 0.2)',
	 						 'rgba(75, 192, 192, 0.2)',
	 						 'rgba(255, 159, 64, 0.2)'];

	 var bgColors = [];
	 var hvrColors = [];

	 for(var i = 0; i < data.size; i++) {
		 bgColors.push(bgColor[i]);
		 hvrColors.push(hvrColor[i]);
	 }

		var labels = [];
		var counts = [];

		for (let key of data.keys()) {
        labels.push(key);
    }

		for (let value of data.values()) {
				counts.push(value);
		}

		var surveyChart = new Chart(ctxObj, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
						data: counts,
						backgroundColor: bgColors,
						hoverBackgroundColor: hvrColors
				}]
			},
			options: { }
	});
	return surveyChart;
 }

 function publicGetSurvey( elem ) {
	 var surveyId = $(elem).closest('.row').attr('eventid');

	 model.dashboardData.forEach( function(obj, index ) {
		 if( surveyId === obj.id ) {
			$('.dashboard').empty();
	 		render.surveyView(model.dashboardData[index]);
	 		window.location.hash = 'survey';
		 }
	 });

	//  $.getJSON(SURVEY_URL, function(data) {
	//  	$('.dashboard').empty();
	// 	render.sureyView(data);
	//  	window.location.hash = 'survey';
	//  });
 }

 function publicLogoutUser() {
		$('.dashboard').empty();
		render.loginView();
		window.location.hash = '/';
 }

 function publicCheckSurveyExpiration( surveyExpDate ) {
	 // for test purposes: console.log(Date.UTC(2017, 07, 14));
	 var todaysDate = new Date();
	 if ( surveyExpDate > todaysDate.getTime() ) {
		 return true;
	 } else return false;
 }

 function publicCreateSurvey() {

 }

 function publicRemoveSurvey( elem ) {
	var surveyId = $(elem).closest('.row').attr('eventid');
	// $.delete(DELETE_URL, function(data) {
	 		// call mongo and remove by ID
			elem.closest('.row').remove();
	// });
 }

	return {
	// publicly accessable function names
		// fetchToken: getUserToken,
				startApp: publicStartApp,
				loginRedirect: publicLoginUser,
				registerRedirect: publicRegisterUser,
				registerUser: publicRegisterNewUser,
				buildChart: publicBuildChart,
				showSurvey: publicGetSurvey,
				logout:	publicLogoutUser,
				isSurveyActive: publicCheckSurveyExpiration,
				deleteSurvey: publicRemoveSurvey,
				createSurvey: publicCreateSurvey
		};

})();
