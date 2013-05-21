$(document).ready(function() {

	// lazy loading for images
	$("img.thumb, ul.posts li img").lazyload({
		effect : "fadeIn"
	});

	// modal window for images in portfolio
	$('#pageWork a[href$=".jpg"], #pageWork a[href$=".png"], #pageWork a[href$=".gif"]').boxer({
		margin: 20
	});

	// timeline
	createStoryJS({
		width:              '100%',
		height:             '600',
		embed_id:           'timeline-embed',
		start_at_end:       false,
		start_at_slide:     '1',
		start_zoom_adjust:  '3',
		hash_bookmark:      true,
		font:               'Bevan-PotanoSans',
		debug:              true,
		lang:               'en',
		maptype:            'watercolor'
	});

	// timeline map
	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: 'transparent',
		color: '#ccc',
		hoverOpacity: 0.7,
		selectedColor: '#333',
		enableZoom: true,
		showTooltip: true,
		normalizeFunction: 'polynomial'
	});

	$('#vmap').vectorMap('set', 'colors', {eg: '#000'})

});