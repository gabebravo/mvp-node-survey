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
			loginElement += '</div></div>';
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

	userPage: function() {
		var userElement = '';
			userElement += '<div class="user-text">';
			userElement += '<div class="user-container">';
			userElement += '<h1>This is the User Page</h1>';
			userElement += '</div></div>';
		$('.userpage').html(userElement);
	},

	adminPage: function() {
		var adminElement = '';
			adminElement += '<div class="admin-text">';
			adminElement += '<div class="admin-container">';
			adminElement += '<h1>This is the Admin Page</h1>';
			adminElement += '</div></div>';
		$('.adminpage').html(adminElement);
	}

}
