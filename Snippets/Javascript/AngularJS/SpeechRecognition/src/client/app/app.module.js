(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
        .factory('_', ['$window', function($window) {
            return $window._;
        }])
        .config(routeConfig);
    
    routeConfig.$inject = ['$routeProvider'];
    
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', 
            { templateUrl: 'app/gallery/gallery.html', title: 'gallery'})
            .when('/settings', 
                { templateUrl: 'app/settings/settings.html', 
                    title: 'settings'})
            .otherwise({ redirectTo: '/' });
    }
})();
