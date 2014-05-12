(function () {

    'use strict';

    $.get('/api/repos', function (data) {

        $('.content .wrapper').html(templates.list(data));

    });

    $('.search').on('keyup', function () {

        var query = new RegExp($(this).val().replace(/[\W]+/, '|'), 'gi');

        $('.repo').show().each(function () {

            var $this = $(this);

            if (!$this.text().match(query)) {

                $this.hide();

            }

        });

    });

}());
