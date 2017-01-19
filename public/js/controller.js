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
		var surveyChart = new Chart(ctxObj, {
			type: 'pie',
			data: {
				labels: [data.noName, data.yesName],
				datasets: [{
						data: [data.noVotes, data.yesVotes],
						backgroundColor: [
								"#FF6384",
								"#36A2EB"
						],
						hoverBackgroundColor: [
								"#FF6384",
								"#36A2EB"
						]
				}]
			},
			options: { }
	});
	return surveyChart;
 }

 function publicGetSurvey() {
	//  $.getJSON(SURVEY_URL, function(data) {
	//  	$('.dashboard').empty();
	// 	render.sureyView(data);
	//  	window.location.hash = 'survey';
	//  });
		$('.dashboard').empty();
		render.sureyView(model.surveyData);
		window.location.hash = 'survey';
 }

	return {
	// publicly accessable function names
		// fetchToken: getUserToken,
				startApp: publicStartApp,
				loginRedirect: publicLoginUser,
				registerRedirect: publicRegisterUser,
				registerUser: publicRegisterNewUser,
				buildChart: publicBuildChart,
				showSurvey: publicGetSurvey
		};

})();
