var app = ( function () {

	let TOKEN = '';
	const BASE_USER = "/user";
	const AUTH_URL = "/authenticate";
	const BASE_SURVEY = '/survey';
	// const SURVEY_URL = '/survey';

  function publicStartApp() {
		render.loginView();
	}

	function publicLoginUser( elem ) {
		// let loginObj = {};
		// let inputArr = $(elem).find('input');
		//
		// $.map(inputArr, (elm) => {
		// 	loginObj[$(elm).attr('id')] = $(elm).val();
		// });
		//
		let username = "";
		let userType = "";

		let loginObj = {
			email: "MD123@gmail.com",
			password: "kindofblue"
		};

		$.ajax ({
				url: BASE_USER + AUTH_URL,
				type: "POST",
				data: JSON.stringify(loginObj),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function( data ){
						username = data.name;
						userType = data.admin;
						TOKEN = data.token;
						privateGetEvents(username, userType);
				},
				error: function () {
						console.log("failed");
				}
		});
	}

	function privateGetEvents(user, type) {
		$.ajax ({
				url: BASE_SURVEY,
				type: "GET",
				headers: {"x-access-token": TOKEN},
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function( data ){
					$('.login').empty();
					render.dashboardView(type, user, data);
					window.location.hash = 'dashboard';
				},
				error: function () {
						console.log("failed");
				}
		});
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

	function publicRegisterNewUser( elem ) {
			let reqObj = {};
			let name = "";
			let input = $(elem).find('input');

			for ( field of input ) {
					if($(field).attr('id') == "firstName" || $(field).attr('id') == "lastName"){
						 name += $(field).val() + " ";
					}
					reqObj["name"] = name.trim();
					if($(field).attr('id') == "password" || $(field).attr('id') == "email"){
						 reqObj[$(field).attr('id')] = $(field).val();
					}
			}

			$.ajax ({
			    url: BASE_USER,
			    type: "POST",
			    data: JSON.stringify(reqObj),
			    dataType: "json",
			    contentType: "application/json; charset=utf-8",
			    success: function(){
			        console.log("passed");
							render.loginView();
			    },
					error: function () {
							console.log("failed");
					}
			});
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

 function publicGetSurvey( elem, bool ) {
	 let surveyId = $(elem).closest('.row').attr('eventid');
	 let voteFlag = bool;

	 $.ajax ({
			 url: BASE_SURVEY + "/" + surveyId,
			 type: "GET",
			 headers: {"x-access-token": TOKEN},
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",
			 success: function( data ) {
			 		$('.dashboard').empty();
			 		render.surveyView(data, voteFlag);
					window.location.hash = 'survey';
			 },
			 error: function () {
					 console.log("failed");
			 }
	 });
 }

 function publicLogoutUser() {
		$('.dashboard').empty();
		render.loginView();
		window.location.hash = '';
 }

 function publicCheckSurveyExpiration( surveyExpDate ) {
	 let timeAsMs = Date.parse(surveyExpDate);
	 // for test purposes: console.log(Date.UTC(2017, 07, 14));
	 var todaysDate = new Date();
	 if ( timeAsMs > todaysDate.getTime() ) {
		 return true;
	 } else
	 		return false;
 }

 function publicCheckSurveyHasUsers( surveyUserCount ) {
	 if(surveyUserCount.length > 0)
	 	return false;
	 else
	 	return true;
 }

	publicCheckSurveyHasUsers = ( surveyUserCount ) => {
	 if(surveyUserCount.length > 0)
	 	return true;
	 else
	 	return false;
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
				isSurveyEmpty: publicCheckSurveyHasUsers,
				deleteSurvey: publicRemoveSurvey,
				createSurvey: publicCreateSurvey
		};

})();
