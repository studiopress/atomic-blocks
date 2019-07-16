<?php
/**
 * Server-side rendering for the sharing block
 *
 * @since   1.1.2
 * @package Atomic Blocks
 */

/**
 * Register the block on the server
 */
function atomic_blocks_register_sharing() {

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'atomic-blocks/ab-sharing',
		array(
			'style'           => 'atomic-blocks-style-css',
			'attributes'      => array(
				'facebook'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'twitter'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'linkedin'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'pinterest'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'email'            => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'reddit'           => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'shareAlignment'   => array(
					'type' => 'string',
				),
				'shareButtonStyle' => array(
					'type'    => 'string',
					'default' => 'ab-share-icon-text',
				),
				'shareButtonShape' => array(
					'type'    => 'string',
					'default' => 'ab-share-shape-circular',
				),
				'shareButtonSize'  => array(
					'type'    => 'string',
					'default' => 'ab-share-size-medium',
				),
				'shareButtonColor' => array(
					'type'    => 'string',
					'default' => 'ab-share-color-standard',
				),
			),
			'render_callback' => 'atomic_blocks_render_sharing',
		)
	);
}
add_action( 'init', 'atomic_blocks_register_sharing' );


/**
 * Add the pop-up share window to the footer
 */
function atomic_blocks_social_icon_footer_script() {

	if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
		return;
	}
	?>
	<script type="text/javascript">
		function atomicBlocksShare( url, title, w, h ){
			var left = ( window.innerWidth / 2 )-( w / 2 );
			var top  = ( window.innerHeight / 2 )-( h / 2 );
			return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=600, height=600, top='+top+', left='+left);
		}
	</script>
	<?php
}
add_action( 'wp_footer', 'atomic_blocks_social_icon_footer_script' );

/**
 * Render the sharing links
 *
 * @param array $attributes The block attributes.
 *
 * @return string The block HTML.
 */
function atomic_blocks_render_sharing( $attributes ) {
	global $post;

	if ( has_post_thumbnail() ) {
		$thumbnail_id = get_post_thumbnail_id( $post->ID );
		$thumbnail    = $thumbnail_id ? current( wp_get_attachment_image_src( $thumbnail_id, 'large', true ) ) : '';
	} else {
		$thumbnail = null;
	}

	$is_amp_endpoint = function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();

	$twitter_url = 'http://twitter.com/share?text=' . get_the_title() . '&url=' . get_the_permalink() . '';

	$facebook_url = 'https://www.facebook.com/sharer/sharer.php?u=' . get_the_permalink() . '&title=' . get_the_title() . '';

	$linkedin_url = 'https://www.linkedin.com/shareArticle?mini=true&url=' . get_the_permalink() . '&title=' . get_the_title() . '';

	$pinterest_url = 'https://pinterest.com/pin/create/button/?&url=' . get_the_permalink() . '&description=' . get_the_title() . '&media=' . esc_url( $thumbnail ) . '';

	$email_url = 'mailto:?subject=' . get_the_title() . '&body=' . get_the_title() . '&mdash;' . get_the_permalink() . '';

	$reddit_url = 'https://www.reddit.com/submit?url=' . get_the_permalink() . '';

	$share_url = '';

	if ( isset( $attributes['twitter'] ) && $attributes['twitter'] ) {

		$href_format = sprintf( 'href="javascript:void(0)" onClick="javascript:atomicBlocksShare(\'%1$s\', \'%2$s\', \'600\', \'600\')"', esc_url( $twitter_url ), esc_html__( 'Share on Twitter', 'atomic-blocks' ) );

		if ( $is_amp_endpoint ) {
			$href_format = sprintf( 'href="%1$s"', esc_url( $twitter_url ) );
		}

		$share_url .= sprintf(
			'<li>
			<a
				%1$s
				class="ab-share-twitter"
				title="%2$s">
				<i class="fab fa-twitter"></i> <span class="ab-social-text">%2$s</span>
			</a>
		</li>',
			$href_format,
			esc_html__( 'Share on Twitter', 'atomic-blocks' )
		);
	}

	if ( isset( $attributes['facebook'] ) && $attributes['facebook'] ) {

		$href_format = sprintf( 'href="javascript:void(0)" onClick="javascript:atomicBlocksShare(\'%1$s\', \'%2$s\', \'600\', \'600\')"', esc_url( $facebook_url ), esc_html__( 'Share on Facebook', 'atomic-blocks' ) );

		if ( $is_amp_endpoint ) {
			$href_format = sprintf( 'href="%1$s"', esc_url( $facebook_url ) );
		}

		$share_url .= sprintf(
			'<li>
				<a
					%1$s
					class="ab-share-facebook"
					title="%2$s">
					<i class="fab fa-facebook-f"></i> <span class="ab-social-text">%2$s</span>
				</a>
			</li>',
			$href_format,
			esc_html__( 'Share on Facebook', 'atomic-blocks' )
		);
	}

	if ( isset( $attributes['pinterest'] ) && $attributes['pinterest'] ) {

		$href_format = sprintf( 'href="javascript:void(0)" onClick="javascript:atomicBlocksShare(\'%1$s\', \'%2$s\', \'600\', \'600\')"', esc_url( $pinterest_url ), esc_html__( 'Share on Pinterest', 'atomic-blocks' ) );

		if ( $is_amp_endpoint ) {
			$href_format = sprintf( 'href="%1$s"', esc_url( $pinterest_url ) );
		}

		$share_url .= sprintf(
			'<li>
				<a
					%1$s
					class="ab-share-pinterest"
					title="%2$s">
					<i class="fab fa-pinterest-p"></i> <span class="ab-social-text">%2$s</span>
				</a>
			</li>',
			$href_format,
			esc_html__( 'Share on Pinterest', 'atomic-blocks' )
		);
	}

	if ( isset( $attributes['linkedin'] ) && $attributes['linkedin'] ) {

		$href_format = sprintf( 'href="javascript:void(0)" onClick="javascript:atomicBlocksShare(\'%1$s\', \'%2$s\', \'600\', \'600\')"', esc_url( $linkedin_url ), esc_html__( 'Share on LinkedIn', 'atomic-blocks' ) );

		if ( $is_amp_endpoint ) {
			$href_format = sprintf( 'href="%1$s"', esc_url( $linkedin_url ) );
		}

		$share_url .= sprintf(
			'<li>
				<a
					%1$s
					class="ab-share-linkedin"
					title="%2$s">
					<i class="fab fa-linkedin-in"></i> <span class="ab-social-text">%2$s</span>
				</a>
			</li>',
			$href_format,
			esc_html__( 'Share on LinkedIn', 'atomic-blocks' )
		);
	}

	if ( isset( $attributes['reddit'] ) && $attributes['reddit'] ) {

		$href_format = sprintf( 'href="javascript:void(0)" onClick="javascript:atomicBlocksShare(\'%1$s\', \'%2$s\', \'600\', \'600\')"', esc_url( $reddit_url ), esc_html__( 'Share on Reddit', 'atomic-blocks' ) );

		if ( $is_amp_endpoint ) {
			$href_format = sprintf( 'href="%1$s"', esc_url( $reddit_url ) );
		}

		$share_url .= sprintf(
			'<li>
				<a
					%1$s
					class="ab-share-reddit"
					title="%2$s">
					<i class="fab fa-reddit-alien"></i> <span class="ab-social-text">%2$s</span>
				</a>
			</li>',
			$href_format,
			esc_html__( 'Share on Reddit', 'atomic-blocks' )
		);
	}

	if ( isset( $attributes['email'] ) && $attributes['email'] ) {
		if ( ! $is_amp_endpoint ) {
			$share_url .= sprintf(
				'<li>
					<a
						href="%1$s"
						class="ab-share-email"
						title="%2$s">
						<i class="fas fa-envelope"></i> <span class="ab-social-text">%2$s</span>
					</a>
				</li>',
				esc_url( $email_url ),
				esc_html__( 'Share via Email', 'atomic-blocks' )
			);
		}
	}

	$block_content = sprintf(
		'<div class="wp-block-atomic-blocks-ab-sharing ab-block-sharing %2$s %3$s %4$s %5$s %6$s">
			<ul class="ab-share-list">%1$s</ul>
		</div>',
		$share_url,
		isset( $attributes['shareButtonStyle'] ) ? $attributes['shareButtonStyle'] : null,
		isset( $attributes['shareButtonShape'] ) ? $attributes['shareButtonShape'] : null,
		isset( $attributes['shareButtonSize'] ) ? $attributes['shareButtonSize'] : null,
		isset( $attributes['shareButtonColor'] ) ? $attributes['shareButtonColor'] : null,
		isset( $attributes['shareAlignment'] ) ? 'ab-align-' . $attributes['shareAlignment'] : null
	);

	return $block_content;
}
