<?php
/**
 * Plugin Name: Atomic Blocks - Gutenberg Blocks Collection
 * Plugin URI: https://atomicblocks.com
 * Description: A beautiful collection of handy Gutenberg blocks to help you get started with the new WordPress editor.
 * Author: atomicblocks
 * Author URI: http://atomicblocks.com
 * Version: 2.9.0
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
 * To ensure no conflicts with Atomic Blocks, we check to see
 * if this function exists before bootstrapping the rest
 * of the plugin.
 *
 * Why? Example: Atomic Blocks Pro bundles the free Atomic Blocks
 * inside lib/atomic-blocks. If someone programmatically installs
 * Atomic Blocks via wp-cli, or something like Genesis OCTS, there's
 * a chance WordPress will include the AB plugin file and cause a
 * PHP fatal error due to functions already being declared.
 * This simple check prevents the fatal error from happening
 * and only loads the rest of the plugin when it's safe.
 */
if ( ! function_exists( 'atomic_blocks_main_plugin_file' ) ) {
	/**
	 * Returns the full path and filename of the main Atomic Blocks plugin file.
	 *
	 * @return string
	 */
	function atomic_blocks_main_plugin_file() {
		return __FILE__;
	}

	// Load the rest of the plugin.
	require_once plugin_dir_path( __FILE__ ) . 'loader.php';
}
