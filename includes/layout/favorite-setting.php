<?php

namespace Atomic_Blocks\Layouts;

$option_name = "ab_block_setting";

$layoutIds = array( 1, 2, 3 );

if( get_option( $option_name ) === false ) {
    update_option( $option_name, $layoutIds );
}

// $current_user = wp_get_current_user();
// add_user_meta( 1, 'ab_layout_favorites', 'test123' );
