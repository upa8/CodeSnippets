(function () {
    'use strict';

    angular.module('app')
        .factory('galleryService', galleryService);

    galleryService.$inject = ['$http'];

    function galleryService($http) {
        var service = {
            getImageData: getImageData,
            saveImageData: saveImageData
        };

        return service;

        function getImageData() {
            return $http.get('/images');
        }

        function saveImageData(data) {
            return $http.post('/images', data);
        }
    }
})();
