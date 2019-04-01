function AddBasketGoods(goods_id, min, max, step) {
    min = parseFloat(min.replace(",", "."));
    var stack_topleft = {"dir1": "down", "dir2": "right", "push": "top"};

    $input = $('#goods_' + goods_id + ' .js-quantity');
    var quantity = parseFloat($input.val().replace(",", "."));
    if (isNaN(quantity) || quantity < min) {
        quantity = min;
    }
    var $btn = $('#goods_' + goods_id + ' .js-cart__btn');

    if ($btn.hasClass('js-cart__btn_none')) {
        $.pnotify({
            text: 'Товара нет в наличии',
            title: 'Внимание',
            type: 'success',
            delay: 2000,
            closer: true,
            icon: 'glyphicon glyphicon-ok',
            addclass: "stack-topleft",
            stack: stack_topleft
        });
        return false;
    }

    $.ajax({
        url: '[[link:shop_cart_goods?action=add]]',
        type: 'POST',
        data: {id: goods_id, quantity: quantity},
        success: function (response) {
            if (!$btn.hasClass('js-cart__btn_in')) {
                $btn.addClass('js-cart__btn_in');
            }

            $.magnificPopup.open({
                items: {
                    src: response.html,
                    type: 'inline'
                }
            });


            $('.js-cart-click__update').click();

        },
        error: function () {
            alert("Ошибка сервера");
        }
    });


    return false;
}

$(function () {

    $('.js-image-popup').magnificPopup({
        type: 'image',
        image: {
            titleSrc: 'title'
        }
    });

    $('.js-gallery').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            },
            callbacks: {
                buildControls: function () {
                    if (this.arrowLeft)
                        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                }
            }
        });
    });

    $('.js-video').magnificPopup({
        type: 'iframe',

        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                    // Or null - full URL will be returned
                    // Or a function that should return %id%, for example:
                    // id: function(url) { return 'parsed id'; }

                    src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
            },
            srcAction: 'iframe_src',
        }


    });

});

