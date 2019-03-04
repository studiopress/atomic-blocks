<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package Atomic Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function atomic_blocks_block_assets() {

	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	// Load the compiled styles
	wp_register_style(
		'atomic-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.build.css' )
	);
}
add_action( 'init', 'atomic_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function atomic_blocks_editor_assets() {

	// Load the compiled blocks into the editor
	wp_enqueue_script(
		'atomic-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' , 'wp-components' , 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.build.js' )
	);

	// Load the compiled styles into the editor
	wp_enqueue_style(
		'atomic-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.build.css' )
	);

	// Pass in REST URL
	wp_localize_script(
		'atomic-blocks-block-js',
		'atomic_globals',
		array(
			'rest_url' => esc_url( rest_url() )
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'atomic_blocks_editor_assets' );


/**
 * Enqueue assets for frontend
 *
 * @since 1.0.0
 */
function atomic_blocks_frontend_assets() {
	// Load the dismissable notice js
	wp_enqueue_script(
		'atomic-blocks-dismiss-js',
		plugins_url( '/dist/assets/js/dismiss.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/dismiss.js' )
	);
}
add_action( 'wp_enqueue_scripts', 'atomic_blocks_frontend_assets' );


// Add custom block category
add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'atomic-blocks',
				'title' => __( 'Atomic Blocks', 'atomic-blocks' ),
			),
		)
	);
}, 10, 2 );