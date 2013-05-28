exports.index = function(req, res) {

	res.render('portfolio', {
		title: 'Portfolio',
		cssID: 'portfolio'
	})
}

exports.piece = function(req, res) {
	
	var id = req.params.id

	res.render('includes/portfolioPiece', {
		title: 'Portfolio',
		cssID: 'portPiece',
		piece: id
	})
}