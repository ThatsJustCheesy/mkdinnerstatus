// https://stackoverflow.com/a/22076667/5390105
var HttpClient = function() {
  this.get = function(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
    }

    httpRequest.open('GET', url, true);            
    httpRequest.send();
  }
};

function formatSuccessfulResponse(response) {
  return "<b>Online</b><br><br>" + response.Motd + "<br>Version: " + response.Version + "<br>Players: " + response.Players;
}
function formatErrorResponse(response) {
  return "<b>Offline (" + response.error + ")</b>";
}

var client = new HttpClient();
client.get('https://api.minetools.eu/query/mc.igregory.ca/25565', function(response) {
  response = JSON.parse(response);
  var results = document.getElementById('results-vanilla');
  results.innerHTML = (response.status == "OK") ? formatSuccessfulResponse(response) : formatErrorResponse(response);
});
client.get('https://api.minetools.eu/query/mc.igregory.ca/25585', function(response) {
  response = JSON.parse(response);
  var results = document.getElementById('results-modded');
  results.innerHTML = (response.status == "OK") ? formatSuccessfulResponse(response) : formatErrorResponse(response);
});
