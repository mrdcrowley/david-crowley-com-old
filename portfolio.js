exports.index = function(req, res) {

	res.render('portfolio', {
		title: 'Portfolio',
		cssID: 'portfolio'
	})
}

exports.companion = function(req, res) {
	res.render('includes/portCompanion', {
		title: 'U-Haul Moving Companion',
		cssID: 'pagePiece',
	})
}

exports.intranet = function(req, res) {
	res.render('includes/portIntranet', {
		title: 'U-Haul intranet',
		cssID: 'pagePiece',
	})
}

exports.sharing = function(req, res) {
	res.render('includes/portSharing', {
		title: 'U-Haul Trip Sharing',
		cssID: 'pagePiece',
	})
}