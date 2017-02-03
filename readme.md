#Custom Survey App
A fullstack Javascript app for getting user-submitted feedback on surveys.

Initial Register & Login screens
![Screenshots](http://gabrielbravo.net/img/login-register.png)

Admin Survey form, User dashboard & Survey data screens
![Screenshots](http://gabrielbravo.net/img/survey-dash-chart.png)

##Introduction
The Survey app allows users to create a username and password for a secure account that is encrypted with bcrypt. The user can then login and view survey data from past surveys, or vote on any new surveys. The UI handles accessibility to new surveys and prevents users from voting more than once. All inner app server requests are protected requiring a temporary Json Web Token.

Admin users can securely login and create new surveys for users to then vote on. Each survey has an expiration date that is checked when allowing users to vote on it. Once fields are validated, the new survey is saved to the the MongoDB and published to the app. If the admin creates a survey with an error, they can delete it right away before anyone votes on it.

##Use Case
The survey app has both admin and user profiles. The admin would ideally be an organization trying to gather data directly from users based on surveys. The user could be affiliated with the organization that participates in giving feedback.

##UX
The app will scale fully across mobile, tablet and desktop using the same layout design. 
Invalid zipcodes prompt a CSS gradient overlay that the user can interact with to enter the correct zip.

##Live Site
You can access the Survey App via Heroku where it is hosted: 
https://morning-inlet-39864.herokuapp.com/

##Technical
* The front-end is built using HTML5, CSS3 Flexbox and jQuery and Javascript.
* The back-end is built using Node.js, MongoDB and Mongoose and Express.
* The app is fully responsive, adapting for mobile, table and desktop viewports.
* All routing is through the Epress router and handled within the application.
* Form validation and error handling is handled throughout the app on forms or with server responses.
* Ajax is used to make request and handle server responses.
* The Javascript module design pattern known as the Revealing pattern is used to encapsulate data, and as client-side api for browser updating and rendering.

##NPM Modules Used
* bcrypt
* body-parser
* dotenv
* jsonwebtoken
* mongoose
* morgan


