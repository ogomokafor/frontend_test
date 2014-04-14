/**
 * Rotator class
 * A class used to rotate elements in a webpage.
 * @return {Rotator} API
 */
var Rotator = (function () {

    var api = function(config) {

        validate(config); // Validate the supplied config.

        /**
         * Performs simple validation on the supplied rotator configuration object.
         * @param {Object} config Rotator configuration
         * @throws {Exception} Rotator configuration is missing required field.
         * @return void
         */
        function validate(config) {

            var fieldsToValidate = [
                {name: 'container', required: true}
            ];

            for(var a = 0; a < fieldsToValidate.length; a++) {
                var field = fieldsToValidate[a];
                if(field.required && 'undefined' === typeof config[field.name]) {
                    throw ['Rotator configuration is missing required field:', field.name].join(' ');
                }
            }
        }

        /**
         * Rotates the elements defined in config;
         * @return void
         */
        this.rotate = function() {

            var container = document.querySelectorAll(config.container);
        };
    };

    return api;

})();