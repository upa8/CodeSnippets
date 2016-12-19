(function () {
    'use strict';

    angular.module('app')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$window', 'galleryService', '$interval',
        '$scope', 'galleryModalService', 'speechRecognitionService',
        '$timeout', 'speechSynthesisService', 'settingsService'];

    function GalleryController($window, galleryService, $interval, $scope,
                galleryModalService, speechRecognitionService, $timeout, 
                               speechSynthesisService, settingsService) {
        var vm = this;
        var recognitionTimeout;

        vm.alerts = [];

        vm.addAlert = addAlert;
        vm.closeAlert = closeAlert;
        vm.selectImage = selectImage;
        vm.isSelected = isSelected;
        vm.next = next;
        vm.previous = previous;
        vm.startSlideShow = startSlideShow;
        vm.stopSlideShow = stopSlideShow;
        vm.editCaption = editCaption;

        vm.album;
        vm.selectedIndex = -1;
        vm.isSlideShowRunning = false;
        
        activate();
        
        function activate() {
            getImages();
            getSettings();

            recognitionTimeout = $timeout(startSpeechRecognition, 3000);
        }

        function speakCaption() {
            speechSynthesisService.speak(vm.album.images[vm.selectedIndex].caption, vm.settings);
        }

        function setSpeechProperties() {
            speechRecognitionService.clearCommands();

            speechRecognitionService.addCommand("edit caption", editCaption);
            speechRecognitionService.addCommand("start slideshow", startSlideShow);
            speechRecognitionService.addCommand("stop slideshow", stopSlideShow);
            speechRecognitionService.addCommand("next", next);
            speechRecognitionService.addCommand("previous", previous);

            speechRecognitionService.setNoMatchCallback(function(transcript) {
                addAlert('danger', "No command found for '" + transcript + "'");
            });
            speechRecognitionService.setUnrecognizedCallback(function(transcript) {
                addAlert('info', "I'm not sure, but I think you said, '" + transcript + "'");
            });
        }

        function startSpeechRecognition() {
            try {
                setSpeechProperties();

                speechRecognitionService.startRecognition();
            }
            catch(e) {
                addAlert('danger', e.message);
            }
        }

        function getSettings() {
            settingsService.getSettings()
                .then(function (response) {
                    vm.settings = response.data;
                });
        }

        function editCaption() {
            if (vm.album.images && vm.album.images.length > 0) {
                if (vm.selectedIndex < 0) {
                    selectImage(0);
                }

                stopSlideShow();

                var selectedImage = vm.album.images[vm.selectedIndex];

                galleryModalService.editCaption(selectedImage.caption)
                    .then(
                        function (newCaption) {
                            setSpeechProperties();

                            if (selectedImage.caption !== newCaption) {
                                selectedImage.caption = newCaption;

                                speakCaption();

                                galleryService.saveImageData(angular.toJson(vm.album))
                                    .then(function () {
                                        addAlert('success', 'Caption saved');
                                    });
                            }
                        }, function() {
                            setSpeechProperties();
                        }
                    );
            }
        }

        $scope.$on('$locationChangeStart', function() {
            stopSlideShow();

            $timeout.cancel(recognitionTimeout);

            speechRecognitionService.stopRecognition();
        });

        var slideShowPromise;

        function startSlideShow() {
            if (!angular.isDefined(slideShowPromise)) {
                next();

                slideShowPromise = $interval(next, 3000);

                vm.isSlideShowRunning = true;
            }
        }

        function stopSlideShow() {
            if (angular.isDefined(slideShowPromise)) {
                $interval.cancel(slideShowPromise);
                slideShowPromise = undefined;
                vm.isSlideShowRunning = false;
            }
        }

        function previous() {
            var index = vm.selectedIndex;

            index--;

            if (index < 0) {
                index = vm.album.images.length - 1;
            }

            selectImage(index);
        }

        function next() {
            var index = vm.selectedIndex;

            index++;

            if (index >= vm.album.images.length) {
                index = 0;
            }

            selectImage(index);
        }

        function getImages() {
            galleryService.getImageData()
                .then(function (response) {
                    vm.album = response.data;
                });
        }

        function isSelected(index) {
            return vm.selectedIndex === index;
        }

        function selectImage(index) {
            $window.scrollTo(0,0);

            vm.selectedIndex = index;

            speakCaption();
        }

        function addAlert(type, msg) {
            vm.alerts.push({type: type, message: msg});
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }
    }
})();
