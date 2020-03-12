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

	if ( ! ( $hook === 'toplevel_page_atomic-blocks' ) ) {
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

	// FontAwesome.
	wp_register_style( 'atomic-blocks-fontawesome', plugins_url( '/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'atomic-blocks-fontawesome' );
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_start_load_admin_scripts' );


/**
 * Adds a menu item for the Getting Started page.
 *
 * @since 1.0.0
 */
function atomic_blocks_getting_started_menu() {

	add_menu_page(
		__( 'Atomic Blocks', 'atomic-blocks' ),
		__( 'Atomic Blocks', 'atomic-blocks' ),
		'manage_options',
		'atomic-blocks',
		'atomic_blocks_getting_started_page',
		'dashicons-screenoptions'
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
		esc_html__( 'Atomic Blocks Settings', 'atomic-blocks' ),
		esc_html__( 'Settings', 'atomic-blocks' ),
		'manage_options',
		'atomic-blocks-plugin-settings',
		'atomic_blocks_render_settings_page'
	);

}
add_action( 'admin_menu', 'atomic_blocks_getting_started_menu' );


/**
 * Outputs the markup used on the Getting Started
 *
 * @since 1.0.0
 */
function atomic_blocks_getting_started_page() {

	/**
	 * Create recommended plugin install URLs
	 *
	 * @since 1.0.0
	 */
	$gberg_install_url = wp_nonce_url(
		add_query_arg(
			array(
				'action' => 'install-plugin',
				'plugin' => 'gutenberg',
			),
			admin_url( 'update.php' )
		),
		'install-plugin_gutenberg'
	);

	$ab_install_url = wp_nonce_url(
		add_query_arg(
			array(
				'action' => 'install-plugin',
				'plugin' => 'atomic-blocks',
			),
			admin_url( 'update.php' )
		),
		'install-plugin_atomic-blocks'
	);

	$ab_theme_install_url = wp_nonce_url(
		add_query_arg(
			array(
				'action' => 'install-theme',
				'theme'  => 'atomic-blocks',
			),
			admin_url( 'update.php' )
		),
		'install-theme_atomic-blocks'
	);
	?>
	<?php
	$wrap_class = 'wrap ab-getting-started';
	if ( atomic_blocks_is_pro() ) {
		$wrap_class .= ' ab-pro-getting-started';
	}
	?>
	<div class="<?php echo esc_attr( $wrap_class ); ?>">
		<div class="intro-wrap">
			<div class="intro">
				<a href="<?php echo esc_url( 'https://goo.gl/NfXcof' ); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( 'logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>
				<h3><?php printf( esc_html__( 'Getting started with', 'atomic-blocks' ) ); ?> <strong><?php printf( esc_html__( 'Atomic Blocks', 'atomic-blocks' ) ); ?></strong></h3>
			</div>

			<ul class="inline-list">
				<li class="current"><a id="atomic-blocks-panel" href="#"><i class="fa fa-check"></i> <?php esc_html_e( 'Getting Started', 'atomic-blocks' ); ?></a></li>
				<li><a id="plugin-help" href="#"><i class="fa fa-plug"></i> <?php esc_html_e( 'Plugin Help File', 'atomic-blocks' ); ?></a></li>
				<?php if ( function_exists( 'atomic_blocks_setup' ) ) { ?>
					<li><a id="theme-help" href="#"><i class="fa fa-desktop"></i> <?php esc_html_e( 'Theme Help File', 'atomic-blocks' ); ?></a></li>
				<?php } ?>
			</ul>
		</div>

		<div class="panels">
			<div id="panel" class="panel">
				<div id="atomic-blocks-panel" class="panel-left visible">
					<div class="ab-block-split clearfix">
						<div class="ab-block-split-left">
							<?php if ( function_exists( 'is_wpe' ) && is_wpe() && ! function_exists( 'AtomicBlocksPro\atomic_blocks_pro_main_plugin_file' ) ) { ?>
								<div class="ab-block-pro-notice">
									<i class="fa fa-bullhorn"></i>
									<p>
										<?php
										/* translators: %1$s URL to site about Atomic Blocks Pro */
										printf( esc_html__( 'Atomic Blocks Pro expands the library of blocks and increases functionality and control to meet all your page building needs. %1$s', 'atomic-blocks' ), '<a target="_blank" rel="noopener noreferrer" href="https://wpengine.com/blog/introducing-atomic-blocks-pro-a-premium-collection-of-wordpress-content-blocks/">' . esc_html__( 'Explore Atomic Blocks Pro &rarr;', 'atomic-blocks' ) . '</a>' );
										?>
									</p>
								</div>
							<?php } ?>
							<div class="ab-titles">
								<?php if ( atomic_blocks_is_pro() ) { ?>
									<h2><?php esc_html_e( 'Build and launch beautiful websites effortlessly with Atomic Blocks Pro (beta).', 'atomic-blocks' ); ?></h2>
									<p><?php esc_html_e( 'Atomic Blocks Pro provides you with a complete collection of page building section and layout blocks. Mix and match pre-designed sections to create full pages or get a huge head start with full-page layouts. Join the future of site building today!', 'atomic-blocks' ); ?></p>
									<ul>
										<li><?php esc_html_e( 'Page Building Layouts', 'atomic-blocks' ); ?></li>
										<li><?php esc_html_e( 'Customizable Portfolios', 'atomic-blocks' ); ?></li>
										<li><?php esc_html_e( 'Block Setting Permissions', 'atomic-blocks' ); ?></li>
										<li><?php esc_html_e( 'Custom Layout Integration', 'atomic-blocks' ); ?></li>
									</ul>
								<?php } else { ?>
									<h2><?php esc_html_e( 'Welcome to the future of site building with Gutenberg and Atomic Blocks!', 'atomic-blocks' ); ?></h2>
									<p><?php esc_html_e( 'The Atomic Blocks collection is now ready to use in your posts and pages. Simply search for "atomic" or "ab" in the block inserter to display the Atomic Blocks collection. Check out the help file link above for detailed instructions!', 'atomic-blocks' ); ?></p>
								<?php } ?>
							</div>
						</div>
						<div class="ab-block-split-right">
							<?php if ( atomic_blocks_is_pro() ) { ?>
								<div class="ab-gs-feedback">
									<h3><?php esc_html_e( 'Help us improve Atomic Blocks Pro (beta)!', 'atomic-blocks' ); ?></h3>
									<p><?php esc_html_e( 'Please consider opting into anonymous usage tracking to help us make Atomic Blocks Pro better! We’ll use this anonymous data to improve usability, build better blocks, and add new features.', 'atomic-blocks' ); ?></p>
									<form>
										<?php $opt_in_value = get_option( 'atomic_blocks_pro_analytics_opt_in', false ); ?>
										<input type="radio" id="atomic-blocks-pro-analytics-opt-in-enabled" name="atomic-blocks-settings[analytics-opt-in]" value="1" <?php checked( $opt_in_value, true ); ?>>
										<label for="atomic-blocks-pro-analytics-opt-in-enabled"><?php esc_html_e( 'Enabled', 'atomic-blocks' ); ?></label>
										<br>
										<input type="radio" id="atomic-blocks-pro-analytics-opt-in-disabled" name="atomic-blocks-settings[analytics-opt-in]" value="0" <?php checked( $opt_in_value, false ); ?>>
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
							<?php } else { ?>
								<div class="ab-block-theme">
									<img src="<?php echo esc_url( plugins_url( 'images/build-content.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Atomic Blocks Theme', 'atomic-blocks' ); ?>" />
								</div>
							<?php } ?>
						</div>
					</div>

					<div class="ab-block-feature-wrap clear">
						<i class="fas fa-cube"></i>
						<?php if ( atomic_blocks_is_pro() ) { ?>
							<h2><?php esc_html_e( 'Get a jump start with Genesis.', 'atomic-blocks' ); ?></h2>
							<p><?php esc_html_e( 'Our collection of block-powered themes integrate seamlessly with Atomic Blocks Pro features. Genesis themes are free for WP Engine customers.', 'atomic-blocks' ); ?></p>
						<?php } else { ?>
							<h2><?php esc_html_e( 'Available Atomic Blocks', 'atomic-blocks' ); ?></h2>
							<p><?php esc_html_e( 'The following blocks are available in Atomic Blocks. More blocks are on the way so stay tuned!', 'atomic-blocks' ); ?></p>
						<?php } ?>

						<div class="ab-block-features">
							<?php if ( atomic_blocks_is_pro() ) { ?>
								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/genesis-sample.jpg', __FILE__ ) ); ?>" alt="Post Grid Block" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Genesis Sample', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'A minimal and powerful starter theme that gives you a blank canvas to build and launch beautiful websites.', 'atomic-blocks' ); ?></p>
										<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/revolution.jpg', __FILE__ ) ); ?>" alt="Container Block" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Revolution Pro', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'A minimal design for agencies, lifestyle blogs, personal branding, photographers, and small businesses.', 'atomic-blocks' ); ?></p>
										<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/monochrome.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Call To Action Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Monochrome Pro', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'A substantial but simple design that integrates beautifully with the new block editor and custom blocks.', 'atomic-blocks' ); ?></p>
										<a class="button-primary club-button" href="https://my.wpengine.com/themes"><?php esc_html_e( 'Download at WP Engine', 'atomic-blocks' ); ?></a>
									</div>
								</div>
							<?php } else { ?>
								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc26.svg', __FILE__ ) ); ?>" alt="Post Grid Block" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Post Grid Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add an eye-catching, full-width section with a big title, paragraph text, and a customizable button.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc430.svg', __FILE__ ) ); ?>" alt="Container Block" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Container Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Wrap several blocks into a section and add padding, margins, background colors and images.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc41.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Call To Action Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Call-To-Action Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add an eye-catching, full-width section with a big title, paragraph text, and a customizable button.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc4.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Testimonials Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Testimonial Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add a customer or client testimonial to your site with an avatar, text, citation and more.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc184.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Inline Notices Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Inline Notice Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add a colorful notice or message to your site with text, a title and a dismiss icon.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc50.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Sharing Icons Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Sharing Icons Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add social sharing icons to your page with size, shape, color and style options.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc94-f.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Author Profile Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Author Profile Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add a user profile box to your site with a title, bio info, an avatar and social media links.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc115.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Accordion Toggle', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Accordion Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add an accordion text toggle with a title and descriptive text. Includes font size and toggle options.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc45.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Customizable Button Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Customizable Button', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add a fancy stylized button to your post or page with size, shape, target, and color options.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc38.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Drop Cap Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Drop Cap Block', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add a stylized drop cap to the beginning of your paragraph. Choose from three different styles.', 'atomic-blocks' ); ?></p>
									</div>
								</div>

								<div class="ab-block-feature">
									<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( 'images/cc402.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Spacer and Divider Block', 'atomic-blocks' ); ?>" /></div>
									<div class="ab-block-feature-text">
										<h3><?php esc_html_e( 'Spacer & Divider', 'atomic-blocks' ); ?></h3>
										<p><?php esc_html_e( 'Add an adjustable spacer between your blocks with an optional divider with styling options.', 'atomic-blocks' ); ?></p>
									</div>
								</div>
							<?php } ?>
						</div><!-- .ab-block-features -->
					</div><!-- .ab-block-feature-wrap -->
				</div><!-- .panel-left -->

				<!-- Plugin help file panel -->
				<div id="plugin-help" class="panel-left">
					<!-- Grab feed of help file -->
					<?php
						$plugin_help = get_transient( 'atomic-blocks-plugin-help-feed' );

					if ( false === $plugin_help ) {
						$plugin_feed = wp_remote_get( 'https://atomicblocks.com/plugin-help-file//?atomicblocks_api=post_content' );

						if ( ! is_wp_error( $plugin_feed ) && 200 === wp_remote_retrieve_response_code( $plugin_feed ) ) {
							$plugin_help = json_decode( wp_remote_retrieve_body( $plugin_feed ) );
							set_transient( 'atomic-blocks-plugin-help-feed', $plugin_help, DAY_IN_SECONDS );
						} else {
							$plugin_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
							set_transient( 'atomic-blocks-plugin-help-feed', $plugin_help, MINUTE_IN_SECONDS * 5 );
						}
					}

						echo wp_kses_post( $plugin_help );
					?>
				</div>

				<!-- Theme help file panel -->
				<?php if ( function_exists( 'atomic_blocks_setup' ) ) { ?>
					<div id="theme-help" class="panel-left">
						<!-- Grab feed of help file -->
						<?php
							$theme_help = get_transient( 'atomic-blocks-theme-help-feed' );

						if ( false === $theme_help ) {
							$theme_feed = wp_remote_get( 'https://atomicblocks.com/theme-help-file//?atomicblocks_api=post_content' );

							if ( ! is_wp_error( $theme_feed ) && 200 === wp_remote_retrieve_response_code( $theme_feed ) ) {
								$theme_help = json_decode( wp_remote_retrieve_body( $theme_feed ) );
								set_transient( 'atomic-blocks-theme-help-feed', $theme_help, DAY_IN_SECONDS );
							} else {
								$theme_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
								set_transient( 'atomic-blocks-theme-help-feed', $theme_help, MINUTE_IN_SECONDS * 5 );
							}
						}

							echo wp_kses_post( $theme_help );
						?>
					</div><!-- #theme-help -->
				<?php } ?>

				<div class="panel-right">

					<?php if ( ! function_exists( 'atomic_blocks_setup' ) ) { ?>
					<div class="panel-aside panel-ab-plugin panel-club">
						<div class="panel-club-inside">
							<div class="cell panel-title">
								<h3><i class="fa fa-download"></i> <?php esc_html_e( 'Free Theme Download', 'atomic-blocks' ); ?></h3>
							</div>

							<ul>
								<li class="cell">
									<p><a class="ab-theme-image" href="<?php echo esc_url( 'https://goo.gl/FCT6xS' ); ?>"><img src="<?php echo esc_url( plugins_url( 'theme.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a></p>

									<p><?php esc_html_e( 'Download our FREE Atomic Blocks theme to help you get started with the Atomic Blocks plugin and the new WordPress block editor.', 'atomic-blocks' ); ?></p>

									<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( $ab_theme_install_url ); ?>"><?php esc_html_e( 'Install Now', 'atomic-blocks' ); ?> &rarr;</a>
								</li>
							</ul>
						</div>
					</div>
					<?php } ?>

					<div class="panel-aside panel-ab-plugin panel-club">
						<div class="panel-club-inside">
							<div class="cell panel-title">
								<h3><i class="fa fa-envelope"></i> <?php esc_html_e( 'Stay Updated', 'atomic-blocks' ); ?></h3>
							</div>

							<ul>
								<li class="cell">
								<p><?php esc_html_e( 'Join the newsletter to receive emails when we add new blocks, release plugin and theme updates, send out free resources, and more!', 'atomic-blocks' ); ?></p>

									<a class="button-primary club-button" target="_blank" href="https://goo.gl/3pC6LE"><?php esc_html_e( 'Subscribe Now', 'atomic-blocks' ); ?> &rarr;</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="panel-aside panel-ab-plugin panel-club">
						<div class="panel-club-inside">
							<div class="cell panel-title">
								<h3><i class="fa fa-arrow-circle-down"></i> <?php esc_html_e( 'Free Blocks & Tutorials', 'atomic-blocks' ); ?></h3>
							</div>

							<ul>
								<li class="cell">
									<p><?php esc_html_e( 'Check out the Atomic Blocks site to find block editor tutorials, free blocks and updates about the Atomic Blocks plugin and theme!', 'atomic-blocks' ); ?></p>
									<a class="button-primary club-button" target="_blank" href="https://goo.gl/xpujKp"><?php esc_html_e( 'Visit AtomicBlocks.com', 'atomic-blocks' ); ?> &rarr;</a>
								</li>
							</ul>
						</div>
					</div>
				</div><!-- .panel-right -->

				<div class="footer-wrap">
					<h2 class="visit-title"><?php esc_html_e( 'Atomic Blocks Resources', 'atomic-blocks' ); ?></h2>

					<div class="ab-block-footer">
						<div class="ab-block-footer-column">
							<i class="far fa-question-circle"></i>
							<h3><?php esc_html_e( 'Documentation and Help', 'atomic-blocks' ); ?></h3>
							<p><?php esc_html_e( 'The Atomic Blocks wiki has helpful documentation, tips and tricks, code snippets, and more to help you get started.', 'atomic-blocks' ); ?></p>
							<a class="button-primary" href="https://github.com/studiopress/atomic-blocks/wiki"><?php esc_html_e( 'Browse the Wiki', 'atomic-blocks' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<i class="fas fa-bullhorn"></i>
							<h3><?php esc_html_e( 'Provide Feedback', 'atomic-blocks' ); ?></h3>
							<p><?php esc_html_e( 'We are always looking for quality feedback to continue improving Atomic Blocks and making it better with every release. ', 'atomic-blocks' ); ?></p>
							<a class="button-primary" href="https://wpengine.co1.qualtrics.com/jfe/form/SV_bj6kzZDz1Egcc17"><?php esc_html_e( 'Provide Feedback', 'atomic-blocks' ); ?></a>
						</div>

						<div class="ab-block-footer-column">
							<i class="fas fa-layer-group"></i>
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
	<?php
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
	if ( 'atomic-blocks_page_atomic-blocks-plugin-settings' !== $hook ) {
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
			delete_option( 'atomic_blocks_pro_analytics_opt_in' );
		} else {
			update_option( 'atomic_blocks_pro_analytics_opt_in', true );
		}

		wp_send_json_success();
	}
);
