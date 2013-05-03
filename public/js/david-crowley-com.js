$(document).ready(function() {

	// lazy loading for images
	$("img.thumb, ul.posts li img").lazyload({
		effect : "fadeIn"
	});
	
	// modal window for images in portfolio
	$('#pageWork a[href$=".jpg"], #pageWork a[href$=".png"], #pageWork a[href$=".gif"]').boxer({
    	margin: 20
	});
});