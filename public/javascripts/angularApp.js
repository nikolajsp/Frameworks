// Laver modulet FavoriteFood og routing
var app = angular.module('FavoriteFood', ['ui.router'])
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

  		$stateProvider
  			// Indstiller forsiden
			.state('home', {
			 	url: '/home',
			  	templateUrl: '/home.html',
			  	controller: 'MainCtrl',
			  	resolve: {
			    	postPromise: ['posts', function(posts){
			      	return posts.getAll();
			    	}]
			  	}
			})

	    	// Indstiller post visning
	    	.state('posts', {
  				url: '/posts/{id}',
  				templateUrl: '/posts.html',
  				controller: 'PostsCtrl',
  				resolve: {
    				post: ['$stateParams', 'posts', function($stateParams, posts) {
      					return posts.get($stateParams.id);
    				}]
  				}
			});

    		// Indstiller alle ander sider
			$urlRouterProvider.otherwise('home');
}]);

// Laver servicen posts
app.factory('posts', ['$http', function($http){
	var o = {
    	posts: []
  	};
  	// Henter fra databasen
  	o.getAll = function() {
  		return $http.get('/posts').success(function(data) {
  			angular.copy(data, o.posts);
  		});
  	};

  	o.get = function(id) {
  		return $http.get('/posts/' + id).then(function(res){
    		return res.data;
  		});
	};

  	// Sender nye posts til databasen
  	o.create = function(post) {
  		return $http.post('/posts', post).success(function(data) {
  			o.posts.push(data);
  		});
  	};
  	// Sender nye upvotes til databasen
  	o.upvote = function(post) {
  		return $http.put('/posts/' + post._id + '/upvote')
    		.success(function(data){
      			post.upvotes += 1;
    		});
    };

   	o.addComment = function(id, comment) {
  		return $http.post('/posts/' + id + '/comments', comment);
	};

	o.upvoteComment = function(post, comment) {
  		return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
    		.success(function(data){
      			comment.upvotes += 1;
    		});
	};

  	return o;
}]);

//MainController
app.controller('MainCtrl', [
'$scope', 'posts',
function($scope, posts){
  $scope.test = 'Hello world!';

  // Binder servicen posts til arrayet
  $scope.posts = posts.posts;

	// Function til at tilføje en post
	$scope.addPost = function() {
		// Sikrer at ingenting sker hvis post title er tom
		if(!$scope.title || $scope.title === '') { return; }
		// Tilføjer en post til scope
		posts.create({
			title: $scope.title,
			link: $scope.link,
		});
		// Tømmer input felt efter udfyldning
		$scope.title = '';
  		$scope.link = '';
	}

	// Function til at upvote en post
	$scope.incrementUpvotes = function(post) {
		posts.upvote(post);
	};

}]);

//PostController
app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;

	// Function til at tilføje en en kommentar til en post
	$scope.addComment = function(){
  		if($scope.body === '') { return; }
  		posts.addComment(post._id, {
    		body: $scope.body,
    		author: 'user',
  		}).success(function(comment) {
    		$scope.post.comments.push(comment);
  		});

		// Tømmer input felt efter udfyldning
		  $scope.body = '';
		};

		$scope.incrementUpvotes = function(comment){
  			posts.upvoteComment(post, comment);
		};
}]);