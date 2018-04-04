/**
 * Created by Anastasia on 04.04.18.
 */

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "http://localhost:5000/api/account/login",
	"method": "POST",
	"headers": {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"Postman-Token": "8d5800b7-0215-0951-e482-5d8a717bfe81"
	},
	"processData": false,
	"data": "{\n\t\"UserName\": \"Borec\",\n\t\"Password\": \"helloboy\",\n\t\"RememberMe\": \"true\"\n}"
}
//


function neco() {
	console.log(settings);

	$.ajax(settings).done(function (response) {
		console.log(response);
	});
}