slick = require('slick-carousel-browserify');

module.exports = function () {

    function init () {

        $('.featured-items__list').each(function (i, list) {

            slick($(this), {

                autoplay: 	false,
                arrows: 	true,
                dots: 		true,
                speed: 		300,

                prevArrow: '<button type="button" class="slick-prev"><img src="/wp-content/themes/capetown.travel-2016/images/slick-slider/arrow-left.svg"></button>',
                nextArrow: '<button type="button" class="slick-next"><img src="/wp-content/themes/capetown.travel-2016/images/slick-slider/arrow-right.svg"></button>',

                // Default
                slidesToShow: $(this).data('default-show'),
                slidesToScroll: $(this).data('default-scroll'),

                adaptiveHeight: true,

                responsive: [
                    {
                        // Large device
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 	$(this).data('lg-show'),
                            slidesToScroll: $(this).data('lg-scroll'),
                            arrows: 		true,
                        }
                    },
                    {
                        // Medium device
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 	$(this).data('md-show'),
                            slidesToScroll: $(this).data('md-scroll'),
                            arrows: 		true,
                        }
                    },
                    {
                        // Small device
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 	$(this).data('sm-show'),
                            slidesToScroll: $(this).data('sm-scroll'),
                            arrows: 		true,
                        }
                    },
                    {
                        // Extra small device
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 	$(this).data('xs-show'),
                            slidesToScroll: $(this).data('xs-scroll'),
                            arrows: 		true,
                        }
                    },
                ]
            });

        }); // each

        setTimeout(function () {
            setCardHeight();
        }, 3000);
        $(window).on('resize', setCardHeight);

    };

    var setCardHeight = function  () {
        $('.featured-items__list').each(function (i, list) {
            var titleHeight = 0;
            var descHeight = 0;


            $(list).find('.featured-items__list-item').each(function (j, item) {
                $(item).find('.featured-items__item-title').css({
                    'height':'auto',
                    'padding-top': 0,
                    'padding-bottom': 0
                });
                $(item).find('.featured-items__item-description').css({
                    'height':'auto',
                    'padding-top': 0,
                    'padding-bottom': 0
                });
                var itemTitleHeight = $(item).find('.featured-items__item-title').outerHeight(true);
                var itemDescHeight = $(item).find('.featured-items__item-description').outerHeight(true);

                if (itemTitleHeight > titleHeight) {
                    titleHeight = itemTitleHeight;
                }
                if (itemDescHeight > descHeight) {
                    descHeight = itemDescHeight;
                }
            });

            $(list).find('.featured-items__list-item').each(function (j, item) {
                var itemTitle = $(item).find('.featured-items__item-title');
                var itemDesc = $(item).find('.featured-items__item-description');


                // console.log({
                //     titleHeight: titleHeight,
                //     itemHeight: itemTitle.outerHeight(true),
                //     sum: ((titleHeight - itemTitle.outerHeight(true)) / 2)
                // });


                itemTitle.css({
                    'padding-top': ((titleHeight - itemTitle.outerHeight(true)) / 2) + 'px',
                    'padding-bottom': ((titleHeight - itemTitle.outerHeight(true)) / 2) + 'px'
                });
                itemDesc.css({
                    'padding-top': ((descHeight - itemDesc.outerHeight(true)) / 2) + 'px',
                    'padding-bottom': ((descHeight - itemDesc.outerHeight(true)) / 2) + 'px'
                });

            });

        });
    };

    return {
        init: init
    }

}();
