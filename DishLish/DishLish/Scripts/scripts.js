$(document).ready(function () {
    $(".main").onepage_scroll({
        sectionContainer: "section",
        easing: "ease",

        animationTime: 1000,
        pagination: true,
        updateURL: false,
        beforeMove: function (index) { },
        afterMove: function (index) { },
        loop: false,
        keyword: true,
        responsiveFallback: false,

        direction: "vertical"
    });

    $('#search').on('keyup', function () {
        var pattern = $(this).val();
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function () {
            return $(this).text().match(new RegExp(pattern, 'i'));
        }).show();
    });
});