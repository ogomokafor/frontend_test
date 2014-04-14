/**
 * Utility library
 * @return {utils} An utils object
 */
function Utils() {

    /**
     * Attaches an event listener on a specified element.
     * @param {Object} obj The object to listen to for events.
     * @param {String} type The type of event to listen for.
     * @param {Function} callback The callback function to execute by the event listener.
     * @return void
     */
    this.bindEventListener = function(obj, type, callback) {
        if(obj.attachEvent) {
            var typeCallback = type + callback;
            var eTypeCallback = 'e' + type + callback;
            obj[eTypeCallback] = callback;
            obj[typeCallback] = function(){obj[eTypeCallback](window.event);};
            obj.attachEvent('on'+type, obj[typeCallback]);
        } else {
            obj.addEventListener(type, callback, false);
        }
    };

    /**
     * Creates and returns an Element object.
     * @param {String} tagName The type of element to create.
     * @param {Object} attributes Attributes to apply to the created element.
     * @return {Element} The newly created element.
     */
    this.createElement = function(tagName, attributes) {

        if('string' !== typeof tagName || '' == tagName.trim()) {
            throw 'Invalid HTML tag name specified.';
        }

        var element = document.createElement(tagName);
        if(element && 'object' === typeof attributes) {
            for(var key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    };


    /**
     * Returns a boolean indication of whether DOM has been loaded.
     * @return {Boolean} TRUE if DOM is ready, else FALSE.
     */
    this.domReady = function() {

        if('complete' === document.readyState || 'loaded' === document.readyState) {
            return true;
        }
        if('interactive' !== document.readyState) {
            return false;
        }
        if(!document.documentElement.doScroll) {
            return true;
        }
        try {
            document.documentElement.doScroll('left');
            return true;
        }
        catch (e) {
            return false;
        }
    };

    /**
     * Executes a specified callback when DOM is ready.
     * @param {Function} callback The callback method to execute.
     * @return void
     */
    this.onDomReady = function(callback) {

        if('function' !== typeof callback) {
            throw 'Callback must be a function.';
        }

        var _this = this;
        var intervalId = window.setInterval(function(){
            if(_this.domReady()) {
                window.clearInterval(intervalId);
                if(null != callback) { // Prevent long-running logic from applying callback more than once.
                    callback.call();
                    callback = null;
                }
            }
        }, 100);

    };

    /**
     * Simple template generator that returns a string composed from a supplied template and a dictionary/object.
     * @param {String} tpl The template string.
     * @param {Object} replacements Dictionary object.
     * @throws {Exception} Invalid parameter supplied to template.
     * @return {String} Generated string with all substitutions applied.
     */
    this.template = function(tpl, replacements) {

        if('object' !== typeof replacements) {
            throw  'Invalid parameter supplied to template. Object is expected for the replacements variable.';
        }

        if('string' !== typeof tpl) {
            throw  'Invalid parameter supplied to template. String is expected for the tpl variable.';
        }

        for(var key in replacements) {
            var needle = '{{'+key+'}}';
            tpl = tpl.replace(needle, replacements[key]);
        }
        return tpl;
    };

    /**
     * Cancels listening for the specified event on a supplied object.
     * @param {Object} obj The object to cancel event listening on.
     * @param {String} type The type of event to stop listening for.
     * @param {Function} callback The callback function executed by the event listener.
     * @return void
     */
    this.unbindEventListener = function(obj, type, callback) {
        if(obj.detachEvent) {
            obj.detachEvent('on'+type, obj[type+callback]);
            obj[type+callback] = null;
        } else {
            obj.removeEventListener(type, callback, false);
        }
    };
}