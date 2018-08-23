<?php
/**
 * Getting Started page
 *
 * @package Atomic Blocks
 */

/**
 * Load Getting Started styles in the admin
 *
 * since 1.0.0
 */
function atomic_blocks_start_load_admin_scripts() {

	global $pagenow;

	/**
	 * Load scripts and styles
	 *
	 * @since 1.0
	 */

	// Getting Started javascript
	wp_enqueue_script( 'atomic-blocks-getting-started', plugins_url( 'getting-started/getting-started.js', dirname( __FILE__ ) ), array( 'jquery' ), '1.0.0', true );

	// Getting Started styles
	wp_register_style( 'atomic-blocks-getting-started', plugins_url( 'getting-started/getting-started.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'atomic-blocks-getting-started' );

	// FontAwesome
	wp_register_style( 'atomic-blocks-fontawesome', plugins_url( '/assets/fontawesome/css/all.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'atomic-blocks-fontawesome' );
}
add_action( 'admin_enqueue_scripts', 'atomic_blocks_start_load_admin_scripts' );


/**
 * Adds a menu item for the Getting Started page.
 *
 * since 1.0.0
 */
function atomic_blocks_getting_started_menu() {

	add_menu_page(
		__( 'Atomic Blocks', 'atomic-blocks' ),
		__( 'Atomic Blocks', 'atomic-blocks' ),
		'manage_options',
		'atomic-blocks',
		'atomic_blocks_getting_started_page',
		'dashicons-admin-settings'
	);

}
add_action( 'admin_menu', 'atomic_blocks_getting_started_menu' );


/**
 * Outputs the markup used on the theme license page.
 *
 * since 1.0.0
 */
function atomic_blocks_getting_started_page() {

	/**
	 * Retrieve help file and update changelog
	 *
	 * since 1.0.0
	 */

	// Grab the change log from arraythemes.com for display in the Latest Updates tab
	$changelog = get_transient( 'atomic-blocks-changelog' );
	if( false === $changelog ) {
		$changelog_feed = wp_remote_get( 'https://atomicblocks.com/changelog/?atomicblocks_api=post_content' );

		if( ! is_wp_error( $changelog_feed ) && 200 === wp_remote_retrieve_response_code( $changelog_feed ) ) {
			$changelog = json_decode( wp_remote_retrieve_body( $changelog_feed ) );
			set_transient( 'atomic-blocks-changelog', $changelog, DAY_IN_SECONDS );
		} else {
			$changelog = esc_html( 'There seems to be a temporary problem retrieving the latest updates. You can always see the latest changes by visiting the Atomic Blocks website.', 'atomic-blocks' );
			set_transient( 'atomic-blocks-changelog', $changelog, MINUTE_IN_SECONDS * 5 );
		}
	}

	/**
	 * Create recommended plugin install URLs
	 *
	 * since 1.0.0
	 */
	$gberg_install_url = wp_nonce_url(
		add_query_arg(
			array(
				'action' => 'install-plugin',
				'plugin' => 'gutenberg'
			),
			admin_url( 'update.php' )
		),
		'install-plugin_gutenberg'
	);

	$ab_install_url = wp_nonce_url(
		add_query_arg(
			array(
				'action' => 'install-plugin',
				'plugin' => 'atomic-blocks'
			),
			admin_url( 'update.php' )
		),
		'install-plugin_atomic-blocks'
	);
?>
	<div class="wrap ab-getting-started">
		<div class="intro-wrap">
			<div class="intro">
				<a href="<?php echo esc_url('https://goo.gl/NfXcof'); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( 'logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>	
				<h3><?php printf( esc_html__( 'Getting started with', 'atomic-blocks' ) ); ?> <strong><?php printf( esc_html__( 'Atomic Blocks', 'atomic-blocks' ) ); ?></strong></h3>
			</div>

			<ul class="inline-list">
				<li class="current"><a id="plugin-help" href="#"><i class="fa fa-plug"></i> <?php esc_html_e( 'Plugin Help File', 'atomic-blocks' ); ?></a></li>	
				<li><a id="theme-help" href="#"><i class="fa fa-check"></i> <?php esc_html_e( 'Theme Help File', 'atomic-blocks' ); ?></a></li>
				<li><a id="updates" href="#"><i class="fa fa-sync-alt"></i> <?php esc_html_e( 'Latest Updates', 'atomic-blocks' ); ?></a></li>
				<li><a id="themes" href="#"><i class="fa fa-arrow-circle-down"></i> <?php esc_html_e( 'Get More Themes', 'atomic-blocks' ); ?></a></li>
			</ul>
		</div>

		<div class="panels">
			<div id="panel" class="panel">
				<!-- Plugin help file panel -->
				<div id="plugin-help" class="panel-left visible">
					<!-- Grab feed of help file -->
					<?php
						$plugin_help = get_transient( 'atomic-blocks-plugin-help-feed' );
						if( false === $plugin_help ) {
							$plugin_feed = wp_remote_get( 'https://atomicblocks.com/plugin-help-file//?atomicblocks_api=post_content' );

							if( ! is_wp_error( $plugin_feed ) && 200 === wp_remote_retrieve_response_code( $plugin_feed ) ) {
								$plugin_help = json_decode( wp_remote_retrieve_body( $plugin_feed ) );
								set_transient( 'atomic-blocks-plugin-help-feed', $plugin_help, DAY_IN_SECONDS );
							} else {
								$plugin_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
								set_transient( 'atomic-blocks-plugin-help-feed', $plugin_help, MINUTE_IN_SECONDS * 5 );
							}
						}

						echo $plugin_help;
						?>
				</div>

				<!-- Theme help file panel -->
				<div id="theme-help" class="panel-left">
					<!-- Grab feed of help file -->
					<?php
						$theme_help = get_transient( 'atomic-blocks-theme-help-feed' );
						if( false === $theme_help ) {
							$theme_feed = wp_remote_get( 'https://atomicblocks.com/theme-help-file//?atomicblocks_api=post_content' );

							if( ! is_wp_error( $theme_feed ) && 200 === wp_remote_retrieve_response_code( $theme_feed ) ) {
								$theme_help = json_decode( wp_remote_retrieve_body( $theme_feed ) );
								set_transient( 'atomic-blocks-theme-help-feed', $theme_help, DAY_IN_SECONDS );
							} else {
								$theme_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
								set_transient( 'atomic-blocks-theme-help-feed', $theme_help, MINUTE_IN_SECONDS * 5 );
							}
						}

						echo $theme_help;
						?>
				</div>

				<!-- Updates panel -->
				<div id="updates-panel" class="panel-left">
					<?php echo $changelog; ?>
				</div><!-- .panel-left updates -->

				<!-- More themes -->
				<div id="themes" class="panel-left">
					<div class="theme-intro clear">
						<div class="theme-intro-left">
							<p><?php _e( 'Array Themes has over 20 WordPress themes that will integrate seamlessly with the new block editor. <strong>Use the discount code ATOMICUSER to get 15% off anything in the store!</strong>', 'atomic-blocks' ); ?></p>
						</div>
						<div class="theme-intro-right">
							<a class="button-primary club-button" href="<?php echo esc_url('https://goo.gl/YMgQBN'); ?>"><?php esc_html_e( 'Browse the theme collection', 'atomic-blocks' ); ?> &rarr;</a>
						</div>
					</div>

					<div class="theme-list">
					<?php
					$themes_link = 'https://arraythemes.com/wordpress-themes';
					$themes_list = get_transient( 'arraythemes-theme-feed' );

					if( false === $themes_list ) {
						$themes_feed = wp_remote_get( 'https://arraythemes.com/feed/themes' );

						if ( ! is_wp_error( $themes_feed ) && 200 === wp_remote_retrieve_response_code( $themes_feed ) ) {
							$themes_list = wp_remote_retrieve_body( $themes_feed );
							set_transient( 'arraythemes-theme-feed', $themes_list, DAY_IN_SECONDS );
						} else {
							$themes_list = sprintf( __( 'This theme feed seems to be temporarily down. Please check back later, or visit our <a href="%s">Themes page on Array</a>.', 'atomic-blocks' ), esc_url( $themes_link ) );
							set_transient( 'arraythemes-theme-feed', $themes_list, MINUTE_IN_SECONDS * 5 );
						}
					}

					echo $themes_list; ?>

					</div><!-- .theme-list -->
				</div><!-- .panel-left updates -->

				<div class="panel-right">

					<?php if( ! function_exists( 'gutenberg_init' ) || ! function_exists( 'atomic_blocks_loader' ) ) { ?>
					<div class="panel-aside panel-ab-plugin panel-club ab-quick-start">
						<div class="panel-club-inside">
							<div class="cell panel-title">
								<h3><i class="fa fa-check"></i> <?php esc_html_e( 'Quick Start Checklist', 'atomic-blocks' ); ?></h3>
							</div>

							<ul>
							<li class="cell <?php if( function_exists( 'gutenberg_init' ) ) { echo 'step-complete'; } ?>">
									<strong><?php esc_html_e( '1. Install the Gutenberg plugin.', 'atomic-blocks' ); ?></strong>
									<p><?php esc_html_e( 'Gutenberg adds the new block-based editor to WordPress. You will need this to work with the Atomic Blocks plugin.', 'atomic-blocks' ); ?></p>

									<?php if( ! array_key_exists( 'gutenberg/gutenberg.php', get_plugins() ) ) { ?>
										<a class="button-primary club-button" href="<?php echo esc_url( $gberg_install_url ); ?>"><?php esc_html_e( 'Install Gutenberg now', 'atomic-blocks' ); ?> &rarr;</a>
									<?php } else if ( array_key_exists( 'gutenberg/gutenberg.php', get_plugins() ) && ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) { ?>
										<?php activate_plugin( 'gutenberg/gutenberg.php' ); ?>
										<strong><i class="fa fa-check"></i> <?php esc_html_e( 'Plugin activated!', 'atomic-blocks' ); ?></strong>
									<?php } else { ?>
										<strong><i class="fa fa-check"></i> <?php esc_html_e( 'Plugin activated!', 'atomic-blocks' ); ?></strong>
									<?php } ?>
								</li>

								<li class="cell <?php if( function_exists( 'atomic_blocks_loader' ) ) { echo 'step-complete'; } ?>">
									<strong><?php esc_html_e( '2. Install the Atomic Blocks plugin.', 'atomic-blocks' ); ?></strong>
									<p><?php esc_html_e( 'Atomic Blocks adds several handy content blocks to the Gutenberg block editor.', 'atomic-blocks' ); ?></p>

									<?php if( ! array_key_exists( 'atomic-blocks/atomicblocks.php', get_plugins() ) ) { ?>
										<a class="button-primary club-button" href="<?php echo esc_url( $ab_install_url ); ?>"><?php esc_html_e( 'Install Atomic Blocks now', 'atomic-blocks' ); ?> &rarr;</a>
									<?php } else if ( array_key_exists( 'atomic-blocks/atomicblocks.php', get_plugins() ) && ! is_plugin_active( 'atomic-blocks/atomicblocks.php' ) ) { ?>
										<?php activate_plugin( 'atomic-blocks/atomicblocks.php' ); ?>
										<strong><i class="fa fa-check"></i> <?php esc_html_e( 'Plugin activated!', 'atomic-blocks' ); ?></strong>
									<?php } else { ?>
										<strong><i class="fa fa-check"></i> <?php esc_html_e( 'Plugin activated!', 'atomic-blocks' ); ?></strong>
									<?php } ?>
								</li>
							</ul>
						</div>
					</div>
					<?php } ?>
					
					<?php if( ! function_exists( 'atomic_blocks_setup' ) ) { ?>
					<div class="panel-aside panel-ab-plugin panel-club">
						<div class="panel-club-inside">
							<div class="cell panel-title">
								<h3><i class="fa fa-download"></i> <?php esc_html_e( 'Free Theme Download', 'atomic-blocks' ); ?></h3>
							</div>

							<ul>
								<li class="cell">
									<p><a class="ab-theme-image" href="<?php echo esc_url('https://goo.gl/FCT6xS'); ?>"><img src="<?php echo esc_url( plugins_url( 'theme.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a></p>
									
									<p><?php esc_html_e( 'Download our FREE Atomic Blocks theme to help you get started with the Atomic Blocks plugin and the new WordPress block editor.', 'atomic-blocks' ); ?></p>

									<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( 'https://goo.gl/FCT6xS' ); ?>"><?php esc_html_e( 'Download Now', 'atomic-blocks' ); ?> &rarr;</a>
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

									<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( 'https://goo.gl/3pC6LE' ); ?>"><?php esc_html_e( 'Subscribe Now', 'atomic-blocks' ); ?> &rarr;</a>
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
									<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( 'https://goo.gl/xpujKp' ); ?>"><?php esc_html_e( 'Visit AtomicBlocks.com', 'atomic-blocks' ); ?> &rarr;</a>
								</li>
							</ul>
						</div>
					</div>
				</div><!-- .panel-right -->
			</div><!-- .panel -->
		</div><!-- .panels -->
	</div><!-- .getting-started -->
<?php
}
