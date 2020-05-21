<?php
/**
 * Wrapper for main settings page.
 *
 * @package AtomicBlocks\Settings
 */

if ( atomic_blocks_is_pro() ) {
	$atomic_blocks_wrap_class    = 'wrap ab-getting-started gpb-getting-started';
	$atomic_blocks_plugin_name   = __( 'Genesis Pro', 'atomic-blocks' );
	$atomic_blocks_settings_name = __( 'Genesis Pro Settings', 'atomic-blocks' );
	$atomic_blocks_docs_link     = 'https://developer.wpengine.com/genesis-pro/genesis-page-builder/';
} else {
	$atomic_blocks_wrap_class    = 'wrap ab-getting-started';
	$atomic_blocks_plugin_name   = __( 'Atomic Blocks', 'atomic-blocks' );
	$atomic_blocks_settings_name = __( 'Atomic Blocks Settings', 'atomic-blocks' );
	$atomic_blocks_docs_link     = 'https://github.com/studiopress/atomic-blocks/wiki';
}

?>

<div class="<?php echo esc_attr( $atomic_blocks_wrap_class ); ?>">
	<div class="intro-wrap">
		<div class="intro">
			<?php if ( atomic_blocks_is_pro() ) { ?>
				<a href="<?php echo esc_url( 'https://studiopress.com' ); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( '../images/genesis-pro-logo.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit StudioPress', 'atomic-blocks' ); ?>" /></a>
			<?php } else { ?>
				<a href="https://atomicblocks.com"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( '../images/logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>
			<?php } ?>
			<h1><?php echo esc_html( $atomic_blocks_settings_name ); ?></h1>
		</div>

		<ul class="inline-list">

			<li class="atomic-blocks-settings-tab-general current">
				<a data-tab="general" href="#general">
					<i class="fa fa-cog"></i> <?php esc_html_e( 'General Settings', 'atomic-blocks' ); ?>
				</a>
			</li>

			<?php do_action( 'atomic_blocks_settings_tabs' ); ?>

		</ul>
	</div>

	<div class="panels">
		<div id="panel" class="panel">
			<div id="atomic-blocks-settings" class="panel-left visible">
				<?php
				// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Nonce verified in settings save routine. This is a false positive.
				if ( ! empty( $_GET['atomic-blocks-settings-saved'] ) && $_GET['atomic-blocks-settings-saved'] === 'true' ) {
					echo '<div class="updated fade"><p>' . esc_html__( 'Settings saved.', 'atomic-blocks' ) . '</p></div>';
				}
				?>

				<form method="post" action="options.php" class="atomic-blocks-options-form">
						<?php
						/**
						 * Used to add settings fields to the settings page.
						 *
						 * @private For internal use only. This hook will
						 * go away in the near future. Please do not use it.
						 */
						do_action( 'atomic_blocks_settings_page_top' );

						require $pages_dir . 'settings-general.php';

						/**
						 * Used to add settings fields to the settings page.
						 *
						 * @private For internal use only. This hook will
						 * go away in the near future. Please do not use it.
						 */
						do_action( 'atomic_blocks_settings_page_bottom' );

						submit_button( esc_html__( 'Save Settings', 'atomic-blocks' ) );
						wp_nonce_field( 'atomic-blocks-settings-save-nonce', 'atomic-blocks-settings-save-nonce' );
						?>
				</form>
			</div><!-- .panel-left -->

			<div class="panel-right">
				<div class="panel-aside panel-ab-plugin panel-club">
					<div class="panel-club-inside">
						<div class="cell panel-title">
							<h3><i class="fa fa-plug"></i> <?php esc_html_e( 'Plugin Documentation', 'atomic-blocks' ); ?></h3>
						</div>

						<ul>
							<li class="cell">
								<p>
									<?php
									/* translators: %1$s: conditional name of plugin */
									echo sprintf( esc_html__( 'Check out the %1$s documentation for feature and setting explanations, advanced usage, and code examples.', 'atomic-blocks' ), esc_attr( $atomic_blocks_plugin_name ) );
									?>
								</p>
								<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( $atomic_blocks_docs_link ); ?>"><?php esc_html_e( 'View Documentation', 'atomic-blocks' ); ?> &rarr;</a>
							</li>
						</ul>
					</div>
				</div>

				<?php do_action( 'atomic_blocks_settings_page_panel_right' ); ?>

			</div><!-- .panel-right -->
		</div><!-- .panel -->
	</div><!-- .panels -->
</div><!-- .getting-started -->
