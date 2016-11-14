var getUrl = window.location;
var baseUrl = "http://localhost:8181";

function authenticateUser(user, password)
{
	var token = user + ":" + password;
	var hash = btoa(token);    
	
	return hash;
}
