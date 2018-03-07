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
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

	/**
	 * Register the custom post types. Still in development.
	 */
	// require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/testimonials.php';
	// require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/pricing-tables.php';
	// require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/team-members.php';

	/**
	 * Load plugin textdomain
	 */
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
}
add_action( 'plugins_loaded', 'atomic_blocks_loader' );