<?php
/**
 * Getting Started content for GPB
 *
 * @package Atomic Blocks
 */

?>

	<div class="wrap ab-getting-started gpb-getting-started">
		<div class="intro-wrap">
			<div class="intro">
				<img class="atomic-logo" src="<?php echo esc_url( plugins_url( '../images/genesis-pro-logo.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit StudioPress', 'atomic-blocks' ); ?>" />
				<h1><?php printf( esc_html__( 'Getting started with', 'atomic-blocks' ) ); ?> <strong><?php printf( esc_html__( 'Genesis Pro', 'atomic-blocks' ) ); ?></strong></h1>
			</div>
		</div>

		<div class="panels">
			<div id="panel" class="panel">
				<div id="atomic-blocks-panel" class="panel-left visible">
					<div class="ab-block-split clearfix">
						<div class="ab-block-split-left">
							<div class="ab-titles">
								<h2><?php esc_html_e( 'Build and launch beautiful websites effortlessly.', 'atomic-blocks' ); ?></h2>
								<p><?php esc_html_e( 'Genesis Pro provides you with a complete collection of page building section and layout blocks. Mix and match pre-designed sections to create full pages or get a huge head start with full-page layouts. Join the future of site building today!', 'atomic-blocks' ); ?></p>
								<ul>
									<li><?php esc_html_e( 'Page Building Layouts', 'atomic-blocks' ); ?></li>
									<li><?php esc_html_e( 'Customizable Portfolios', 'atomic-blocks' ); ?></li>
									<li><?php esc_html_e( 'Block Setting Permissions', 'atomic-blocks' ); ?></li>
									<li><?php esc_html_e( 'Custom Layout Integration', 'atomic-blocks' ); ?></li>
								</ul>
							</div>
						</div>
						<div class="ab-block-split-right">
							<div class="ab-gs-feedback">
								<h3><?php esc_html_e( 'Help us improve!', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Please consider opting into anonymous usage tracking to help us make Genesis Pro better! We’ll use this anonymous data to improve usability, build better blocks, and add new features.', 'atomic-blocks' ); ?></p>
								<form>
									<?php $atomic_blocks_opt_in_value = get_option( 'genesis_page_builder_analytics_opt_in', false ); ?>
									<input type="radio" id="atomic-blocks-pro-analytics-opt-in-enabled" name="atomic-blocks-settings[analytics-opt-in]" value="1" <?php checked( $atomic_blocks_opt_in_value, true ); ?>>
									<label for="atomic-blocks-pro-analytics-opt-in-enabled"><?php esc_html_e( 'Enabled', 'atomic-blocks' ); ?></label>
									<br>
									<input type="radio" id="atomic-blocks-pro-analytics-opt-in-disabled" name="atomic-blocks-settings[analytics-opt-in]" value="0" <?php checked( $atomic_blocks_opt_in_value, false ); ?>>
									<label for="atomic-blocks-pro-analytics-opt-in-disabled"><?php esc_html_e( 'Disabled', 'atomic-blocks' ); ?></label>
									<p class="atomic-blocks-settings-description">
										<?php
											/* translators: %1$s WP Engine privacy policy link. */
											printf( esc_html__( 'Read our %1$s for more details.', 'atomic-blocks' ), '<a href="https://wpengine.com/legal/privacy/">' . esc_html__( 'privacy policy', 'atomic-blocks' ) . '</a>' );
										?>
									</p>
									<?php wp_nonce_field( 'atomic_blocks_pro_gs_analytics_toggle', 'atomic_blocks_pro_gs_analytics_toggle_nonce', false ); ?>
								</form>
							</div>
						</div>
					</div>

					<div class="ab-block-feature-wrap clear">
						<h2><?php esc_html_e( 'Get a jump start with Genesis.', 'atomic-blocks' ); ?></h2>
						<p><?php esc_html_e( 'Our collection of block-powered themes integrate seamlessly with Genesis Pro features. Genesis themes are free for WP Engine customers.', 'atomic-blocks' ); ?></p>

						<div class="ab-block-features">
							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/genesis-sample.jpg', __FILE__ ) ); ?>" alt="Post Grid Block" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Genesis Sample', 'atomic-blocks' ); ?></h3>
									<p><?php esc_html_e( 'A minimal and powerful starter theme that gives you a blank canvas to build and launch beautiful websites.', 'atomic-blocks' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
								</div>
							</div>

							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/revolution.jpg', __FILE__ ) ); ?>" alt="Container Block" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Revolution Pro', 'atomic-blocks' ); ?></h3>
									<p><?php esc_html_e( 'A minimal design for agencies, lifestyle blogs, personal branding, photographers, and small businesses.', 'atomic-blocks' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
								</div>
							</div>

							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/monochrome.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Call To Action Block', 'atomic-blocks' ); ?>" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Monochrome Pro', 'atomic-blocks' ); ?></h3>
									<p><?php esc_html_e( 'A substantial but simple design that integrates beautifully with the new block editor and custom blocks.', 'atomic-blocks' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
								</div>
							</div>
						</div><!-- .ab-block-features -->
					</div><!-- .ab-block-feature-wrap -->
				</div><!-- .panel-left -->

				<div class="footer-wrap">
					<h2 class="visit-title"><?php esc_html_e( 'Genesis Resources', 'atomic-blocks' ); ?></h2>

					<div class="ab-block-footer">
						<div class="ab-block-footer-column">
							<?php atomic_blocks_svg( 'question-circle' ); ?>
							<h3><?php esc_html_e( 'Documentation and Help', 'atomic-blocks' ); ?></h3>
							<p><?php esc_html_e( 'Visit the Genesis Pro documentation site for helpful tips and tricks, code snippets, and everything you need to get started.', 'atomic-blocks' ); ?></p>
							<a class="button-primary" href="https://developer.wpengine.com/genesis-pro/genesis-page-builder/"><?php esc_html_e( 'Browse the Wiki', 'atomic-blocks' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<?php atomic_blocks_svg( 'bullhorn' ); ?>
							<h3><?php esc_html_e( 'Provide Feedback', 'atomic-blocks' ); ?></h3>
							<p><?php esc_html_e( 'We are always looking for quality feedback to continue improving Genesis Pro and making it better with every release. ', 'atomic-blocks' ); ?></p>
							<a class="button-primary" href="https://www.research.net/r/genesispro"><?php esc_html_e( 'Provide Feedback', 'atomic-blocks' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<?php atomic_blocks_svg( 'layer-group' ); ?>
							<h3><?php esc_html_e( 'Browse Genesis Themes', 'atomic-blocks' ); ?></h3>
							<p><?php esc_html_e( 'The Genesis theme collection has beautiful block-powered themes that help you quickly get started with the new block editor.', 'atomic-blocks' ); ?></p>
							<a class="button-primary" href="https://studiopress.com/themes"><?php esc_html_e( 'Browse Themes', 'atomic-blocks' ); ?></a>
						</div>
					</div>

					<div class="ab-footer">
						<p>
							<?php
							/* translators: %1$s StudioPress website URL. %2$s WP Engine website URL. */
							echo sprintf( esc_html__( 'Made by the fine folks at %1$s and %2$s.', 'atomic-blocks' ), '<a href="https://studiopress.com/">StudioPress</a>', '<a href="https://wpengine.com/">WP Engine</a>' );
							?>
						</p>
					</div>
				</div><!-- .footer-wrap -->
			</div><!-- .panel -->
		</div><!-- .panels -->
	</div><!-- .getting-started -->
