'use strict';

var angular = require("angular");
require("angular-route");

// style sheets
require("bootstrap-webpack");
require("../scss/main.scss");

// index.html
require("../index.html");

var loginView = require("./loginView.js");
var dashboardView = require("./dashboardView");
var vehicleView = require("./vehicleView");
var vehicleListView = require("./vehicleListView");
var currentView;
var $currentViewScope;

var auth = {};
var n_data_map = {};
var total_speed_map = {};
var total_driver_scores_map = {};
var latestStats = {};

function initVehicleStats(vehicle) {
  if (!(vehicle.info.id in n_data_map)) {
    n_data_map[vehicle.info.id] = 0;
    total_speed_map[vehicle.info.id] = 0;
    total_driver_scores_map[vehicle.info.id] = 0;
  }
}

function updateVehicleStats(vehicle, data) {
  initVehicleStats(vehicle);

  var n_data = ++n_data_map[vehicle.info.id];
  var total_speed = total_speed_map[vehicle.info.id];
  var total_driver_scores = total_driver_scores_map[vehicle.info.id];

  var stats = {
    miles : (data.miles).toFixed(0),
    avg_speed : (total_speed/n_data).toFixed(0),
    driver_score : (total_driver_scores/n_data).toFixed(0),
    fuel : (data.fuel).toFixed(0),
    brake : (data.brake).toFixed(0),
    runtime : data.runtime
  };

  total_speed_map[vehicle.info.id] =  total_speed_map[vehicle.info.id] + data.speed;
  total_driver_scores_map[vehicle.info.id] = total_driver_scores_map[vehicle.info.id] + data.avgT;

  latestStats[vehicle.info.id] = stats;
}

var App = require("./app");
window.app = new App({
  refresh: function () {
    $currentViewScope.$apply();
  },

  onVehicleData: function (vehicle, data) {
    if (currentView.onVehicleData) currentView.onVehicleData(vehicle, data);
    if (vehicle.info.type === "CAR") {
      updateVehicleStats(vehicle, data);
      if (currentView.onVehicleStats) currentView.onVehicleStats(vehicle, latestStats[vehicle.info.id]);
    }
  },

  onAuthenticated: function () {
    window.location.href = '/#!/dashboard';
    $currentViewScope.$apply();
  },

  authFailed: function (reason) {
    auth.reason = reason;
    window.location.href = '/#!/login';
    $currentViewScope.$apply();
  },

  authRequired: function () {
    auth.reason = "";
    window.location.href = '/#!/login';
  },
});

angular
  .module("app", [
    'ngRoute'
  ])
  .controller('LoginViewCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $currentViewScope = $scope;
    $scope.auth = auth;
    currentView = loginView;
    $timeout(function () {
      loginView.init(app, $scope.auth);
    });
  }])
  .controller('DashboardViewCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    app.checkLoggedIn();
    $currentViewScope = $scope;
    $scope.app = app;
    $scope.vehicles = app.vehicles;
    currentView = dashboardView;
    // use timeout service to wait until view is loaded
    $timeout(function () {
      dashboardView.init($scope, latestStats);
    }, 0);
  }])
  .controller('VehicleViewCtrl', ['$routeParams', '$scope', '$timeout', function ($routeParams, $scope, $timeout) {
    app.checkLoggedIn();
    $currentViewScope = $scope;
    $scope.app = app;
    $scope.vehicles = app.vehicles;
    $scope.id = $routeParams.id;
    $scope.vehicle = app.vehicles[$routeParams.id];
    currentView = vehicleView;
    if ($scope.vehicle) {
      $timeout(function () {
        vehicleView.init($scope);
        vehicleView.onVehicleStats($scope.vehicle, latestStats[$scope.vehicle.info.id]);
      }, 0);
    }
  }])
  .controller('VehicleListViewCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    app.checkLoggedIn();
    $currentViewScope = $scope;
    $scope.vehicles = app.vehicles;
    $scope.newVehicle = {};
    $scope.addVehicle = function () {
      var err = app.addVehicle(angular.copy($scope.newVehicle), function (err, vehicleAdded) {
        if (err) {
          vehicleListView.onVehicleAddingFailed(err);
        } else {
          $scope.vehicleAdded = vehicleAdded;
          vehicleListView.onVehicleAdded();
          $scope.$apply();
        }
      });
    };
    $scope.deleteVehicle = function (vehicleId) {
      app.deleteVehicle(vehicleId);
    };
    $scope.generateVehicleKey = function (vehicleId) {
      app.generateKey(vehicleId);
    };
    currentView = vehicleListView;
    vehicleListView.init();
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/dashboard', { controller: 'DashboardViewCtrl', templateUrl: "views/dashboard.html" } )
      .when('/vehicles/:id', { controller: 'VehicleViewCtrl', templateUrl: "views/vehicle.html" } )
      .when('/vehicles', { controller: 'VehicleListViewCtrl', templateUrl: "views/vehicle_list.html" } )
      .when('/login', { controller: 'LoginViewCtrl', templateUrl: 'views/login.html' })
      .otherwise({ redirectTo: '/dashboard' }); 
  }]);
