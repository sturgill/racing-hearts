// Racing Hearts
// DailyBurn 2015 Hackathon
// Chris Sturgill, Kevin Spector, Luke Arntson

// extend jquery to read params
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var login = function() {
  $( document ).ready(function() {
    window.alert("Logging in!");
  });
};

login();