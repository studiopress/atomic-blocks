<?php
/**
 * Getting Started content for Atomic Blocks
 *
 * @package Atomic Blocks
 */

?>

<div class="wrap ab-migrate">
	<div class="intro-wrap">
		<div class="intro">
			<a href="<?php echo esc_url( 'https://goo.gl/NfXcof' ); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( 'getting-started/images/logo.png', dirname( dirname( __FILE__ ) ) ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>
			<h1><?php printf( esc_html__( 'Get ready for', 'atomic-blocks' ) ); ?> <strong><?php printf( esc_html__( 'Genesis Blocks', 'atomic-blocks' ) ); ?></strong></h1>
		</div>
	</div>

	<div class="panels">
		<div id="panel" class="panel">
			<div id="atomic-blocks-panel" class="panel-left visible">
				<div class="ab-block-split clearfix">
					<div class="ab-block-split-left">
						<div class="ab-titles">
							<h2><?php esc_html_e( 'Atomic Blocks has moved!', 'atomic-blocks' ); ?></h2>
							<p>
								<?php
								/* translators: %1$s Genesis Pro website URL. */
								echo sprintf( esc_html__( 'Same powerful blocks, same beautiful designs, same innovative team. Atomic Blocks has been renamed to Genesis Blocks. %1$s', 'atomic-blocks' ), '<a href="https://studiopress.com/genesis-pro/">Learn more.</a>' );
								?>
							</p>
							<?php
							if ( version_compare( PHP_VERSION, '7.1' ) >= 0 ) {
								?>
								<p><?php esc_html_e( 'With our migration tool built right into Genesis Blocks, the transition between plugins will be simple and seamless - plus you\'ll be ready to receive the new blocks and features we\'re releasing soon.', 'atomic-blocks' ); ?></p>
								<button class="button-primary"><?php esc_html_e( 'Install Genesis Blocks', 'atomic-blocks' ); ?></button>
								<?php
							} else {
								?>
								<div class="migrate-error-message">
									<p><?php esc_html_e( 'Your server does not meet the minimum requirements for Genesis Blocks.', 'atomic-blocks' ); ?></p>
									<p><?php esc_html_e( 'In order to continue receiving the new blocks and new features we\'re working on, please update the following:', 'atomic-blocks' ); ?></p>
									<ul>
										<li>
											<?php
												// Translators: The version of PHP that the user has currently installed.
												$atomic_blocks_version_error_output = sprintf( __( 'Required PHP Version: PHP 7.1 (currently using PHP %s)', 'atomic-blocks' ), PHP_VERSION );
												echo esc_html( $atomic_blocks_version_error_output );
											?>
										</li>
									</ul>
								</div>
								<?php
							}
							?>
						</div>
					</div>
					<div class="ab-block-split-right">
						<div class="ab-block-theme">
							<img src="<?php echo esc_url( plugins_url( 'genesis_blocks_hero_Image.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Atomic Blocks Theme', 'atomic-blocks' ); ?>" />
						</div>
					</div>
				</div>
			</div>
		</div><!-- .panel -->
	</div><!-- .panels -->
</div><!-- .migrate -->
