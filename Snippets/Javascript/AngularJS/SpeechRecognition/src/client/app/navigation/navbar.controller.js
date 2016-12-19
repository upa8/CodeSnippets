(function() {
    'use strict';

    angular.module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$route'];

    function NavController($route) {
        var vm = this;

        vm.isRoute = isRoute;

        function isRoute(routeName) {
            return $route.current.title.substr(0, routeName.length) === routeName;
        }
    }
})();
