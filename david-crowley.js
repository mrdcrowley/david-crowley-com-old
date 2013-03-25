var GitHubApi = require("github"),
	http = require('http'),
	Tumblr = require('tumblrwks'),
	twitter = require('ntwitter'),
	util = require('util'),
	youtube = require('youtube-feeds');

// import private variables, API keys and such
var secret = require('./config/secret.js'),
	secret = new secret();

// import config variables, URLs, usernames and such
var config = require('./config/config.js'),
	config = new config();

var tumblr = new Tumblr(
  {
	consumerKey: secret.tumblrKey
  }, config.tumblrURL
);

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

var body;

// var twit = new twitter({
// 	consumer_key: 'secret.consumerKey',
// 	consumer_secret: 'secret.consumerSecret',
// 	access_token_key: 'secret.accessTokenKey',
// 	access_token_secret: 'secret.accessTokenSecret'
// });

var serv = http.createServer(function
(req, res) {
	res.writeHead(200,
{ 'Content-Type': 'text/html' });

// twit.stream('mrdcrowley', function(stream) {
//   stream.on('data', function (data) {
//     console.log(data);
//   });
// });


	tumblr.get('/posts', {hostname: 'slantback.tumblr.com'}, function(json){
		body += '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<h1>david-crowley.com</h1>'+
			'<h2><a href="http://slantback.tumblr.com">Tumblr findings</a></h2>';

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

		github.repos.getFromUser({
		    user: "mrdcrowley"
		}, function(err, res) {
			for ( i = 0; i < res.length; i++ ) {
				body += '<p>' + res[i].html_url + '</p>';
				console.log(i);
			}
		    // console.log(JSON.stringify(res));
		});

		// youtube.user( config.twitterHandle ).uploads( function(json){
		// 	console.log(youtube.user( config.twitterHandle ).uploads.length);
		// 	console.log(youtube.user( config.twitterHandle ).uploads.title);
		// });

		// for ( i=0; i < youtube.user( config.twitterHandle ).uploads.length; i++) {
		// 	youtube.user( config.twitterHandle ).uploads(console.log);
		// 	var video = youtube.user( config.twitterHandle ).uploads;\
		// }

	    res.write(body);
		res.end();
	});

});
serv.listen(3000);