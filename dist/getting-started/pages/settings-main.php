<?php
/**
 * Wrapper for main settings page.
 *
 * @package AtomicBlocks\Settings
 */

?>
<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

	<?php
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Nonce verified in settings save routine. This is a false positive.
	if ( ! empty( $_GET['atomic-blocks-settings-saved'] ) && $_GET['atomic-blocks-settings-saved'] === 'true' ) {
		echo '<div class="updated fade"><p>' . esc_html__( 'Settings saved.', 'atomic-blocks' ) . '</p></div>';
	}
	?>

	<form method="post" action="options.php" class="atomic-blocks-options-form">
			<?php
			require $pages_dir . 'settings-general.php';
			submit_button( esc_html__( 'Save Settings', 'atomic-blocks' ) );
			wp_nonce_field( 'atomic-blocks-settings-save-nonce', 'atomic-blocks-settings-save-nonce' );
			?>
	</form>
</div>
