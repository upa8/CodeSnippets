(function () {
    'use strict';

    angular.module('app')
        .factory('speechRecognitionService', speechRecognitionService);

    speechRecognitionService.$inject = ['$window', '_', '$rootScope'];

    function speechRecognitionService($window, _, $rootScope) {
        var SpeechRecognition = $window.SpeechRecognition
            || $window.webkitSpeechRecognition;

        var recognizer;
        var isRecognizing = false;
        var autoRestart = false;

        var commands = [];

        var noMatchCallback;
        var unrecognizedCallback;

        var service = {
            startRecognition: startRecognition,
            stopRecognition: stopRecognition,
            addCommand: addCommand,
            clearCommands: clearCommands,
            setNoMatchCallback: setNoMatchCallback,
            setUnrecognizedCallback: setUnrecognizedCallback
        };

        activate();

        function activate() {
            if (SpeechRecognition) {
                recognizer = new SpeechRecognition();

                recognizer.continuous = true;
                recognizer.maxAlternatives = 3;

                recognizer.onstart = startHandler;
                recognizer.onend = endHandler;
                recognizer.onresult = resultHandler;
                recognizer.onerror = errorHandler;
            }
        }

        function addCommand(commandText, cb) {
            commands.push({ text: _.toLower(commandText), callback: cb });
        }

        function clearCommands() {
            commands.length = 0;
        }

        function setNoMatchCallback(callback) {
            noMatchCallback = callback;
        }

        function setUnrecognizedCallback(callback) {
            unrecognizedCallback = callback;
        }

        function errorHandler(err) {
            if (err.error === 'not-allowed') {
                autoRestart = false;
            }

            console.log(err);
        }

        function resultHandler(event) {
            if (event.results) {
                var result = event.results[event.resultIndex];
                var transcript = result[0].transcript;

                if (result.isFinal) {
                    if (result[0].confidence < .5) {
                        if (unrecognizedCallback) {
                            unrecognizedCallback(transcript);
                        }
                        else {
                            console.log('Unrecognized result: ' + transcript);
                        }
                    }
                    else {
                        var match = _.find(commands,
                            { text: _.toLower(_.trim(transcript)) });

                        if (match) {
                            match.callback();
                        }
                        else if (noMatchCallback) {
                            noMatchCallback(transcript);
                        }
                        else {
                            console.log("No matching command was found for '" +
                                transcript + "'");
                        }
                    }
                    
                    $rootScope.$apply();
                }
            }
        }

        function startHandler() {
            isRecognizing = true;
        }

        function endHandler() {
            isRecognizing = false;

            if (autoRestart) {
                startRecognition();
            }
        }

        function startRecognition() {
            if (recognizer) {
                if (!isRecognizing) {
                    autoRestart = true;

                    recognizer.start();
                }
            }
            else {
                throw new Error('Speech recognition is not supported');
            }
        }

        function stopRecognition() {
            if (recognizer) {
                autoRestart = false;

                recognizer.stop();
            }
        }

        return service;
    }
})();