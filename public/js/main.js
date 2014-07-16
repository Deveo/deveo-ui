(function () {

    "use strict";

    /* jshint validthis: true */
    function loadMarkup () {
        var self = $(this),
            code = self.siblings('pre').find('code');

        code.text(self[0].outerHTML);
    }

    function noop () {
        event.preventDefault();
    }

    $('#section-button .button').each(loadMarkup);
    $('#section-dropdown .deveo-dropdown').dropdown().each(loadMarkup);

    $('.button').click(noop);

})();
