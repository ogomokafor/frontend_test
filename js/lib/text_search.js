(function(){

    /**
     * ID of the element containing the text to search.
     * @type {String}
     */
    var haystackID = 'search_text';

    /**
     * ID of the search result display element.
     * @type {String}
     */
    var resultDisplayID = 'search_results';

    /**
     * The tag name of the result heading text.
     * @type {String}
     */
    var resultHeadingTag = 'h3';

    /**
     * Utility object helper.
     * @type {Utils}
     */
    var utils = new Utils();


    init(); // Prep the page for text searching.
    bindEvents(); // Bind all events.


    /**
     * Binds submit event handling on the search box.
     * @return void
     */
    function bindEvents () {

        var form = document.querySelector('form');
        if(form) {
            utils.bindEventListener(form, 'submit', function(e){
                e.preventDefault();
                e.stopPropagation();
                doSearch();
            });
        }
    }

    /**
     * Renders the result of a search on the screen.
     * @param {String} searchStr The string that was searched for.
     * @param {Int} matchesFound A count of the number of matches that were found in the search.
     * @return void
     */
    function displayResults(searchStr, matchesFound) {

        var resultDisplay = document.getElementById(resultDisplayID);
        if(resultDisplay) {

            var tpl = 'Found {{matchesFound}} '+
                ((matchesFound === 1) ? 'occurence ' : 'occurences ')+
                'of the word "{{searchStr}}" in the below text.';

            resultDisplay.innerHTML = utils.template(tpl, {
                matchesFound: matchesFound,
                searchStr: searchStr
            });
        }
    }

    /**
     * Performs a search for the supplied search phrase.
     * @return void
     */
    function doSearch() {
        var needle = document.getElementById('search_input').value.trim();
        if(needle.length) {
            var needleCopy = needle;
            needle = needle.replace(/\W/g, function(match){
                return '\\'+match; // Escape all characters in search string.
            });
            var haystack = document.getElementById(haystackID).textContent;
            var results = haystack.match(new RegExp(needle, 'mig'));
            var matches = results && results.length ? results.length : 0;
            displayResults(needleCopy, matches);
        };
    }

    /**
     * Initializes the environment for text searching.
     * @return void
     */
    function init() {

        // # Get the result placeholder text
        var textNode = document.querySelector(resultHeadingTag).nextSibling;

        // # Create element to display search result notification.
        var resultDisplay = utils.createElement('p', {id: resultDisplayID});
        resultDisplay.innerHTML = textNode.textContent.trim();
        textNode.parentNode.insertBefore(resultDisplay, textNode);

        // # Clean up.
        textNode.parentNode.removeChild(textNode);
        
    }
})();