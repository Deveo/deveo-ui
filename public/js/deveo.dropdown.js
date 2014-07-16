(function () {

    "use strict";

    /**
     * Deveo Dropdown
     * @param {Object} element The targeted DOM element object
     * @constructor
     */
    var Dropdown = function (element) {
        this.element = $(element);
        this.trigger = this.element.find('.trigger');
        this.menu    = this.element.find('.menu');
        this.icon    = this.trigger.find('i:last');

        this.init();
    };

    /**
     * Initialize the dropdown
     */
    Dropdown.prototype.init = function () {
        this.trigger.click($.proxy(this.toggle, this));
    };

    /**
     * Toggle the dropdown
     */
    Dropdown.prototype.toggle = function () {
        event.preventDefault();
        event.stopPropagation();

        closeAllBut(event.target);

        this.element.toggleClass('open');
        this.icon.toggleClass('icon-interaction-down icon-interaction-up');
    };

    /**
     * Close the dropdown
     */
    Dropdown.prototype.close = function () {
        this.element.removeClass('open');
        this.icon.removeClass('icon-interaction-up').addClass('icon-interaction-down');
    };

    /**
     * Close all but the targeted dropdown
     * @param {Object} dropdown The targeted dropdown
     */
    function closeAllBut (dropdown) {
        dropdown = $(dropdown);
        dropdown =
            dropdown.hasClass('deveo-dropdown') ?
            dropdown :
            dropdown.parents('.deveo-dropdown');

        $('.deveo-dropdown.open').not(dropdown).dropdown('close');
    }

    /**
     * Close all dropdowns
     */
    function closeAll () {
        $('.deveo-dropdown.open').dropdown('close');
    }

    /**
     * Initialize and store a new instance of the dropdown to the target element
     * @param  {Object} element The targeted DOM element object
     * @return {Object}         The dropdown instance
     */
    function initializePlugin (element) {
        var plugin = new Dropdown(element);
        $(element).data('plugin', plugin);
        return plugin;
    }

    /**
     * Get the stored dropdown or initialize a new one
     * @param  {Object} element The targeted DOM element object
     * @return {Object}         The dropdown instance
     */
    function getPlugin (element) {
        return $(element).data('plugin') || initializePlugin(element);
    }

    $.fn.dropdown = function (method) {
        return this.each(function () {
            if (typeof method === 'string') {
                var plugin = getPlugin(this);
                plugin[method].apply(plugin);
            } else {
                initializePlugin(this);
            }
        });
    };

    // Close open dropdowns when clicking anywhere in the document
    $(document).click(closeAll);

})();
