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

(function () {

    "use strict";

    /**
     * Deveo Fit plugin
     * @param {Object} container The targeted DOM element
     * @param {Object} settings  The settings to initialize the plugin with
     * @constructor
     */
    var Fit = function (container, settings) {
        this.container = $(container);
        this.settings  = settings;

        this.init();
    };

    /**
     * The default plugin settings that get overridden by user options
     * @type {Object}
     */
    Fit.DEFAULTS = {
        selector: '.item'
    };

    /**
     * Initialize the plugin and its event bindings
     */
    Fit.prototype.init = function () {
        $(window).on('resize.deveo.fit', $.proxy(this.refit, this));

        this.reset();
    };

    /**
     * Reload items from the DOM, reset item values, and refit items to
     * container
     */
    Fit.prototype.reset = function () {
        this.items      = this.getItems();
        this.margin     = this.margin     || this.settings.margin     || this.getMargin();
        this.minWidth   = this.minWidth   || this.settings.minWidth   || this.items.outerWidth();
        this.itemHeight =                    this.settings.itemHeight || this.getItemHeight();

        this.refit();
    };

    /**
     * Refit items to container
     */
    Fit.prototype.refit = function () {
        this.resetMargins();
        this.recalculateRowSizeAndItemWidth();
        this.adjustItems();
    };

    /**
     * Destroy the plugin and remove event bindings
     */
    Fit.prototype.destroy = function () {
        $(window).off('resize.deveo.fit');

        this.container.removeData('plugin');
    };

    /**
     * Load items from the DOM
     * @return {Array} The items as DOM elements
     */
    Fit.prototype.getItems = function () {
        return this.container.find(this.settings.selector);
    };

    /**
     * Get the combined (left and right) margin of an item
     * @return {Number} The combined margin in pixels
     */
    Fit.prototype.getMargin = function () {
        return this.items.outerWidth(true) - this.items.outerWidth();
    };

    /**
     * Reset margins of all items
     */
    Fit.prototype.resetMargins = function () {
        this.items.css({
            marginLeft:  this.margin,
            marginRight: 0
        });
    };

    /**
     * Recalculate and set container row size and item width
     */
    Fit.prototype.recalculateRowSizeAndItemWidth = function () {
        var containerWidth = this.getContainerWidth();

        this.rowSize = calculateRowSize(
            containerWidth, this.minWidth, this.margin);

        this.itemWidth = calculateItemWidth(
            containerWidth, this.rowSize, this.margin);
    };

    /**
     * Get the width of the container
     * @return {Number} The width in pixels
     */
    Fit.prototype.getContainerWidth = function () {
        // We need to remove the width property entirely and set it again in
        // pixels as Chrome calculates percentage values unexpectedly.
        return this.container
            .width('')
            .width(this.container.width())
            .width();
    };

    /**
     * Get the height of the highest item
     * @return {Number} The height in pixels
     */
    Fit.prototype.getItemHeight = function () {
        return Math.max.apply(null, this.items.map(function () {
            return $(this).outerHeight();
        }).get());
    };

    /**
     * Adjust the width and left margin of items so that they fit nicely on rows
     */
    Fit.prototype.adjustItems = function () {
        var that = this;

        $.each(this.items, function (index) {
            var self = $(this).css({
                width:  that.itemWidth,
                height: that.itemHeight
            });

            if (index % that.rowSize === 0) {
                self.css('marginLeft', 0);
            }
        });
    };

    /**
     * Calculate row size
     * @param  {Number} containerWidth The pixel width of the container
     * @param  {Number} minWidth       The minimum item width in pixels
     * @param  {Number} margin         The margin between items in pixels
     * @return {Number}                The number of items that'll fit on the
     *                                 same row
     */
    function calculateRowSize (containerWidth, minWidth, margin) {
        var rowSize     = Math.floor(containerWidth / minWidth),
            totalMargin = calculateMargin(rowSize, margin),
            spaceTaken  = (minWidth * rowSize) + totalMargin;

        return spaceTaken > containerWidth ? rowSize - 1 : rowSize;
    }

    /**
     * Calculate item width
     * @param  {Number} containerWidth The pixel width of the container
     * @param  {Number} rowSize        The number of items per row
     * @param  {Number} margin         The margin between items in pixels
     * @return {Number}                The item width in pixels
     */
    function calculateItemWidth (containerWidth, rowSize, margin) {
        var totalMargin = calculateMargin(rowSize, margin),
            totalWidth  = containerWidth - totalMargin,
            itemWidth   = totalWidth / rowSize;

        return widthToPercentage(itemWidth, containerWidth);
    }

    /**
     * Calculate total margin for the given row size
     * @param  {Number} rowSize The number of items per row
     * @param  {Number} margin  The margin between items in pixels
     * @return {Number}         The total margin per row in pixels
     */
    function calculateMargin (rowSize, margin) {
        return (rowSize - 1) * margin;
    }

    /**
     * Convert pixel width to percentage
     * @param  {Number} width  The width to compare in pixels
     * @param  {Number} within The width to compare to in pixels
     * @return {String}        A percentage String, e.g. 13.37%
     */
    function widthToPercentage (width, within) {
        return width / within * 100 + '%';
    }

    /**
     * Initialize and store a new instance of the plugin to the target element
     * @param  {Object} container The targeted DOM element
     * @param  {Object} options   The options to initialize the plugin with
     * @return {Object}           The initialized plugin
     */
    function initializePlugin (container, options) {
        var plugin = new Fit(container, getSettings(options));

        $(container).data('plugin', plugin);

        return plugin;
    }

    /**
     * Get the stored plugin or initialize a new one
     * @param  {Object} container The targeted DOM element
     * @return {Object}           The plugin instance
     */
    function getPlugin (container) {
        return $(container).data('plugin') || initializePlugin(container);
    }

    /**
     * Get settings for new instances of the plugin
     * @param  {Object} options The user given options that will override plugin
     *                          defaults
     * @return {Object}         The outcome of user options and plugin defaults
     */
    function getSettings (options) {
        return $.extend({}, Fit.DEFAULTS, options);
    }

    /**
     * Public plugin methods
     * @type {Object}
     */
    var methods = {
        fit:     Fit.prototype.refit,
        reset:   Fit.prototype.reset,
        destroy: Fit.prototype.destroy
    };

    $.fn.fit = function (methodOrOptions) {
        return this.each(function () {
            var type = typeof methodOrOptions;
            if (type === 'undefined' || type === 'object') {
                initializePlugin(this, methodOrOptions);
            } else if (type === 'string') {
                var plugin = getPlugin(this),
                    method = methods[methodOrOptions];

                method ? method.apply(plugin) :
                    $.error('Method ' + methodOrOptions + ' does not exist.');
            }
        });
    };

})();
