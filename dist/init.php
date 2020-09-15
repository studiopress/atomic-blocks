<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
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

	// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison -- Could be true or 'true'.
	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	// Load the compiled styles.
	wp_register_style(
		'atomic-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.build.css' )
	);

	// Load the FontAwesome icon library.
	wp_enqueue_style(
		'atomic-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.css' )
	);
}
add_action( 'init', 'atomic_blocks_block_assets' );

/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function atomic_blocks_editor_assets() {

	// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison -- Could be true or 'true'.
	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	// Load the compiled blocks into the editor.
	wp_enqueue_script(
		'atomic-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.build.js' ),
		true
	);

	// Load the compiled styles into the editor.
	wp_enqueue_style(
		'atomic-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.build.css' )
	);

	// Load the FontAwesome icon library.
	wp_enqueue_style(
		'atomic-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.css' )
	);

	$user_data = wp_get_current_user();
	unset( $user_data->user_pass, $user_data->user_email );

	// Pass in REST URL.
	wp_localize_script(
		'atomic-blocks-block-js',
		'atomic_globals',
		array(
			'rest_url'      => esc_url( rest_url() ),
			'user_data'     => $user_data,
			'pro_activated' => atomic_blocks_is_pro(),
			'is_wpe'        => function_exists( 'is_wpe' ),
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

	if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
		return;
	}

	// Load the dismissible notice js.
	wp_enqueue_script(
		'atomic-blocks-dismiss-js',
		plugins_url( '/dist/assets/js/dismiss.js', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/dismiss.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'atomic_blocks_frontend_assets' );

add_filter( 'block_categories', 'atomic_blocks_add_custom_block_category' );
/**
 * Adds the Atomic Blocks block category.
 *
 * @param array $categories Existing block categories.
 *
 * @return array Updated block categories.
 */
function atomic_blocks_add_custom_block_category( $categories ) {
	$category_title = __( 'Atomic Blocks', 'atomic-blocks' );

	if ( atomic_blocks_is_pro() ) {
		$category_title = __( 'Genesis Blocks', 'atomic-blocks' );
	}

	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'atomic-blocks',
				'title' => $category_title,
			),
		)
	);
}

/**
 * Enqueue assets for settings page.
 *
 * @since 2.1.0
 */
function atomic_blocks_settings_enqueue() {

	if ( 'atomic-blocks_page_atomic-blocks-plugin-settings' === get_current_screen()->base ) {
		wp_register_style( 'atomic-blocks-getting-started', plugins_url( 'dist/getting-started/getting-started.css', __DIR__ ), false, '1.0.0' );
		wp_enqueue_style( 'atomic-blocks-getting-started' );

	}
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_settings_enqueue' );
