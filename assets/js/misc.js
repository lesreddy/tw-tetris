let playerName = localStorage.getItem("playerName");

function playerNameLaunchButton() {
	playerName = $('#playername').val();
	localStorage.setItem("playerName", playerName);
	$('#result').text(playerName);
}

$('#player-name-submit-button').click(function() {
    playerNameLaunchButton();
});

$('#playerNameLaunchButton').click(function() {
    $('#playerNameModal').modal('show');
});