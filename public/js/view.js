var render = {

  // THIS FUNCTION IS FOR RENDERING THE HOMEPAGE
	loginView: function() {

		var loginElement = '';
			loginElement += '<div class="login-text">';
		  loginElement += '<div class="login-container">';
			loginElement += '<h1>Survey App</h1>';
			loginElement += '<span><h3>Login to view and take surveys</h3><span>';
			loginElement += '<div class="login-form">';
			loginElement += '<input type="text" class="login-email" placeholder="email">';
			loginElement += '<input type="text" class="login-password" placeholder="password">';
			loginElement += '<button class="login-btn" id="login">Login</button>';
			loginElement += '</div>';
			loginElement += '<div class="login-links">';
			loginElement += '<p class="register-link"><span>Register Now</span></p>';
			loginElement += '<p class="password-link"><span>Forgot Password</span></p>';
			loginElement += '</div></div></div>';
		$('.login').html(loginElement);

		// register btn click
		$('.register-link').on('click', function(e) {
			  app.registerRedirect();
		});
		// FORGOT PASS BTN CLICK WILL BE INCORPORATED LATER
		// g.c.b. 01/17/17

		$('#login').on('click', function(e) {
			e.preventDefault();
			  app.loginRedirect();
		});
	},

	registerView: function() {
		var registerElement = '';
			registerElement += '<div class="register-text">';
		  registerElement += '<div class="register-container">';
			registerElement += '<h1>Register Now</h1>';
			registerElement += '<span><h3>Enter your login credentials below</h3><span>';
			registerElement += '<div class="register-form">';
			registerElement += '<input type="text" class="register-email" placeholder="email">';
			registerElement += '<input type="text" class="register-password" placeholder="password">';
			registerElement += '<button class="register-btn" id="save">Save</button>';
			registerElement += '</div></div>';
		$('.register').html(registerElement);

		$('#save').on('click', function(e) {
			e.preventDefault();
			  app.registerUser();
		});
	},

	dashboardView: function(user, name, events) {
		var eventsElement = '';
		eventsElement += '<h3>Welcome back ' + name + '!</h3>';
		if (user) {
			events.forEach( function(value) {
				eventsElement += '<div class="row" eventId='+ value.id +'>';
				eventsElement += '<div class="col"><h3>' + value.name + '</h3></div>';
				eventsElement += '<div class="col"><p>' + value.description + '</p></div>';
				eventsElement += '<div class="col"><p>Vote Count: '+ value.count.yes +' in favor / ';
				eventsElement += value.count.no + ' opposed</p></div>';
				eventsElement += '<div class="col">';
				eventsElement += '<div class="set-btns-vert">';
				eventsElement += '<button class="view-survey">VIEW STATS</button>';
				eventsElement += '<button class="sruvey-vote">VOTE NOW</button>';
				eventsElement += '</div></div></div>';
    	});
		} else {
			events.forEach( function(value) {
				eventsElement += '<div class="row" eventId='+ value.id +'>';
				eventsElement += '<div class="col"><h3>' + value.name + '</h3></div>';
				eventsElement += '<div class="col"><p>' + value.description + '</p></div>';
				eventsElement += '<div class="col"><p>Vote Count: '+ value.count.yes +' in favor / ';
				eventsElement += value.count.no + ' opposed</p></div>';
				eventsElement += '<div class="col">';
				eventsElement += '<div class="set-btns-vert">';
				eventsElement += '<button class="view-survey">VIEW STATS</button>';
				eventsElement += '<button class="sruvey-vote">VOTE NOW</button>';
				eventsElement += '</div></div></div>';
    	});
		}
		$('.dashboard').html(eventsElement);

		$('.view-survey').on('click', function(e) {
			e.preventDefault();
			app.showSurvey();
		});
	},

	sureyView: function( surveyObj ) {
		var surveyElement = '';
			surveyElement += '<div class="user-text">';
			surveyElement += '<div class="user-container">';
			surveyElement += '<h1>' + surveyObj.name + '</h1>';
			surveyElement += '<h1>' + surveyObj.description + '</h1>';
			surveyElement += '<canvas id="surveyChart"></canvas>';
			surveyElement += '<div class="survey-btns">';
			if (true) {
				surveyElement += '<button class="view-survey">VOTE YES</button>';
				surveyElement += '<button class="sruvey-vote">VOTE NO</button>';
		  } else {
				surveyElement += '<button class="return-dash">RETURN TO DASHBOARD</button>';
			}
			surveyElement += '</div></div></div>';
		$('.survey').html(surveyElement);
		var ctx = $("#surveyChart");
		app.buildChart(ctx, {
			noName: "Yes",
			noVotes: Number(surveyObj.count.yes),
			yesName: "No",
			yesVotes: Number(surveyObj.count.no)
		});
	}

}
