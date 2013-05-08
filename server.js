/*
 * Module dependencies
 */
var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, Tumblr = require('tumblrwks')
	, app = express()
	, poet = require('poet')( app )

var tumblr = new Tumblr(
	{
		consumerKey: 'wbv0QjwCd2yUEODaaUOXR8Ni7P8phsWUNzYZqnK4lNUVNMpA36'
	}, "slantback.tumblr.com"
)

function compile(str, path) {
  return stylus(str)
	.set('filename', path)
	.use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('view options', 
  { layout: false}
)
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.render('index', {
		title : 'Home',
		cssID : 'pageHome'
	})
	getTumblrPosts()
})

app.get('/work', function (req, res) {
	res.render('work', {
		title : 'Work',
		cssID : 'pageWork'
	})
})

app.get('/portfolio', function (req, res) {
	res.render('work', {
		title : 'Portfolio',
		cssID : 'pageWork'
	})
})

poet.set({
  posts: './_posts/',  // Directory of posts
  postsPerPage: 5,     // Posts per page in pagination
  metaFormat: 'json',  // meta formatter for posts
  readMoreLink: function (post) {
    // readMoreLink is a function that
    // takes the post object and formats an anchor
    // to be used to append to a post's preview blurb
    // and returns the anchor text string
  },
  readMoreTag: '<!--more-->' // tag used to generate
  // the preview. More in 'preview' section
})
  .createPostRoute()
  .createPageRoute()
  .createTagRoute()
  .createCategoryRoute()
  .init(function ( locals ) {
    // Some callback to run once everything is set up
    // The core storage is passed in as an argument,
    // where all the locals/middleware functions
    //and stores can be altered
  });

function getTumblrPosts(){
	tumblr.get('/posts', {hostname: 'slantback.tumblr.com'}, function(json){
		postsTumblr = json.posts
	})
}

app.listen(3000)