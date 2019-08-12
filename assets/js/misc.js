// let playerName = localStorage.getItem("playerName");

/**
 * 
 This function is designed to set the player name using local storage and activated when the set player name modal inititalises
 */
/* function playerNameSubmitButton() {
	playerName = $('#playername').val();
	localStorage.setItem("playerName", playerName);
	$('#result').text(playerName);
}

$('#player-name-submit-button').click(function() {
    playerNameSubmitButton();
}); */

$('.playerNameLaunch').click(function() {
    playerName();
}); 



/**
 * 
 * This function was implemented referencing my mentor (simen Daelin's: https://github.com/Eventyret/tetris-game/blob/master/assets/js/misc.js) z 
 * The reason for this was because I could not get my modal to work properly(#playerNameModal)
 */
function playerName(z){
	var z = bootbox.prompt("Let's set your playername", function display(z) {
	  if (z != null) {
		  document.getElementById("playername").innerHTML = z;
		  localStorage.playername = z;
		  
		  dis(z);
	  }
	  else
		  document.getElementById("playername").innerHTML = "New Player";
	});
	}
	function dis(arg) {
	  bootbox.alert("Player name set to " + arg);
	}
	if(localStorage.playername === undefined) {
	  document.getElementById("playername").innerHTML = "Player 1";
	} else {
	  document.getElementById("playername").innerHTML = localStorage.playername;
	}