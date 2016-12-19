(function () {
    'use strict';

    angular.module('app')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$http'];

    function settingsService($http) {
        var service = {
            getSettings: getSettings,
            saveSettings: saveSettings
        };

        return service;

        function getSettings() {
            return $http.get('/settings');
        }

        function saveSettings(data) {
            return $http.post('/settings', data);
        }
    }
})();
