(function () {
    'use strict';

    angular.module('app')
        .factory('galleryModalService', galleryModalService);

    galleryModalService.$inject = ['$uibModal'];

    function galleryModalService($uibModal) {
        var service = {
            editCaption: editCaption
        };

        return service;

        function editCaption(caption) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/gallery/gallery.modal.html',
                controller: 'GalleryModalController',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    data: function () {
                        return {
                            caption: caption
                        };
                    }
                }
            });

            return modalInstance.result;
        }
    }
})();
