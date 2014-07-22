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

        closeAllBut(getDropdown(event.target));

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
     * Close all but the given dropdown
     * @param {Object} dropdown The dropdown that should not be closed
     */
    function closeAllBut (dropdown) {
        $('.dropdown.open').not(dropdown).dropdown('close');
    }

    /**
     * Close all open dropdowns
     */
    function closeAll () {
        $('.dropdown.open').dropdown('close');
    }

    /**
     * Determine which dropdowns to close when a click event occurs
     */
    function close () {
        var target   = event.target,
            dropdown = getDropdown(target);

        if (!dropdown || dropdown.length && isClosingElement(target)) {
            closeAll();
        } else {
            closeAllBut(dropdown);
        }
    }

    /**
     * Get a dropdown element for an element
     * @param  {Object} element The element to get a dropdown for
     * @return {Object}         A dropdown element or empty array if none was
     *                          found
     */
    function getDropdown (element) {
        element = $(element);
        return element.hasClass('dropdown') ?
               element :
               element.parents('.dropdown');
    }

    /**
     * Determine whether an element is of menu-closing type
     * @param  {Object}  element The element to check
     * @return {Boolean}         True if yes, false if no
     */
    function isClosingElement (element) {
        return $(element).is('a');
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
    $(document).click(close);

})();
