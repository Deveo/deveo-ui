(function () {

    "use strict";

    /**
     * Deveo Dropdown
     * @param {Object} element The targeted DOM element object
     * @constructor
     */
    var Dropdown = function (element) {
        this.element   = $(element);
        this.trigger   = this.element.find('.trigger');
        this.menu      = this.element.find('.menu');
        this.direction = this.element.hasClass('right') ? 'right' : 'left';

        this.init();
    };

    /**
     * Initialize the dropdown
     */
    Dropdown.prototype.init = function () {
        this.trigger.click($.proxy(this.toggle, this));
    };

    /**
     * Position the dropdown tip
     */
    Dropdown.prototype.positionTip = function () {
        var tip      = this.menu.find('.tip'),
            position = calculateTipPosition(this.trigger, tip, this.direction);

        tip.css(this.direction, position);
    };

    /**
     * Toggle the dropdown
     */
    Dropdown.prototype.toggle = function () {
        event.preventDefault();
        event.stopPropagation();

        closeAllBut(event.target);

        if (!this.element.hasClass('open')) {
            this.positionTip.call(this);
        }

        this.element.toggleClass('open');
    };

    /**
     * Close the dropdown
     */
    Dropdown.prototype.close = function () {
        this.element.removeClass('open');
    };

    /**
     * Calculate tip position based on dropdown direction
     * @param  {Object} trigger   The trigger to align the tip with
     * @param  {Object} tip       The tip to position
     * @param  {String} direction The direction of the dropdown
     * @return {Number}           The tip position
     */
    function calculateTipPosition (trigger, tip, direction) {
        return direction === 'right' ?
            calculateTipPositionRight(trigger) :
            calculateTipPositionLeft(trigger, tip);
    }

    /**
     * Calculate tip position for dropdowns that are aligned to right
     * @param  {Object} trigger The trigger to align the tip with
     * @return {Number}         The tip position
     */
    function calculateTipPositionRight (trigger) {
        var triggerWidth = trigger.outerWidth(),
            icon         = trigger.find('.icon-interaction-down'),
            iconLeft     = icon.position().left,
            iconWidth    = icon.width();

        return triggerWidth - (iconLeft + iconWidth) - (iconWidth / 2) - 2;
    }

    /**
     * Calculate tip position for dropdowns that are aligned to left
     * @param  {Object} trigger The trigger to align the tip with
     * @param  {Object} tip     The tip to position
     * @return {Number}         The tip position
     */
    function calculateTipPositionLeft (trigger, tip) {
        var icon      = trigger.find('.icon-interaction-down'),
            iconLeft  = icon.position().left,
            iconWidth = icon.width(),
            tipWidth  = tip.width();

        return iconLeft - (tipWidth / 2) + (iconWidth / 2);
    }

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
