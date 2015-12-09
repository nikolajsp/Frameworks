(function() {
  "use strict";
  
  var app = angular.module("favorite-food", [
    "favorite-food.controllers.main",
    "favorite-food.controllers.post",
    "favorite-food.controllers.auth",
    "favorite-food.controllers.nav",
    "favorite-food.services.post",
    "favorite-food.services.auth",
    "ui.router"
  ]);

  app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state("root", {
        abstract: true,
        views: {
          "header": {
            templateUrl: "partials/header",
            controller: "NavController"
          }
        }
      });

      $urlRouterProvider.otherwise("home");
    }
  ]);
})();
