var http = require('http'),
	Tumblr = require('tumblrwks'),
	util = require('util');

// import private variables, API keys and such
var secret = require('./config/secret.js'),
	s = new secret();

// import config variables, URLs, usernames and such
var config = require('./config/config.js'),
	c = new config();

var tumblr = new Tumblr(
  {
	consumerKey: s.tumblrKey
  }, c.tumblrURL
  // specify the blog url now or the time you want to use
);

var serv = http.createServer(function
(req, res) {
	res.writeHead(200,
{ 'Content-Type': 'text/html' });

	// tumblr.get('/posts', {hostname: 'slantback.tumblr.com'}, function(json){
	// 	var body = '<html>'+
	// 		'<head>'+
	// 		'<meta http-equiv="Content-Type" content="text/html; '+
	// 		'charset=UTF-8" />'+
	// 		'</head>'+
	// 		'<body>'+
	// 		'<h1>david-crowley.com</h1>'+
	// 		'<h2>Tumblz</h2>'+
	// 		'<a href="' + json.posts[0].post_url + '">' + json.posts[0].source_title +'</a></p>'+
	// 		'<p>' + json.posts[0].text + '</p>'+
	// 		'<img src=' + json.posts[0].photos[0].alt_sizes[0].url + '" /></p>'+
	// 		'<a href="' + json.posts[1].post_url + '">' + json.posts[1].source_title +'</a></p>'+
	// 		'<p>' + json.posts[1].text + '</p>'+
	// 		'<a href="' + json.posts[2].post_url + '">' + json.posts[2].source_title +'</a></p>'+
	// 		'<p>' + json.posts[2].text + '</p>'+
	// 		'<img src=' + json.posts[2].photos[0].alt_sizes[0].url + '" /></p>'+
	// 		'<a href="' + json.posts[4].post_url + '">' + json.posts[4].source_title +'</a></p>'+
	// 		'<p>' + json.posts[4].text + '</p>'+
	// 		'</form>'+
	// 		'</body>'+
	// 		'</html>';
	//     res.write(body);
	// 	res.end();
	// });


	tumblr.get('/posts', {hostname: 'slantback.tumblr.com'}, function(json){
		var body = '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<h1>david-crowley.com</h1>'+
			'<h2><a href="http://slantback.tumblr.com">Tumblz</a></h2>';

		for ( i = 0; i < 10; i++ ) {
			post = json.posts[i];

			// LINKS
			if (post.type == 'link') {
				body += '<p><a href="' + post.url + '">' + post.title + '</a><br />' + post.description;
			}
		
			// PHOTOS
			else if (post.type == 'photo') {
				for ( x = 0; x < post.photos.length; x++ ) {
					body += '<img src="' + post.photos[x].alt_sizes[0].url + '" alt="" />';
				}
				body += '<p>' + post.caption + '</p>';
			}

			// QUOTES
			else if (post.type == 'quote') {
				body += '<p>' + post.text + '</p>' + '<p> - ' + post.source + '</p>';
			}

			// VIDEOS
			else if (post.type == 'video') {
				body += post.player[0].embed_code + '<p>' + post.caption + '</p>';
			}
		}

	    res.write(body);
		res.end();
	});

});
serv.listen(3000);