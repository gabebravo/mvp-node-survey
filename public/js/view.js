var render = {

  // THIS FUNCTION IS FOR RENDERING THE HOMEPAGE
	loginView: function() {
		var $loginEl = (`

		<div class = "login-text" > <div class="login-container">
    <h1>Survey App</h1>
    <span>
        <h3>Login to view and take surveys</h3>
        <span>
            <div class="login-form">
                <input type="text" id="email" placeholder="email">
                <input type="text" id="password" placeholder="password">
                <button class="login-btn" id="login">Login</button>
            </div>
            <div class="login-links">
                <p class="register-link">
                    <span>Register Now</span>
                </p>
                <p class="password-link">
                    <span>Forgot Password</span>
                </p>
            </div>
        </span></span>
      </div></div>

			`);
		$('.login').html($loginEl);
		$('.register-link').on('click', function(e) {
			  app.registerRedirect();
		});
		// FORGOT PASS BTN CLICK WILL BE INCORPORATED LATER
		// g.c.b. 01/17/17

		$('#login').on('click', function(e) {
			e.preventDefault();
			let elm = $(e.target).closest('div');
			  app.loginRedirect(elm);
		});
	},

	registerView: function() {
		var $registerEl = $(`
		<div class = "register-text">
			<div class="register-container">
				<h1>Register Now</h1>
				<span><h3>Enter account information below</h3><span>
					<div class="register-form">
						<input type="text" id="firstName" placeholder="First Name">
						<input type="text" id="lastName" placeholder="Last Name">
						<input type="text" id="email" placeholder="email">
						<input type="text" id="password" placeholder="password">
						<button class="register-btn" id="save">Save</button>
					</div>
			 </div>
		</div>
`);
		$('.register').html($registerEl);

		$('#save').on('click', function(e) {
			e.preventDefault();
			let elm = e.target.closest('div');
				app.registerUser(elm);
		});
	},

	dashboardView: function(admin, name, events) {
		var eventsElement = '';
		eventsElement += '<div class="header"><h1 class="header-item">' + name + '</h1>';
		if (admin) {
			eventsElement += '<div class="create-survey"><h3 class="header-item">Create Survey</h3></div>';
		}
		eventsElement += '<div class="logout-link"><h3 class="header-item">Log Out</h3></div>';
		eventsElement += '</div>';

			events.forEach( function(value) {
				var active = app.isSurveyActive(value.expiration);
				var areUsers = app.isSurveyEmpty(value.users);
				eventsElement += '<div class="row" eventId='+ value['_id'] +'>';
				eventsElement += '<div class="col"><h3>' + value.name + '</h3></div>';
				eventsElement += '<div class="col"><p>' + value.description + '</p></div>';
				eventsElement += '<div class="col"><p>';

					for ( key in value.stats ) {
						eventsElement += key + ' : ' + value.stats[key] + " ";
					}

				eventsElement += '</p></div>';
				eventsElement += '<div class="col">';
				eventsElement += '<div class="set-btns-vert">';
				eventsElement += '<button class="view-survey">VIEW STATS</button>';
				if (admin) {
						if(!areUsers) {
							eventsElement += '<button class="delete-survey">DELETE SURVEY</button>';
						}
				} else {
					if (active && app.userHasntVoted(value.users)) {
						eventsElement += '<button class="survey-vote">VOTE NOW</button>';
					}
				}
				eventsElement += '</div></div></div>';
    	});
		$('.dashboard').html(eventsElement);

// event listners
		$('.create-survey').on('click', function(e) {
			e.preventDefault();
			$('.survey').empty();
			render.newSurveyView();
		});
		$('.delete-survey').on('click', function(e) {
			e.preventDefault();
			let elm = e.target.closest('.row');
			app.deleteSurvey(elm);
		});
		$('.view-survey').on('click', function(e) {
			e.preventDefault();
			let elm = e.target.closest('.row');
		  app.showSurvey(elm, false);
		});
		$('.survey-vote').on('click', function(e) {
			e.preventDefault();
			let elm = e.target.closest('.row');
		  app.showSurvey(elm, true);
		});
		$('.logout-link').on('click', function(e) {
			e.preventDefault();
			app.logout();
		});
	},

	surveyView: function( surveyObj, canVote ) {
		var surveyEl = '';
		if (canVote) {
			surveyEl +='<div class = "survey-text">';
			surveyEl +=	'<div class="survey-container" survey-id='+ surveyObj["_id"] +'>';
		  surveyEl +=	'<h1>' + surveyObj.name + '</h1>';
		  surveyEl +=	'<h1>' + surveyObj.description + '</h1>';
		  surveyEl +=	'<canvas id="surveyChart"></canvas>';
			surveyEl +=	'<div class="survey-btns">';
				for ( key in surveyObj.stats ) {
					surveyEl +=	'<button class="survey-vote" survey-btn="' + key + '">' + key +'</button>';
				}
	    surveyEl += '</div></div></div>';
		} else {
			surveyEl += '<div class="survey-text">';
			surveyEl +=	'<div class="survey-container">';
			surveyEl +=	'<h1>' + surveyObj.name + '</h1>';
			surveyEl +=	'<h1>' + surveyObj.description + '</h1>';
			surveyEl +=	'<canvas id="surveyChart"></canvas>';
		  surveyEl +=	'<div class="dash-btn">';
		  surveyEl +=	'<button class="return-dash">RETURN HOME</button>';
		  surveyEl +=	'</div></div></div>';
		}
		$('.survey').html(surveyEl);

		$('.return-dash').on( 'click', function(e) {
			e.preventDefault();
			$('.survey').empty();
			app.loginRedirect(true);
			window.location.hash = '';
		});
		$('.survey-vote').on( 'click', function(e) {
			e.preventDefault();
			let survId = $(e.target).closest(".survey-container").attr("survey-id");
			let survBtn = $(e.target).attr("survey-btn");
			$('.survey').empty();
			app.castVote(survId, survBtn);
			app.incVote(survId, survBtn);
			window.location.hash = '';
		});

		let chartMap = new Map();

		for ( key in surveyObj.stats ) {
			chartMap.set( key, Number(surveyObj.stats[key]) );
		}

		var ctx = $("#surveyChart");
		app.buildChart(ctx, chartMap);
	},

	newSurveyView: function( surveyObj ) {
		var $newSurveyEl = $(`
		<div class = "survey-text">
		<div class="new-survey-container">
	  <form>
	    <ul class="flex-outer">
	      <li>
	        <label for="name">Survey Name</label>
	        <input type="text" id="name" placeholder="Enter the survey name">
	      </li>
	      <li>
	        <label for="description">Description</label>
	        <input type="text" id="description" placeholder="Enter a short survey question">
	      </li>
	      <li>
	        <label for="item1">Survey Item 1</label>
	        <input type="text" id="item" placeholder="Required">
	      </li>
				<li>
	        <label for="item2">Survey Item 2</label>
	        <input type="text" id="item" placeholder="Required">
	      </li>
				<li>
	        <label for="item3">Survey Item 2</label>
	        <input type="text" id="item" placeholder="Optional">
	      </li>
				<li>
	        <label for="item4">Survey Item 4</label>
	        <input type="text" id="item" placeholder="Optional">
	      </li>
				<li>
	        <label for="item5">Survey Item 5</label>
	        <input type="text" id="item" placeholder="Optional">
	      </li>
	      <li>
	        <label for="exp-date">Expiration Date</label>
	        <input type="date" id="expiration" placeholder="Format: dd-mm-yyyy">
	      </li>
	      <li>
			    <div class="srvyfrm-return-btn"><button type="submit">Return Home</button></div>
	        <button id="submit" type="submit">Submit</button>
	      </li>
	    </ul>
	  </form>
	</div></div>
`);
		$('.dashboard').html($newSurveyEl);

		$('.srvyfrm-return-btn').on( 'click', function(e) {
			e.preventDefault();
			$('.survey').empty();
			app.loginRedirect();
			window.location.hash = '';
		});
		$('#submit').on('click', function(e) {
			e.preventDefault();
			let elm = $(e.target).closest('ul');
			$('.survey').empty();
			app.createSurvey(elm);
			window.location.hash = '';
		});
	}

}
