<?php
/**
 * Plugin Name: LSX Blocks
 * Plugin URI: https://www.lsdev.biz/
 * Description: !!!  A beautiful collection of handy Gutenberg blocks to help you get started with the new WordPress editor.
 * Author: lightspeed
 * Author URI: https://www.lsdev.biz/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package LSX BLOCKS
 */


/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Initialize the blocks
 */
function lsx_blocks_loader() {
	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';

	/**
	 * Load Getting Started page
	 */
	//require_once plugin_dir_path( __FILE__ ) . 'dist/getting-started/getting-started.php';

	/**
	 * Load Social Block PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/block-sharing/index.php';

	/**
	 * Load Post Grid PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/block-post-grid/index.php';
}
add_action( 'plugins_loaded', 'lsx_blocks_loader' );


/**
 * Load the plugin textdomain
 */
function lsx_blocks_init() {
	load_plugin_textdomain( 'lsx-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'lsx_blocks_init' );


/**
 * Add a check for our plugin before redirecting
 */
// function lsx_blocks_activate() {
// 	add_option( 'lsx_blocks_do_activation_redirect', true );
// }
// register_activation_hook( __FILE__, 'lsx_blocks_activate' );


/**
 * Redirect to the LSX Blocks Getting Started page on single plugin activation
 */
// function lsx_blocks_redirect() {
//     if ( get_option( 'lsx_blocks_do_activation_redirect', false ) ) {
//         delete_option( 'lsx_blocks_do_activation_redirect' );
//         if( !isset( $_GET['activate-multi'] ) ) {
//             wp_redirect( "admin.php?page=lsx-blocks" );
//         }
//     }
// }
//add_action( 'admin_init', 'lsx_blocks_redirect' );


/**
 * Add image sizes
 */
function lsx_blocks_image_sizes() {
	// Post Grid Block
	add_image_size( 'lsx-block-post-grid-landscape', 600, 400, true );
	add_image_size( 'lsx-block-post-grid-square', 600, 600, true );
}
add_action( 'after_setup_theme', 'lsx_blocks_image_sizes' );
