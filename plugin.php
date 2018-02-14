<?php
/**
 * Plugin Name: Atomic Blocks
 * Plugin URI: http://atomicblocks.com
 * Description: A beautiful collection of WordPress editor blocks to help you effortlessly build the website you've always wanted.
 * Author: atomicblocks
 * Author URI: http://atomicblocks.com
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
function atomic_block_loader() {
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
}
add_action( 'init', 'atomic_block_loader' );


/**
 * Register the custom post types
 */
require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/testimonials.php';
require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/pricing-tables.php';
require_once plugin_dir_path( __FILE__ ) . 'src/custom-post-types/team-members.php';