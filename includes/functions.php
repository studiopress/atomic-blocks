<?php
/**
 * LSX Blocks Plugin functions.
 *
 * @package lsx-blocks
 */

/**
 * Adds text domain.
 */
function lsx_blocks_load_plugin_textdomain() {
	load_plugin_textdomain( 'lsx-blocks', false, basename( LSX_BLOCKS_PATH ) . '/languages' );
}
add_action( 'init', 'lsx_blocks_load_plugin_textdomain' );
