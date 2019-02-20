var LSX_BLOCKS = Object.create( null );
;( function( $, window, document, undefined ) {

    'use strict';

    LSX_BLOCKS.document = $(document);

    //Holds the slider function
    LSX_BLOCKS.sliders = Object.create( null );

    /**
     * Start the JS Class
     */
    LSX_BLOCKS.init = function() {
        LSX_BLOCKS.sliders.element = jQuery('.lsx-block-post-carousel .slick-slider');
        if ( 0 <  LSX_BLOCKS.sliders.element.length ) {
            LSX_BLOCKS.sliders.init();
        }
    };

    /**
     * Initiate the Sliders
     */
    LSX_BLOCKS.sliders.init = function( ) {
        LSX_BLOCKS.sliders.element.each( function() {

            var slidesToShow = 3;
            var slidesToScroll = 3;
            var slickData = $(this).attr('data-slick');
            if ( undefined !== slickData) {

                if ( undefined !== slickData.slidesToShow ) {
                    slidesToShow = slickData.slidesToShow;
                }
                if ( undefined !== slickData.slidesToScroll ) {
                    slidesToScroll = slickData.slidesToScroll;
                }
            }

            $(this).slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: slidesToShow,
                            slidesToScroll: slidesToScroll,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        } );
    };

    /**
     * On document ready.
     *
     * @package    lsx-blocks
     * @subpackage scripts
     */
    LSX_BLOCKS.document.ready( function() {
        LSX_BLOCKS.init();
    } );

} )( jQuery, window, document );