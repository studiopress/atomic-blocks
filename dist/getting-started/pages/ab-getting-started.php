<?php
/**
 * Getting Started content for Atomic Blocks
 *
 * @package Atomic Blocks
 */

?>

<div class="wrap ab-getting-started">
	<div class="intro-wrap">
		<div class="intro">
			<a href="<?php echo esc_url( 'https://goo.gl/NfXcof' ); ?>"><img class="atomic-logo" src="<?php echo esc_url( plugins_url( '../images/logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a>
			<h1><?php printf( esc_html__( 'Getting started with', 'atomic-blocks' ) ); ?> <strong><?php printf( esc_html__( 'Atomic Blocks', 'atomic-blocks' ) ); ?></strong></h1>
		</div>

		<ul class="inline-list">
			<li class="current">
				<a id="atomic-blocks-panel" href="#">
					<?php atomic_blocks_svg( 'check-circle' ); ?>
					<span><?php esc_html_e( 'Getting Started', 'atomic-blocks' ); ?></span>
				</a>
			</li>
			<li>
				<a id="plugin-help" href="#">
					<?php atomic_blocks_svg( 'plug' ); ?>
					<span><?php esc_html_e( 'Plugin Help File', 'atomic-blocks' ); ?></span>
				</a>
			</li>
			<?php if ( function_exists( 'atomic_blocks_setup' ) ) { ?>
				<li><a id="theme-help" href="#"><?php esc_html_e( 'Theme Help File', 'atomic-blocks' ); ?></a></li>
			<?php } ?>
		</ul>
	</div>

	<div class="panels">
		<div id="panel" class="panel">
			<div id="atomic-blocks-panel" class="panel-left visible">
				<div class="ab-block-split clearfix">
					<div class="ab-block-split-left">
						<div class="ab-titles">
							<h2><?php esc_html_e( 'Welcome to the future of site building with Gutenberg and Atomic Blocks!', 'atomic-blocks' ); ?></h2>
							<p><?php esc_html_e( 'The Atomic Blocks collection is now ready to use in your posts and pages. Simply search for "atomic" or "ab" in the block inserter to display the Atomic Blocks collection. Check out the help file link above for detailed instructions!', 'atomic-blocks' ); ?></p>
						</div>
					</div>
					<div class="ab-block-split-right">
						<div class="ab-block-theme">
							<img src="<?php echo esc_url( plugins_url( '../images/build-content.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Atomic Blocks Theme', 'atomic-blocks' ); ?>" />
						</div>
					</div>
				</div>

				<div class="ab-block-feature-wrap clear">
					<h2><?php esc_html_e( 'Available Atomic Blocks', 'atomic-blocks' ); ?></h2>
					<p><?php esc_html_e( 'The following blocks are available in Atomic Blocks. More blocks are on the way so stay tuned!', 'atomic-blocks' ); ?></p>

					<div class="ab-block-features">
						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc26.svg', __FILE__ ) ); ?>" alt="Post Grid Block" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Post Grid Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add an eye-catching, full-width section with a big title, paragraph text, and a customizable button.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc430.svg', __FILE__ ) ); ?>" alt="Container Block" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Container Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Wrap several blocks into a section and add padding, margins, background colors and images.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc41.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Call To Action Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Call-To-Action Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add an eye-catching, full-width section with a big title, paragraph text, and a customizable button.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc4.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Testimonials Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Testimonial Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add a customer or client testimonial to your site with an avatar, text, citation and more.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc184.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Inline Notices Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Inline Notice Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add a colorful notice or message to your site with text, a title and a dismiss icon.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc50.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Sharing Icons Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Sharing Icons Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add social sharing icons to your page with size, shape, color and style options.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc94-f.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Author Profile Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Author Profile Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add a user profile box to your site with a title, bio info, an avatar and social media links.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc115.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Accordion Toggle', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Accordion Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add an accordion text toggle with a title and descriptive text. Includes font size and toggle options.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc45.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Customizable Button Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Customizable Button', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add a fancy stylized button to your post or page with size, shape, target, and color options.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc38.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Drop Cap Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Drop Cap Block', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add a stylized drop cap to the beginning of your paragraph. Choose from three different styles.', 'atomic-blocks' ); ?></p>
							</div>
						</div>

						<div class="ab-block-feature">
							<div class="ab-block-feature-icon"><img src="<?php echo esc_url( plugins_url( '../images/cc402.svg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Spacer and Divider Block', 'atomic-blocks' ); ?>" /></div>
							<div class="ab-block-feature-text">
								<h3><?php esc_html_e( 'Spacer & Divider', 'atomic-blocks' ); ?></h3>
								<p><?php esc_html_e( 'Add an adjustable spacer between your blocks with an optional divider with styling options.', 'atomic-blocks' ); ?></p>
							</div>
						</div>
					</div><!-- .ab-block-features -->
				</div><!-- .ab-block-feature-wrap -->
			</div><!-- .panel-left -->

			<!-- Plugin help file panel -->
			<div id="plugin-help" class="panel-left">
				<!-- Grab feed of help file -->
				<?php
					$atomic_blocks_plugin_help = get_transient( 'atomic-blocks-plugin-help-feed' );

				if ( false === $atomic_blocks_plugin_help ) {
					$atomic_blocks_plugin_feed = wp_remote_get( 'https://atomicblocks.com/plugin-help-file//?atomicblocks_api=post_content' );

					if ( ! is_wp_error( $atomic_blocks_plugin_feed ) && 200 === wp_remote_retrieve_response_code( $atomic_blocks_plugin_feed ) ) {
						$atomic_blocks_plugin_help = json_decode( wp_remote_retrieve_body( $atomic_blocks_plugin_feed ) );
						set_transient( 'atomic-blocks-plugin-help-feed', $atomic_blocks_plugin_help, DAY_IN_SECONDS );
					} else {
						$atomic_blocks_plugin_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
						set_transient( 'atomic-blocks-plugin-help-feed', $atomic_blocks_plugin_help, MINUTE_IN_SECONDS * 5 );
					}
				}

					echo wp_kses_post( $atomic_blocks_plugin_help );
				?>
			</div>

			<!-- Theme help file panel -->
			<?php if ( function_exists( 'atomic_blocks_setup' ) ) { ?>
				<div id="theme-help" class="panel-left">
					<!-- Grab feed of help file -->
					<?php
						$atomic_blocks_theme_help = get_transient( 'atomic-blocks-theme-help-feed' );

					if ( false === $atomic_blocks_theme_help ) {
						$atomic_blocks_theme_feed = wp_remote_get( 'https://atomicblocks.com/theme-help-file//?atomicblocks_api=post_content' );

						if ( ! is_wp_error( $atomic_blocks_theme_feed ) && 200 === wp_remote_retrieve_response_code( $atomic_blocks_theme_feed ) ) {
							$atomic_blocks_theme_help = json_decode( wp_remote_retrieve_body( $atomic_blocks_theme_feed ) );
							set_transient( 'atomic-blocks-theme-help-feed', $atomic_blocks_theme_help, DAY_IN_SECONDS );
						} else {
							$atomic_blocks_theme_help = __( 'This help file feed seems to be temporarily down. You can always view the help file on the Atomic Blocks site in the meantime.', 'atomic-blocks' );
							set_transient( 'atomic-blocks-theme-help-feed', $atomic_blocks_theme_help, MINUTE_IN_SECONDS * 5 );
						}
					}

						echo wp_kses_post( $atomic_blocks_theme_help );
					?>
				</div><!-- #theme-help -->
			<?php } ?>

			<div class="panel-right">

				<?php if ( ! function_exists( 'atomic_blocks_setup' ) ) { ?>
				<div class="panel-aside panel-ab-plugin panel-club">
					<div class="panel-club-inside">
						<div class="cell panel-title">
							<h3><?php esc_html_e( 'Free Theme Download', 'atomic-blocks' ); ?></h3>
						</div>

						<ul>
							<li class="cell">
								<p><a class="ab-theme-image" href="<?php echo esc_url( 'https://goo.gl/FCT6xS' ); ?>"><img src="<?php echo esc_url( plugins_url( '../theme.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Atomic Blocks', 'atomic-blocks' ); ?>" /></a></p>

								<p><?php esc_html_e( 'Download our FREE Atomic Blocks theme to help you get started with the Atomic Blocks plugin and the new WordPress block editor.', 'atomic-blocks' ); ?></p>

								<a class="button-primary club-button" target="_blank" href="<?php echo esc_url( 'https://wordpress.org/themes/atomic-blocks/' ); ?>"><?php esc_html_e( 'Install Now', 'atomic-blocks' ); ?> &rarr;</a>
							</li>
						</ul>
					</div>
				</div>
				<?php } ?>

				<div class="panel-aside panel-ab-plugin panel-club">
					<div class="panel-club-inside">
						<div class="cell panel-title">
							<h3><?php esc_html_e( 'Stay Updated', 'atomic-blocks' ); ?></h3>
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
							<h3><?php esc_html_e( 'Free Blocks & Tutorials', 'atomic-blocks' ); ?></h3>
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
						<?php atomic_blocks_svg( 'question-circle' ); ?>
						<h3><?php esc_html_e( 'Documentation and Help', 'atomic-blocks' ); ?></h3>
						<p><?php esc_html_e( 'The Atomic Blocks wiki has helpful documentation, tips and tricks, code snippets, and more to help you get started.', 'atomic-blocks' ); ?></p>
						<a class="button-primary" href="https://github.com/studiopress/atomic-blocks/wiki"><?php esc_html_e( 'Browse the Wiki', 'atomic-blocks' ); ?></a>
					</div>

					<div class="ab-block-footer-column">
						<?php atomic_blocks_svg( 'bullhorn' ); ?>
						<h3><?php esc_html_e( 'Provide Feedback', 'atomic-blocks' ); ?></h3>
						<p><?php esc_html_e( 'We are always looking for quality feedback to continue improving Atomic Blocks and making it better with every release. ', 'atomic-blocks' ); ?></p>
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
