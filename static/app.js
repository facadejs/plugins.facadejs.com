/*globals window, $, templates */

(function () {

    'use strict';

    var $search = $('.search'),
        query;

    $.get('/api/repos', function (data) {

        $('.content .wrapper').html(templates.list(data));

        if (window.location.search) {

            query = window.location.search.match(/q=([^&]+)/);

            if (query) {

                $search.val(query[1]).trigger('keyup');

            }

        }

    });

    $search.on('keyup', function () {

        query = new RegExp($(this).val().replace(/[\W]+/, '|'), 'gi');

        $('.repo').show().each(function () {

            var $this = $(this);

            if (!$this.text().match(query)) {

                $this.hide();

            }

        });

    });

}());
