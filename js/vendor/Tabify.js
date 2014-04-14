var Tabify = (function(u){

    var api = function(config) {

        validate(config); // Validate the supplied config.

        /**
         * Selector for the element to house the tabbed content.
         * @type {String}
         */
        var parentSelector = config.parentElement;

        /**
         * Class name for the panes container.
         * @type {String}
         */
        var panesContainerClass = 'panes';

        /**
         * ID for the panes container.
         * @type {String}
         */
        var panesContainerID = 'tabbed_content_panes';

        /**
         * Selector for content panes to tabify.
         * @type {String}
         */
        var panesSelector = config.panes;

        /**
         * Class name for the tabs container.
         * @type {String}
         */
        var tabsContainerClass = 'tabs';

        /**
         * ID for the tabs container.
         * @type {String}
         */
        var tabsContainerID = 'tabbed_content_tabs';

        /**
         * Selector for elements to tabify.
         * @type {String}
         */
        var tabsSelector = config.tabs;

        /**
         * ID for the tabify container.
         * @type {String}
         */
        var tabbedViewID = 'tabbed_content';

        /**
         * Registers event handlers for the tabbed view.
         * @return void
         */
        function bindEvents() {
            // u.bindEventListener()
        }

        /**
         * Creates the containers for the tabbed view.
         * @return {Boolean} Indication of successful container creation.
         */
        function createContainers() {
            var parentContainer = document.querySelector(parentSelector);
            if(parentContainer) {
                var tabbedView = u.createElement('div', {id: tabbedViewID});
                var tabsContainer = u.createElement('div', {id: tabsContainerID, class: tabsContainerClass});
                var panesContainer = u.createElement('div', {id: panesContainerID, class: panesContainerClass});
                tabbedView.appendChild(tabsContainer);
                tabbedView.appendChild(panesContainer);
                parentContainer.appendChild(tabbedView);
                return true;
            }
            return false;
        }

        /**
         * Removes .active class from active tabs and panes.
         * @return void
         */
        function resetActiveStates() {
            var activeElements = document.querySelectorAll('#'+tabbedViewID+' .active');
            if(activeElements) {
                for(var i = 0; i < activeElements.length; i++) {
                    activeElements[i].className = activeElements[i].className.replace('active', '').trim();
                }
            }
        }

        /**
         * Event handler for tabbed view toggle requests.
         * @param {HTMLElement} element The tab that was just clicked.
         * @return void
         */
        function respondToToggle(element) {
            var index = element.getAttribute('data-index');
            if(index) {
                resetActiveStates();
                var pane = document.getElementById(panesContainerID).querySelector('[data-index="'+index+'"]');
                if(pane) {
                    pane.className+=' active';
                    element.className+=' active';
                } else {
                    // @todo: Should not happen. Log error.
                }
            }
        }

        /**
         * Populates the tabbed view with user-specified content.
         * @return void
         */
        function stuffContainers() {
            var i;

            var tabContainer = document.getElementById(tabsContainerID);
            if(tabContainer) {
                var tabs = document.querySelectorAll(tabsSelector);
                for(i = 0; i < tabs.length; i++) {
                    if(i === 0) {tabs[i].className+=' active';}
                    tabs[i].setAttribute('data-index', i+1);
                    u.bindEventListener(tabs[i], 'click', function(e){
                        respondToToggle(this);
                    });
                    tabContainer.appendChild(tabs[i]);
                }
            }

            var panesContainer = document.getElementById(panesContainerID);
            if(panesContainer) {
                var panes = document.querySelectorAll(panesSelector);
                for(i = 0; i < panes.length; i++) {
                    if(i === 0) {panes[i].className+=' active';}
                    panes[i].setAttribute('data-index', i+1);
                    panesContainer.appendChild(panes[i]);
                }
            }
        }

        /**
         * Stub for configuration validation.
         * @param {Object} config Tabify configuration
         * @throws {Exception} Tabify configuration is missing required field.
         * @return {Boolean} Validated
         */
        function validate(config) {
            return true;
        }

        /**
         * Creates the containers for the tabbed view.
         * @return void
         */
        this.init = function() {
            if(createContainers()) {
                stuffContainers();
            } else {
                console.error('Tabify was unable to create necessary containers... Exiting.');
            }

        };
    };

    return api;
})(new Utils());