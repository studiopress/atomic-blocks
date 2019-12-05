<?php
/**
 * Wrapper for main settings page.
 *
 * @package AtomicBlocks\Settings
 */

?>

<div class="wrap ab-getting-started">
	<div class="intro-wrap">
		<div class="intro">
			<a href="https://atomicblocks.com"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( '/logo.png', __DIR__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		</div>

		<ul class="inline-list">

			<li id="atomic-blocks-settings-tab-general" class="current">
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
						require $pages_dir . 'settings-general.php';
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
								<p><?php esc_html_e( 'Check out the Atomic Blocks documentation for feature and setting explanations, advanced usage, and code examples.', 'atomic-blocks' ); ?></p>
								<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( 'https://github.com/studiopress/atomic-blocks/wiki' ); ?>"><?php esc_html_e( 'View Documentation', 'atomic-blocks' ); ?> &rarr;</a>
							</li>
						</ul>
					</div>
				</div>

				<?php do_action( 'atomic_blocks_settings_page_panel_right' ); ?>

			</div><!-- .panel-right -->
		</div><!-- .panel -->
	</div><!-- .panels -->
</div><!-- .getting-started -->
