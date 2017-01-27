var app = ( function () {

	let TOKEN;
	let USER_ID;
	let USER_TYPE;
	let USER_NAME;

	const BASE_USER = "/user";
	const AUTH_URL = "/authenticate";
	const BASE_SURVEY = '/survey';
	// const SURVEY_URL = '/survey';

  function publicStartApp() {
		render.loginView();
	}

	function publicLoginUser( elem ) {
		let flag = typeof elem;

		if ( flag === "boolean" ){

			privateGetEvents(USER_NAME, USER_TYPE);

		} else {

			let loginObj = {};
			let inputArr = $(elem).find('input');

			$.map(inputArr, (elm) => {
				loginObj[$(elm).attr('id')] = $(elm).val();
			});

			$.ajax ({
					url: BASE_USER + AUTH_URL,
					type: "POST",
					data: JSON.stringify(loginObj),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function( data ){
							USER_NAME = data.name;
							USER_TYPE = data.admin;
							USER_ID = data.email;
							TOKEN = data.token;
							privateGetEvents(USER_NAME, USER_TYPE);
					},
					error: function () {
							console.log("failed");
					}
			});

		}
	}

	function privateGetEvents(user, type) {
		console.log("this gets called");
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
							$('.register').empty();
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

 function publicCheckSurveyHasUsers( surveyUsers ) {
	 let usrArr = surveyUsers;
	 let areUsers = false;
	 if(usrArr.length > 0) {
		 areUsers = true;
	 }
	 return areUsers;
 }

 function publicCheckIfUserVoted( usrs ) {
	 let noMatch = true;
	 usrs.forEach( function( obj ) {
		 if ( obj.id === USER_ID ) {
				 noMatch = false;
		 }
	 });
	 return noMatch;
 }

 function publicUserVoteCheck( surveyId, voteOption ) {
  let survId = surveyId;
  let survOpt = voteOption;
  let reqUsr = { "id": USER_ID }
  // let reqOpt = { "topic": survOpt }

  $.ajax ({
 			url: BASE_SURVEY + "/vote/" + survId,
 			type: "POST",
 		data: JSON.stringify(reqUsr),
 			headers: {"x-access-token": TOKEN},
 			dataType: "json",
 			contentType: "application/json; charset=utf-8",
 			success: function( data ) {
 			console.log('user sucessfully added');
 		// 	$('.survey').empty();
 		// 	privateGetEvents(USER_NAME, USER_TYPE);
 		// 	window.location.hash = 'dashboard';
 				// privateAddVote(survId, reqOpt);
 			},
 			error: function () {
 					console.log("failed");
 			}
 		});
 }

 function publicIncrementVote( surveyId, voteOption ) {
	 let survId = surveyId;
	 let survOpt = voteOption;
	//  let reqUsr = { "id": USER_ID }
	 let reqOpt = { "topic": survOpt }

	  $.ajax ({
	 		 url: BASE_SURVEY + "/increment/" + surveyId,
	 		 type: "POST",
	 		 data: JSON.stringify(reqOpt),
	 		 headers: {"x-access-token": TOKEN},
	 		 dataType: "json",
	 		 contentType: "application/json; charset=utf-8",
	 		 success: function( data ){
				 $('.survey').empty();
 				privateGetEvents(USER_NAME, USER_TYPE);
 				window.location.hash = 'dashboard';
	 		 },
	 		 error: function () {
	 				 console.log("failed");
	 		 }
	  });
 }

 function publicCreateSurvey( elem ) {
	 let liArr = $(elem).children();
	 let stats = {};
	 let surveyObj = {};

	 $.map(liArr, (elm, index) => {
		 if(index < liArr.length - 1) {
			 if( $(elm).find('input').attr('id') === 'item' ) {
				 let iputValue = $(elm).find('input').val().slice('').length;
				 if (iputValue > 0) {
				 		stats[$(elm).find('input').val()] = 0;
				 }
				 surveyObj["stats"] = stats;
			 } else if ( $(elm).find('input').attr('id') === 'expiration' ) {
			   let expValArr = $(elm).find('input').val().split('-');
				 let expDate = Date.UTC(expValArr[0], (expValArr[1] - 1), (parseInt(expValArr[2]) + 1));
				 surveyObj[$(elm).find('input').attr('id')] = expDate;
		   } else {
				 surveyObj[$(elm).find('input').attr('id')] = $(elm).find('input').val();
			 }
		 }
 	 });

	 let path = '/create';
	 privateAddSurvey(path, surveyObj);
 }

 function privateAddSurvey(path, surv) {
	 $.ajax ({
			 url: BASE_SURVEY + path,
			 type: "POST",
			 data: JSON.stringify(surv),
			 headers: {"x-access-token": TOKEN},
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",
			 success: function( data ){
				 $('.survey').empty();
				 privateGetEvents(USER_NAME, USER_TYPE);
				 window.location.hash = 'dashboard';
			 },
			 error: function () {
					 console.log("failed");
			 }
	 });
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
				userHasntVoted: publicCheckIfUserVoted,
				registerRedirect: publicRegisterUser,
				registerUser: publicRegisterNewUser,
				buildChart: publicBuildChart,
				showSurvey: publicGetSurvey,
				logout:	publicLogoutUser,
				isSurveyActive: publicCheckSurveyExpiration,
				isSurveyEmpty: publicCheckSurveyHasUsers,
				castVote: publicUserVoteCheck,
				incVote: publicIncrementVote,
				deleteSurvey: publicRemoveSurvey,
				createSurvey: publicCreateSurvey
		};

})();
