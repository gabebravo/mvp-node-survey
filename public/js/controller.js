var app = ( function () {

  function publicStartApp() {
		render.loginView();
	}

	function publicLoginUser() {
		// make an ajax call on submit
		// based on the login being a succes
		// return the admin boolean and redirect
		var admin = false;
		if (!admin) {
			$('.login').empty();
			render.userPage();
			window.location.hash = 'userpage';
		} else {
			$('.login').empty();
			render.adminPage();
			window.location.hash = 'adminpage';
		}
	}

  function publicRegisterUser() {
		$('.login').empty();
		render.registerView();
	}

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

	return {
	// publicly accessable function names
				startApp: publicStartApp,
				loginRedirect: publicLoginUser,
				registerRedirect: publicRegisterUser,
				registerUser: publicRegisterNewUser
		};

})();
