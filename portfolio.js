exports.index = function(req, res) {

	res.render('portfolio', {
		title: 'Portfolio',
		cssID: 'portfolio'
	})
}

exports.sharing = function(req, res) {
	res.render('includes/portSharing', {
		title: 'U-Haul Trip Sharing',
		cssID: 'pagePiece',
	})
}

exports.companion = function(req, res) {
	res.render('includes/portCompanion', {
		title: 'U-Haul Moving Companion',
		cssID: 'pagePiece',
	})
}