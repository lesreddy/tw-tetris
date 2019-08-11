let playerName = localStorage.getItem("playerName");

function playerNameSubmitButton() {
	playerName = $('#playername').val();
	localStorage.setItem("playerName", playerName);
	$('#result').text(playerName);
}

$('#player-name-submit-button').click(function() {
    playerNameSubmitButton();
});

$('.playerNameLaunch').click(function() {
    $('#playerNameModal').modal('show');
});