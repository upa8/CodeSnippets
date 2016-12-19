(function () {
    'use strict';

    angular.module('app')
        .controller('GalleryModalController', GalleryModalController);

    GalleryModalController.$inject = ['data', '$uibModalInstance', 
        'speechRecognitionService'];

    function GalleryModalController(data, $uibModalInstance, 
                                    speechRecognitionService) {
        var vm = this;

        vm.caption = data.caption;
        vm.cancel = cancel;
        vm.ok = ok;

        activate();

        function activate() {
            setSpeechProperties();
        }

        function setSpeechProperties() {
            speechRecognitionService.clearCommands();

            speechRecognitionService.addCommand("save", ok);
            speechRecognitionService.addCommand("cancel", cancel);

            speechRecognitionService.setNoMatchCallback(
                function(transcript) {
                    vm.caption = transcript;
                });
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function ok() {
            $uibModalInstance.close(vm.caption);
        }
    }
})();
