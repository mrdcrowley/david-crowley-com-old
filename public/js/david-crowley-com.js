$(document).ready(function() {
	$("img.thumb").lazyload();
	$("header").css('height', '0').css('height', '200px'); // css transition animates this
});