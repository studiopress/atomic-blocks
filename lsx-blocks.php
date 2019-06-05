<?php
/**
 * Plugin Name: LSX Blocks
 * Plugin URI: https://www.lsdev.biz/
 * Description: This extension gives you a collection of handy Gutenberg blocks to help you get started with the new WordPress editor and have complete control over the appearance of your LSX-powered WordPress site
 * Author: lightspeed
 * Author URI: https://www.lsdev.biz/
 * Version: 1.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package LSX BLOCKS
 */

define( 'LSX_BLOCKS_VER', '1.0.0' );
define( 'LSX_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'LSX_BLOCKS_CORE', __FILE__ );
define( 'LSX_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load internals
require_once LSX_BLOCKS_PATH . 'classes/class-core.php';
$lsx_blocks = lsx\blocks\classes\Core::get_instance();
