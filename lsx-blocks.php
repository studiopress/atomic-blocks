<?php
/*
 * Plugin Name:	LSX Blocks
 * Plugin URI:	https://github.com/lightspeeddevelopment/lsx-blocks
 * Description:	LSX Blocks Plugin for building LSX Gutenberg blocks extensions.
 * Author:		LightSpeed
 * Version: 	1.0.0
 * Author URI: 	https://www.lsdev.biz/
 * License: 	GPL3
 * Text Domain: lsx-blocks
 * Domain Path: /languages/
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

define( 'LSX_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'LSX_BLOCKS_CORE', __FILE__ );
define( 'LSX_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'LSX_BLOCKS_VER', '1.0.0' );

/* ======================= Below is the Plugin Class init ========================= */

require_once( LSX_BLOCKS_PATH . '/includes/functions.php' );

/**
 * BLOCKS
 */
// FAQ Block
require_once( LSX_BLOCKS_PATH . '/blocks/faq/faq-block.php' );

// CTA Block
require_once( LSX_BLOCKS_PATH . '/blocks/cta/cta-block.php' );
