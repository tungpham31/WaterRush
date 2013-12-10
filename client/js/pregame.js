$(document).ready(function() {
	$('#play').click(function(){
		window.open('gameplay' + localStorage.gameNum + '.html', '_self', false);
	});
});