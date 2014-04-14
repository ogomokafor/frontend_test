/**
 * Compatibility:
 * Chrome: 4
 * Firefox: 3.5
 * Internet Explorer: 9
 * Opera: 10
 * Safari: 4
 */

(function(){

    /**
     * Selector for the container to render the rotating images
     * @type {String}
     */
    var containerSelector = '#rotator';

    /**
     * Array of artefacts used to compose rotating image slides.
     * @type {Array}
     */
    var slideContent = [];

    /**
     * Utils object handle.
     * @type {Utils}
     */
    var utils = new Utils();

    /**
     * Create slides
     * @return void
     */
    function createSlides() {

        // @todo: Load template from partials
        var markup = '',
            tpl = '<div class="">'+
                '<img src="{{imgSrc}}" />'+
                '<div class="title-bar"><p>{{title}}</p><p>{{desc}}</p></div>'+
                '</div>';
        for(var i = 0; i < slideContent.length; i++) {
            markup+= utils.template(tpl, slideContent[i]);
        }

        var container = document.querySelector(containerSelector);
        container.innerHTML = markup;
    }

    /**
     * Generates and stores image rotating slides content in the slideContent variable.
     * @return void
     */
    function generateSlideContent() {

        var titles = document.querySelectorAll('h4'); // Grab all titles

        if(titles.length) {
            for(var i = 0; i < titles.length; i++) { // For each title,
                var description = titles[i].nextElementSibling;
                var imageSrc = description.nextElementSibling.src;

                slideContent.push({
                    desc: description.textContent,
                    imgSrc: imageSrc,
                    title: titles[i].textContent
                });
            }
        }

    }

    generateSlideContent();
    createSlides();

})();