function sentiment_analysis(text, option) {
	if (option === 'synchronous') {
		url = "https://api.idolondemand.com/1/api/sync/analyzesentiment/v1";
	} else {
		url = "https://api.idolondemand.com/1/api/async/analyzesentiment/v1";
	}
	url = url + "?text=" + text + "&apikey=dc0d39a1-c043-4230-92a9-45528e18fbfa";
	
	json = httpGet(url);
	var sentiment_obj = JSON.parse(json);
	return sentiment_obj;
}

function asynchronous_get(jobID) {
	url = "https://api.idolondemand.com/1/job/status/" + jobID + "?&apikey=dc0d39a1-c043-4230-92a9-45528e18fbfa";
	json = httpGet(url);
	return JSON.parse(json);
}

function httpGet(theUrl) {
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}