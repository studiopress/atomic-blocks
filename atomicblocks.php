<?php
/**
 * Plugin Name: Atomic Blocks
 * Plugin URI: http://atomicblocks.com
 * Description: A beautiful collection of WordPress editor blocks to help you effortlessly build the website you've always wanted.
 * Author: atomicblocks
 * Author URI: http://arraythemes.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ATOMIC BLOCKS
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
function atomic_blocks_loader() {
	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';

	/**
	 * Load Getting Started page
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/getting-started/getting-started.php';

	/**
	 * Load plugin textdomain
	 */
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}
add_action( 'plugins_loaded', 'atomic_blocks_loader' );


/**
 * Initialize the blocks
 */
function atomic_blocks_init() {
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}
add_action( 'init', 'atomic_blocks_init' );


/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation
 */
function atomic_blocks_activate() {
	add_option( 'atomic_blocks_do_activation_redirect', true );
	
	if ( get_option( 'atomic_blocks_do_activation_redirect', false ) ) {
        delete_option( 'atomic_blocks_do_activation_redirect' );
        if( !isset( $_GET['activate-multi'] ) ) {
            wp_redirect( "admin.php?page=atomic-blocks" );
        }
    }
}
register_activation_hook( __FILE__, 'atomic_blocks_activate' );
