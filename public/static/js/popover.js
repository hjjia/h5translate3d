/**
 * Created by Administrator on 2016/3/21.
 */
+function () {
    var Popover = function (element,options) {
        this.$element  = $(element)
        this.options   = options
    }

    Popover.DEFAULTS = {
        direction:"left",
        content:""
    }

    Popover.prototype.init = function () {
        var top            = 0
        var left           = 0
        var element_offset = this.$element.offset()

        $('.popover').empty()

        var $popover       = $('body').find('.popover')
        $popover.addClass(this.options.direction)

        $popover.addClass()

        var popover_height = $popover.height()
        var popover_width  = $popover.width()

        switch (this.options.direction){
            case 'left':
                top   = element_offset.top - (popover_height - this.$element.height() + 10)/2
                left  = element_offset.left - popover_width - 24
                break;
            case 'right':
                top   = element_offset.top - (popover_height - this.$element.height() + 10 )/2
                left  = element_offset.left + this.$element.width() + 14
                break;
            case 'top':
                top  = element_offset.top - popover_height - 10
                left = element_offset.left - (popover_width - this.$element.width() + 10) /2
                break;
            case 'bottom':
                top  = element_offset.top + this.$element.height() + 10
                left = element_offset.left - (popover_width - this.$element.width() + 10) /2
                break;
            case 'center':
            default :
                top  = ($(window).height() - popover_height)/2
                left = ($(window).width() - popover_width)/2
                break;
        }

        $popover.css({top:top,left:left});
        $popover.text(this.options.content)
    }

    function Plugin (option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.popover')
            var options = $.extend({},Popover.DEFAULTS,$this.data(),typeof option == 'object' && option)

            if(!data) $this.data('bs.popover',(data = new Popover(this,options)))

            data.init()
        })
    }

    var old = $.fn.popover

    $.fn.popover             = Plugin
    $.fn.popover.Constructor = Popover

    // CAROUSEL NO CONFLICT
    // ====================

    $.fn.popover.noConflict = function (){
        $.fn.popover = old
        return this
    }

    // CAROUSEL DATA-API
    // =================

    var clickHander = function (e) {
        //var href
        var $this = $(this)
        //var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''))// strip for ie7
        if($this.hasClass('popover')) return
        var options = $.extend({},$this.data())

        Plugin.call($this,options)

        $this.data('bs-popover').init()

        e.preventDefault()

    }

    $(document)
        .on('click.bs.popover.data-api','[data-ride]',clickHander)

    $(window).on('load', function () {
        $('[data-ride="popover"]').each(function () {
            var $popover = $(this)
            Plugin.call($popover,$popover.data())
        })
    })
}(jQuery)