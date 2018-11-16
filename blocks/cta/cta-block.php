<?php
/*
 * BLOCK: CTA
 *
 * LSX Blocks assets.
 *
 * @since   1.0.0
 * @package GB
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function lsx_cta_editor_block_assets() {
	// Scripts.
	wp_enqueue_script(
		'cta-block-basic', // Handle.
		plugins_url( 'cta-block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'cta-block.js' ) // filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'cta-block-basic-editor', // Handle.
		plugins_url( 'cta-editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'cta-editor.css' ) // filemtime — Gets file modification time.
	);
} // End function lsx_cta_editor_block_assets().
// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'lsx_cta_editor_block_assets' );


/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function lsx_cta_block_assets() {
	// Styles.
	wp_enqueue_style(
		'cta-block-basic-frontend', // Handle.
		plugins_url( 'cta-style.css', __FILE__ ), // Block frontend CSS.
		array( 'wp-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'cta-editor.css' ) // filemtime — Gets file modification time.
	);
} // End function lsx_cta_block_assets().
// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'lsx_cta_block_assets' );
