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
                <input type="text" class="login-email" placeholder="email">
                    <input type="text" class="login-password" placeholder="password">
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
                </span>
            </span>
        </div>
    </div>

			`);
		$('.login').html($loginEl);
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
		var $registerEl = $(`
		<div class = "register-text">
			<div class="register-container">
				<h1>Register Now</h1>
				<span><h3>Enter account information below</h3><span>
					<div class="register-form">
						<input type="text" class="register-firstName" placeholder="First Name">
						<input type="text" class="register-lastName" placeholder="Last Name">
						<input type="text" class="register-email" placeholder="email">
						<input type="text" class="register-password" placeholder="password">
						<button class="register-btn" id="save">Save</button>
					</div>
			 </div>
		</div>
`);
		$('.register').html($registerEl);

		$('#save').on('click', function(e) {
			e.preventDefault();
				app.registerUser();
		});
	},

	dashboardView: function(admin, name, events) {
		admin = true;

		var eventsElement = '';
		eventsElement += '<div class="header"><h1 class="header-item">Welcome back ' + name + '!</h1>';
		if (admin) {
			eventsElement += '<div class="create-survey"><h3 class="header-item">Create Survey</h3></div>';
		}
		eventsElement += '<div class="logout-link"><h3 class="header-item">Log Out</h3></div>';
		eventsElement += '</div>';

			events.forEach( function(value) {
				var voteBtn = app.isSurveyActive(value.expiration);
				eventsElement += '<div class="row" eventId='+ value.id +'>';
				eventsElement += '<div class="col"><h3>' + value.name + '</h3></div>';
				eventsElement += '<div class="col"><p>' + value.description + '</p></div>';
				eventsElement += '<div class="col"><p>';

					value.stats.forEach( function( obj, index, arr) {
						if ( index < arr.length - 1 ) {
							eventsElement += obj.answerItem + ' : ' + obj.count + ' / ';
						} else
							eventsElement += obj.answerItem + ' : ' + obj.count;
					});

				eventsElement += '</p></div>';
				eventsElement += '<div class="col">';
				eventsElement += '<div class="set-btns-vert">';
				eventsElement += '<button class="view-survey">VIEW STATS</button>';
				if (admin) {
						eventsElement += '<button class="delete-survey">DELETE SURVEY</button>';
				} else {
					if (voteBtn) {
						eventsElement += '<button class="sruvey-vote">VOTE NOW</button>';
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
			app.deleteSurvey(e.target);
		});
		$('.view-survey').on('click', function(e) {
			e.preventDefault();
			app.showSurvey(e.target);
		});
		$('.logout-link').on('click', function(e) {
			e.preventDefault();
			app.logout();
		});
	},

	surveyView: function( surveyObj ) {
		var $surveyEl = (`
			<div class = "survey-text">
				<div class="survey-container">
	    		<h1>${surveyObj.name}</h1>
	    		<h1>${surveyObj.description}</h1>
	    <canvas id="surveyChart"></canvas>
	    <div class="survey-btns">
	        <button class="survey-vote">VOTE YES</button>
	        <button class="survey-vote">VOTE NO</button>
	    </div>
				</div></div>
		`);
		$('.survey').html($surveyEl);
		$('.survey-vote').on( 'click', function(e) {
			$('.survey').empty();
			render.loginView();
			window.location.hash = '';
		});

		let chartMap = new Map();

		var surveyData = {};
		surveyObj.stats.forEach( function( obj ) {
			chartMap.set(obj.answerItem, Number(obj.count));
		});

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
	        <label for="name">Name</label>
	        <input type="text" id="sForm-name" placeholder="Enter your first name here">
	      </li>
	      <li>
	        <label for="description">Description</label>
	        <input type="text" id="sForm-description" placeholder="Enter your last name here">
	      </li>
	      <li>
	        <label for="item1">Survey Item 1</label>
	        <input type="text" id="sForm-item1" placeholder="Required">
	      </li>
				<li>
	        <label for="item2">Survey Item 2</label>
	        <input type="text" id="sForm-item2" placeholder="Required">
	      </li>
				<li>
	        <label for="item3">Survey Item 2</label>
	        <input type="text" id="sForm-item3" placeholder="Optional">
	      </li>
				<li>
	        <label for="item4">Survey Item 4</label>
	        <input type="text" id="sForm-item4" placeholder="Optional">
	      </li>
				<li>
	        <label for="item5">Survey Item 5</label>
	        <input type="text" id="sForm-item5" placeholder="Optional">
	      </li>
	      <li>
	        <label for="exp-date">Expiration Date</label>
	        <input type="date" id="sForm-exp" placeholder="Format: dd-mm-yyyy">
	      </li>
	      <li>
	        <button type="submit">Submit</button>
	      </li>
	    </ul>
	  </form>
	</div></div>
`);
		$('.dashboard').html($newSurveyEl);

		// $('#save').on('click', function(e) {
		// 	e.preventDefault();
		// 		app.createSurvey();
		// });
	}

}

{/* <div class="survey-text">
	<div class="new-survey-container">
		<h1>Create New Survey</h1>
		<span><h3>Fill out the fields below</h3><span>
			<div class="survey-form">
				<label>Survey Name: </label>
					<input type="text" class="survey-name" placeholder="Name">
				<label>Survey Description: </label>
					<input type="text" class="survey-description" placeholder="Description">
				<label>Survey Items: </label>
					<input type="text" class="survey-items" placeholder="Items comma seperated">
				<label>Survey Expiration Date: </label>
					<input type="text" class="survey-exp-date" placeholder="Expiration Date">
				<button class="register-btn" id="save">Save</button>
			</div>
	 </div>
</div> */}
