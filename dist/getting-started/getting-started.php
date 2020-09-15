<?php
/**
 * Getting Started page
 *
 * @package Atomic Blocks
 */

/**
 * Load Getting Started styles in the admin
 *
 * @since 1.0.0
 * @param string $hook The current admin page.
 */
function atomic_blocks_start_load_admin_scripts( $hook ) {

	if ( ! in_array( $hook, [ 'genesis-blocks_page_atomic-blocks-plugin-settings', 'page-builder_page_atomic-blocks-plugin-settings', 'toplevel_page_atomic-blocks' ], true ) ) {
		return;
	}

	// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison -- Could be true or 'true'.
	$postfix = ( SCRIPT_DEBUG == true ) ? '' : '.min';

	/**
	 * Load scripts and styles
	 *
	 * @since 1.0
	 */

	// Getting Started javascript.
	wp_enqueue_script( 'atomic-blocks-getting-started', plugins_url( 'getting-started/getting-started.js', dirname( __FILE__ ) ), array( 'jquery' ), '1.0.0', true );

	// Getting Started styles.
	wp_register_style( 'atomic-blocks-getting-started', plugins_url( 'getting-started/getting-started.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'atomic-blocks-getting-started' );
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_start_load_admin_scripts' );

/**
 * Adds a menu item for the Getting Started page.
 *
 * @since 1.0.0
 */
function atomic_blocks_getting_started_menu() {

	$page_title = esc_html__( 'Atomic Blocks Settings', 'atomic-blocks' );
	$menu_title = esc_html__( 'Atomic Blocks', 'atomic-blocks' );
	$icon_url   = 'dashicons-screenoptions';

	if ( atomic_blocks_is_pro() ) {
		$page_title = esc_html__( 'Genesis Blocks Pro Settings', 'atomic-blocks' );
		$menu_title = esc_html__( 'Genesis Blocks', 'atomic-blocks' );
		$icon_url   = esc_url( plugins_url( '/dist/getting-started/images/genesis-menu.png', atomic_blocks_main_plugin_file() ) );
	}

	add_menu_page(
		$page_title,
		$menu_title,
		'manage_options',
		'atomic-blocks',
		'atomic_blocks_getting_started_page',
		$icon_url
	);

	add_submenu_page(
		'atomic-blocks',
		esc_html__( 'Getting Started', 'atomic-blocks' ),
		esc_html__( 'Getting Started', 'atomic-blocks' ),
		'manage_options',
		'atomic-blocks',
		'atomic_blocks_getting_started_page'
	);

	add_submenu_page(
		'atomic-blocks',
		$page_title,
		esc_html__( 'Settings', 'atomic-blocks' ),
		'manage_options',
		'atomic-blocks-plugin-settings',
		'atomic_blocks_render_settings_page'
	);

}
add_action( 'admin_menu', 'atomic_blocks_getting_started_menu' );

/**
 * Add inline style for menu icon.
 */
add_action(
	'admin_enqueue_scripts',
	function() {
		if ( ! atomic_blocks_is_pro() ) {
			return;
		}

		$font_url = plugins_url( 'assets/genesis-font/', __DIR__ );
		$eot      = $font_url . 'genesis-icon.eot?#iefix';
		$woff     = $font_url . 'genesis-icon.woff';
		$ttf      = $font_url . 'genesis-icon.ttf';
		$svg      = $font_url . 'genesis-icon.svg#genesis-icon';

		?>
	<style>
		@font-face {
			font-family: "genesis-icon";
			font-weight: normal;
			font-style: normal;
			src: url("../assets/genesis-font/genesis-icon.eot");
			src:
				url("<?php echo esc_url( $eot ); ?>") format("embedded-opentype"),
				url("<?php echo esc_url( $woff ); ?>") format("woff"),
				url("<?php echo esc_url( $ttf ); ?>") format("truetype"),
				url("<?php echo esc_url( $svg ); ?>") format("svg");
		}

		#adminmenu .toplevel_page_atomic-blocks .wp-menu-image img {
			width: 16px;
			height: 16px;
		}

		#adminmenu .toplevel_page_atomic-blocks .wp-menu-image img {
			display: none;
		}

		#adminmenu .toplevel_page_atomic-blocks .wp-menu-image::before {
			font-family: "genesis-icon" !important;
			content: "\e600";
		}
	</style>
		<?php
	}
);

/**
 * Outputs the markup used on the Getting Started
 *
 * @since 1.0.0
 */
function atomic_blocks_getting_started_page() {

	$pages_dir = trailingslashit( dirname( __FILE__ ) ) . 'pages/';

	if ( atomic_blocks_is_pro() ) {
		include $pages_dir . 'gpb-getting-started.php';
	} else {
		include $pages_dir . 'ab-getting-started.php';
	}
}

/**
 * Renders the plugin settings page.
 */
function atomic_blocks_render_settings_page() {

	$pages_dir = trailingslashit( dirname( __FILE__ ) ) . 'pages/';

	include $pages_dir . 'settings-main.php';
}

add_action( 'admin_init', 'atomic_blocks_save_settings' );

/**
 * Saves the plugin settings.
 */
function atomic_blocks_save_settings() {

	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated,WordPress.Security.ValidatedSanitizedInput.MissingUnslash,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Handled below.
	if ( empty( $_POST['atomic-blocks-settings'] ) ) {
		return;
	}

	if ( empty( $_POST['atomic-blocks-settings-save-nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['atomic-blocks-settings-save-nonce'] ) ), 'atomic-blocks-settings-save-nonce' ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated,WordPress.Security.ValidatedSanitizedInput.MissingUnslash,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Handled below.
	$posted_settings = $_POST['atomic-blocks-settings'];

	/**
	 * Process the Mailchimp API key setting.
	 */
	if ( ! empty( $posted_settings['mailchimp-api-key'] ) ) {
		update_option( 'atomic_blocks_mailchimp_api_key', sanitize_text_field( wp_unslash( $posted_settings['mailchimp-api-key'] ) ), false );
	} else {
		delete_option( 'atomic_blocks_mailchimp_api_key' );
	}

	/**
	 * Clear the MailChimp list cache.
	 */
	delete_transient( 'atomic_blocks_mailchimp_lists' );

	/**
	 * Trigger an event to let integrations save their settings.
	 */
	do_action( 'atomic_blocks_save_settings', $_POST );

	$redirect = remove_query_arg( 'atomic-blocks-settings-saved', wp_get_referer() );
	wp_safe_redirect( $redirect . '&atomic-blocks-settings-saved=true' );
	exit;
}

/**
 * Loads the settings page scripts.
 *
 * @param string $hook The current admin page.
 */
function atomic_blocks_load_settings_page_scripts( $hook ) {

	if ( ! in_array( $hook, [ 'genesis-blocks_page_atomic-blocks-plugin-settings', 'page-builder_page_atomic-blocks-plugin-settings', 'atomic-blocks_page_atomic-blocks-plugin-settings' ], true ) ) {
		return;
	}

	wp_enqueue_script( 'atomic-blocks-settings-page-scripts', plugins_url( 'getting-started/settings.js', __DIR__ ), array( 'jquery' ), '1.0.0', true );
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_load_settings_page_scripts' );

/**
 * Handles Ajax requests for the opt-in analytics toggle on the Getting Started page.
 */
add_action(
	'wp_ajax_atomic_blocks_pro_gs_analytics_toggle',
	function() {

		if ( ! isset( $_POST['atomic_blocks_pro_gs_analytics_toggle_nonce'] ) ) {
			return;
		}

		if ( ! current_user_can( 'manage_options' ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['atomic_blocks_pro_gs_analytics_toggle_nonce'] ) ), 'atomic_blocks_pro_gs_analytics_toggle' ) ) {
			wp_send_json_error( [ 'error' => esc_html__( 'Access denied.', 'atomic-blocks' ) ] );
		}

		if ( empty( $_POST['ab-pro-analytics-toggle-value'] ) ) {
			delete_option( 'genesis_page_builder_analytics_opt_in' );
		} else {
			update_option( 'genesis_page_builder_analytics_opt_in', true );
		}

		wp_send_json_success();
	}
);
