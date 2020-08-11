$(function () {
    $.fn.menu_favorite = function (options) {
        var MenuFavorite = function ($this, options) {
            this.$this = $this;
            this.options = options;
        }

        MenuFavorite.prototype.before_send_post = function (xhr, settings) {
            var csrftoken = $("input[name='csrfmiddlewaretoken']").val();
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }

        MenuFavorite.prototype.post_done = function (data, text, xhr) {
            if (data.status === true) {
                location.reload(true);
            }
        }

        MenuFavorite.prototype.post_fail = function (xhr) {
            console.log(xhr);
        }

        MenuFavorite.prototype.request = function () {
            return $.ajax({
                type: "POST",
                url: this.$this.data('ajax-url'),
                data: this.options.data || {},
                dataType: "json",
                beforeSend: this.before_send_post,
            }).done($.proxy(this.post_done, this)).fail($.proxy(this.post_fail, this));
        }

        //action bind
        MenuFavorite.prototype.bind_click = function () {
            this.$this.click($.proxy(this.request, this));
        }

        if (!this.data('menu_favorite')) {
            this.data('menu_favorite', new MenuFavorite(this, options));
        }
        return this.data('menu_favorite');
    }
})
;