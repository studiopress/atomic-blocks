<?php
/**
 * Migrate Page
 *
 * @package Atomic Blocks
 */

/**
 * Load Migrate Page styles in the admin
 *
 * @since 1.0.0
 * @param string $hook The current admin page.
 */
function atomic_blocks_migrate_load_admin_scripts( $hook ) {
	if ( 'atomic-blocks_page_atomic-blocks-migrate-page' !== $hook ) {
		return;
	}

	/**
	 * Load scripts and styles
	 *
	 * @since 1.0
	 */

	// Migrate Page styles.
	wp_register_style( 'atomic-blocks-migrate', plugins_url( '/migrate-page/ab-migrate.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'atomic-blocks-migrate' );
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_migrate_load_admin_scripts' );

/**
 * Adds a submenu item for the Migrate Page under the Atomic Blocks top level menu.
 *
 * @since 1.0.0
 */
function atomic_blocks_migrate_menu() {

	add_submenu_page(
		'atomic-blocks',
		esc_html__( 'Migrate', 'atomic-blocks' ),
		esc_html__( 'Migrate', 'atomic-blocks' ),
		'install_plugins',
		'atomic-blocks-migrate-page',
		'atomic_blocks_migrate_page'
	);

}
add_action( 'admin_menu', 'atomic_blocks_migrate_menu', 11 );

/**
 * Outputs the markup used on the Migrate Page
 *
 * @since 1.0.0
 */
function atomic_blocks_migrate_page() {

	$this_dir = trailingslashit( dirname( __FILE__ ) );

	include $this_dir . 'ab-migrate.php';

}
