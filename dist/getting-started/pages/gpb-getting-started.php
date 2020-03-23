	<div class="wrap ab-getting-started gpb-getting-started">
		<div class="intro-wrap">
			<div class="intro">
				<a href="<?php echo esc_url( 'https://goo.gl/NfXcof' ); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( '../images/genesis-logo.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Genesis', 'genesis-page-builder' ); ?>" /></a>
				<h1><?php printf( esc_html__( 'Getting started with', 'genesis-page-builder' ) ); ?><br/><strong><?php printf( esc_html__( 'Genesis Page Builder', 'genesis-page-builder' ) ); ?></strong></h1>
			</div>
		</div>

		<div class="panels">
			<div id="panel" class="panel">
				<div id="atomic-blocks-panel" class="panel-left visible">
					<div class="ab-block-split clearfix">
						<div class="ab-block-split-left">
							<div class="ab-titles">
								<h2><?php esc_html_e( 'Build and launch beautiful websites effortlessly with Genesis Page Builder (beta).', 'genesis-page-builder' ); ?></h2>
								<p><?php esc_html_e( 'Genesis Page Builder provides you with a complete collection of page building section and layout blocks. Mix and match pre-designed sections to create full pages or get a huge head start with full-page layouts. Join the future of site building today!', 'genesis-page-builder' ); ?></p>
								<ul>
									<li><?php esc_html_e( 'Page Building Layouts', 'genesis-page-builder' ); ?></li>
									<li><?php esc_html_e( 'Customizable Portfolios', 'genesis-page-builder' ); ?></li>
									<li><?php esc_html_e( 'Block Setting Permissions', 'genesis-page-builder' ); ?></li>
									<li><?php esc_html_e( 'Custom Layout Integration', 'genesis-page-builder' ); ?></li>
								</ul>
							</div>
						</div>
						<div class="ab-block-split-right">
							<div class="ab-gs-feedback">
								<h3><?php esc_html_e( 'Help us improve Genesis Page Builder (beta)!', 'genesis-page-builder' ); ?></h3>
								<p><?php esc_html_e( 'Please consider opting into anonymous usage tracking to help us make Genesis Page Builder better! We’ll use this anonymous data to improve usability, build better blocks, and add new features.', 'genesis-page-builder' ); ?></p>
								<form>
									<?php $opt_in_value = get_option( 'atomic_blocks_pro_analytics_opt_in', false ); ?>
									<input type="radio" id="atomic-blocks-pro-analytics-opt-in-enabled" name="atomic-blocks-settings[analytics-opt-in]" value="1" <?php checked( $opt_in_value, true ); ?>>
									<label for="atomic-blocks-pro-analytics-opt-in-enabled"><?php esc_html_e( 'Enabled', 'genesis-page-builder' ); ?></label>
									<br>
									<input type="radio" id="atomic-blocks-pro-analytics-opt-in-disabled" name="atomic-blocks-settings[analytics-opt-in]" value="0" <?php checked( $opt_in_value, false ); ?>>
									<label for="atomic-blocks-pro-analytics-opt-in-disabled"><?php esc_html_e( 'Disabled', 'genesis-page-builder' ); ?></label>
									<p class="atomic-blocks-settings-description">
										<?php
											/* translators: %1$s WP Engine privacy policy link. */
											printf( esc_html__( 'Read our %1$s for more details.', 'genesis-page-builder' ), '<a href="https://wpengine.com/legal/privacy/">' . esc_html__( 'privacy policy', 'genesis-page-builder' ) . '</a>' );
										?>
									</p>
									<?php wp_nonce_field( 'atomic_blocks_pro_gs_analytics_toggle', 'atomic_blocks_pro_gs_analytics_toggle_nonce', false ); ?>
								</form>
							</div>
						</div>
					</div>

					<div class="ab-block-feature-wrap clear">
						<i class="fas fa-cube"></i>
						<h2><?php esc_html_e( 'Get a jump start with Genesis.', 'genesis-page-builder' ); ?></h2>
						<p><?php esc_html_e( 'Our collection of block-powered themes integrate seamlessly with Genesis Page Builder features. Genesis themes are free for WP Engine customers.', 'genesis-page-builder' ); ?></p>

						<div class="ab-block-features">
							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/genesis-sample.jpg', __FILE__ ) ); ?>" alt="Post Grid Block" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Genesis Sample', 'genesis-page-builder' ); ?></h3>
									<p><?php esc_html_e( 'A minimal and powerful starter theme that gives you a blank canvas to build and launch beautiful websites.', 'genesis-page-builder' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'genesis-page-builder' ); ?></a>
								</div>
							</div>

							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/revolution.jpg', __FILE__ ) ); ?>" alt="Container Block" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Revolution Pro', 'genesis-page-builder' ); ?></h3>
									<p><?php esc_html_e( 'A minimal design for agencies, lifestyle blogs, personal branding, photographers, and small businesses.', 'genesis-page-builder' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'genesis-page-builder' ); ?></a>
								</div>
							</div>

							<div class="ab-block-feature">
								<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/monochrome.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Call To Action Block', 'genesis-page-builder' ); ?>" /></div>
								<div class="ab-block-feature-text">
									<h3><?php esc_html_e( 'Monochrome Pro', 'genesis-page-builder' ); ?></h3>
									<p><?php esc_html_e( 'A substantial but simple design that integrates beautifully with the new block editor and custom blocks.', 'genesis-page-builder' ); ?></p>
									<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'genesis-page-builder' ); ?></a>
								</div>
							</div>
						</div><!-- .ab-block-features -->
					</div><!-- .ab-block-feature-wrap -->
				</div><!-- .panel-left -->

				<div class="footer-wrap">
					<h2 class="visit-title"><?php esc_html_e( 'Genesis Resources', 'genesis-page-builder' ); ?></h2>

					<div class="ab-block-footer">
						<div class="ab-block-footer-column">
							<i class="far fa-question-circle"></i>
							<h3><?php esc_html_e( 'Documentation and Help', 'genesis-page-builder' ); ?></h3>
							<p><?php esc_html_e( 'The Genesis Page Builder wiki has helpful documentation, tips and tricks, code snippets, and more to help you get started.', 'genesis-page-builder' ); ?></p>
							<a class="button-primary" href="https://github.com/studiopress/genesis-page-builder/wiki"><?php esc_html_e( 'Browse the Wiki', 'genesis-page-builder' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<i class="fas fa-bullhorn"></i>
							<h3><?php esc_html_e( 'Provide Feedback', 'genesis-page-builder' ); ?></h3>
							<p><?php esc_html_e( 'We are always looking for quality feedback to continue improving Genesis Page Builder and making it better with every release. ', 'genesis-page-builder' ); ?></p>
							<a class="button-primary" href="https://wpengine.co1.qualtrics.com/jfe/form/SV_bj6kzZDz1Egcc17"><?php esc_html_e( 'Provide Feedback', 'genesis-page-builder' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<i class="fas fa-layer-group"></i>
							<h3><?php esc_html_e( 'Browse Genesis Themes', 'genesis-page-builder' ); ?></h3>
							<p><?php esc_html_e( 'The Genesis theme collection has beautiful block-powered themes that help you quickly get started with the new block editor.', 'genesis-page-builder' ); ?></p>
							<a class="button-primary" href="https://studiopress.com/themes"><?php esc_html_e( 'Browse Themes', 'genesis-page-builder' ); ?></a>
						</div>
					</div>

					<div class="ab-footer">
						<p>
							<?php
							/* translators: %1$s StudioPress website URL. %2$s WP Engine website URL. */
							echo sprintf( esc_html__( 'Made by the fine folks at %1$s and %2$s.', 'genesis-page-builder' ), '<a href="https://studiopress.com/">StudioPress</a>', '<a href="https://wpengine.com/">WP Engine</a>' );
							?>
						</p>
					</div>
				</div><!-- .footer-wrap -->
			</div><!-- .panel -->
		</div><!-- .panels -->
	</div><!-- .getting-started -->
