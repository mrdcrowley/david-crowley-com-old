// MODULES
var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, Tumblr = require('tumblrwks')
	, app = express()
	, poet = require('poet')( app )
	, portfolio = require('./portfolio')


// SETUP
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


// VARIABLES
var refreshDelay = 100000 // refresh delay for tumblr posts


// TUMBLR POSTS
var tumblr = new Tumblr(
	{
		consumerKey: 'wbv0QjwCd2yUEODaaUOXR8Ni7P8phsWUNzYZqnK4lNUVNMpA36'
	}, "slantback.tumblr.com"
)

var	getTumblrPosts = function getTumblrPosts(){
	tumblr.get('/posts', {hostname: 'slantback.tumblr.com'}, function(json){
		postsTumblr = json.posts
	})
	console.log('tumblr posts updated')
}


// INDEX
app.get('/', function (req, res) {
	res.render('index', {
		title : 'Home',
		cssID : 'pageHome'
	})
})


// PORTFOLIO
app.get('/portfolio', portfolio.index)
app.get('/portfolio/companion', portfolio.companion)
app.get('/portfolio/intranet', portfolio.intranet)
app.get('/portfolio/sharing', portfolio.sharing)
app.get('/work', portfolio.index) // old url, point to /portfolio


// TIMELINE
app.get('/timeline', function (req, res) {
	res.render('timeline', {
		title : 'Timeline',
		cssID : 'pageTimeline'
	})
})

// BLOG POSTS
poet.set({
	postsPerPage : 3,
	posts        : './_posts',
	metaFormat   : 'json',
	readMoreLink : function ( post ) {
      var anchor = '<a href="'+post.url+'" title="Read more of '+post.title+'" class="more">More &rarr;</a>';
      return '<p>' + anchor + '</p>';
    }
}).createPostRoute( '/post/:post', 'post' )
	.createPageRoute( '/page/:page', 'page' )
	.createTagRoute( '/tag/:tag', 'tag' )
	.createCategoryRoute( '/category/:category', 'category' )
	.init();

// INIT
getTumblrPosts();
setInterval(getTumblrPosts,refreshDelay); // keep getting new posts

app.listen(3000)