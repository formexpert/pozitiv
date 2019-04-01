$(function () {


    $('.js-image').magnificPopup({
        type: 'image',
        image: {
            titleSrc: 'title'
        }
    });


    $('[data-href]').click(function () {
        $href = $(this).data('href');
        window.location.href = $href;
    });

    $().UItoTop({easingType: 'easeOutQuart'});

    df.delegate('.js-popup', 'click', function (e) {
        e.preventDefault();
        var $a = $(this);
        var $id = $a.attr('href');
        window.__click = $a.data('click');

        $.magnificPopup.open({
            items: {
                src: $id,
                type: 'inline'
            },
            midClick: true
        });
    });

    $(".js-mask-phone").mask("8 999 999 99 99");

    $('.js-menu-sub a').click(function () {

        if ($('.b-menu-sub').hasClass('active')) {
            $('.b-menu-sub').removeClass('active');
            $(this).parent('.js-menu-sub').removeClass('active');
        } else {
            $('.b-menu-sub').addClass('active');
            $(this).parent('.js-menu-sub').addClass('active');
        }


    });


});