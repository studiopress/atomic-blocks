<?php
/**
 * Plugin Name: Atomic Blocks - Gutenberg Blocks Collection
 * Plugin URI: https://atomicblocks.com
 * Description: A beautiful collection of handy Gutenberg blocks to help you get started with the new WordPress editor.
 * Author: atomicblocks
 * Author URI: http://arraythemes.com
 * Version: 1.5.3
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

	$atomic_blocks_includes_dir = plugin_dir_path( __FILE__ ) . 'includes/';
	$atomic_blocks_src_dir      = plugin_dir_path( __FILE__ ) . 'src/';
	$atomic_blocks_dist_dir     = plugin_dir_path( __FILE__ ) . 'dist/';

	/**
	 * Load the blocks functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';

	/**
	 * Load Getting Started page
	 */
	require_once plugin_dir_path( __FILE__ ) . 'dist/getting-started/getting-started.php';

	/**
	 * Load Social Block PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/block-sharing/index.php';

	/**
	 * Load Post Grid PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/block-post-grid/index.php';

	/**
	 * Load the newsletter block and related dependencies.
	 */
	if ( PHP_VERSION_ID >= 50600 ) {
		if ( ! class_exists( '\DrewM\MailChimp\MailChimp' ) ) {
			require_once $atomic_blocks_includes_dir . 'libraries/drewm/mailchimp-api/MailChimp.php';
		}

		require_once $atomic_blocks_includes_dir . 'exceptions/Newsletter_InvalidArgumentException.php';
		require_once $atomic_blocks_includes_dir . 'exceptions/API_Error_Exception.php';
		require_once $atomic_blocks_includes_dir . 'exceptions/Mailchimp_API_Error_Exception.php';
		require_once $atomic_blocks_includes_dir . 'interfaces/newsletter-provider-interface.php';
		require_once $atomic_blocks_includes_dir . 'classes/class-mailchimp.php';
		require_once $atomic_blocks_includes_dir . 'newsletter/newsletter-functions.php';
		require_once $atomic_blocks_src_dir . 'blocks/block-newsletter/index.php';
	}

	// @todo if php ver not met, load script to unregisterBlockType( 'atomic-blocks/newsletter' );
}
add_action( 'plugins_loaded', 'atomic_blocks_loader' );


/**
 * Load the plugin textdomain
 */
function atomic_blocks_init() {
	load_plugin_textdomain( 'atomic-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'atomic_blocks_init' );


/**
 * Add a check for our plugin before redirecting
 */
function atomic_blocks_activate() {
    add_option( 'atomic_blocks_do_activation_redirect', true );
}
register_activation_hook( __FILE__, 'atomic_blocks_activate' );


/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation
 */
function atomic_blocks_redirect() {
    if ( get_option( 'atomic_blocks_do_activation_redirect', false ) ) {
        delete_option( 'atomic_blocks_do_activation_redirect' );
        if( !isset( $_GET['activate-multi'] ) ) {
            wp_redirect( "admin.php?page=atomic-blocks" );
        }
    }
}
add_action( 'admin_init', 'atomic_blocks_redirect' );


/**
 * Add image sizes
 */
function atomic_blocks_image_sizes() {
	// Post Grid Block
	add_image_size( 'ab-block-post-grid-landscape', 600, 400, true );
	add_image_size( 'ab-block-post-grid-square', 600, 600, true );
}
add_action( 'after_setup_theme', 'atomic_blocks_image_sizes' );
