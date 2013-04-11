$(document).ready(function() {
	$("img.thumb, ul.posts li img").lazyload();
	$("header").css('height', '0').css('height', '200px'); // css transition animates this
});