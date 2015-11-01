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
      			controller: 'MainCtrl'
    		})

	    	// Indstiller post visning
	    	.state('post', {
	    		url: '/posts/{id}',
	    		templateUrl: '/posts.html',
	    		controller: 'PostsCtrl'
	    	});

    		// Indstiller alle ander sider
			$urlRouterProvider.otherwise('home');
}]);

// Laver servicen posts
app.factory('posts', [function(){
	var o = {
    	posts: []
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
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
  			comments: [
    			{author: 'Conny', body: 'Jeg elsker rejer!', upvotes: 0},
    			{author: 'Jens', body: 'Jeg elsker T-Bone!', upvotes: 0}
  			]
		});
		// Tømmer input felt efter udfyldning
		$scope.title = '';
  		$scope.link = '';
	}

	// Function til at upvote en post
	$scope.incrementUpvotes = function(post) {
  		post.upvotes += 1;
	};

}]);

//PostController
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];

	// Function til at tilføje en en kommentar til en post
	$scope.addComment = function(){
  		if($scope.body === '') { return; }
  		$scope.post.comments.push({
    		body: $scope.body,
    		author: 'user',
    		upvotes: 0
  		});

		// Tømmer input felt efter udfyldning
		  $scope.body = '';
		};
}]);