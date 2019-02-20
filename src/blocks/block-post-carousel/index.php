<?php
/**
 * Server-side rendering for the post carousel block
 *
 * @since 	1.1.7
 * @package LSX BLOCKS
 */

/**
 * Renders the post carousel block on server.
 */
function lsx_blocks_render_block_core_latest_posts_carousel( $attributes ) {

	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';

	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShowCarousel'],
		'post_status' => 'publish',
		'order' => $attributes['orderCarousel'],
		'orderby' => $attributes['orderByCarousel'],
		'category' => $categories,
	), 'OBJECT' );

	$list_items_markup = '';

	if ( $recent_posts ) {
		foreach ( $recent_posts as $post ) {
			// Get the post ID
			$post_id = $post->ID;

			// Get the post thumbnail
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			if ( $post_thumb_id && isset( $attributes['displayPostImageCarousel'] ) && $attributes['displayPostImageCarousel'] ) {
				$post_thumb_class = 'has-thumb';
			} else {
				$post_thumb_class = 'no-thumb';
			}

			// Start the markup for the post
			$list_items_markup .= sprintf(
				'<div class="%1$s">',
				esc_attr( $post_thumb_class )
			);

			// Get the featured image
			if ( isset( $attributes['displayPostImageCarousel'] ) && $attributes['displayPostImageCarousel'] && $post_thumb_id ) {
				if ( 'landscape' === $attributes['imageCrop'] ) {
					$post_thumb_size = 'lsx-block-post-grid-landscape';
				} else {
					$post_thumb_size = 'lsx-block-post-grid-square';
				}

				$list_items_markup .= sprintf(
					'<div class="lsx-block-post-grid-image"><a href="%1$s" rel="bookmark">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image( $post_thumb_id, $post_thumb_size )
				);
			}

			// Wrap the text content
			$list_items_markup .= sprintf(
				'<div class="lsx-block-post-grid-text">'
			);

				// Get the post title
				$title = get_the_title( $post_id );

				if ( ! $title ) {
					$title = __( 'Untitled', 'lsx-blocks' );
				}

				// Wrap the byline content
				$list_items_markup .= sprintf(
					'<div class="lsx-block-post-grid-byline">'
				);

					if ( isset( $attributes['displayPostAuthorCarousel'] ) && $attributes['displayPostAuthorCarousel'] ) {
						$list_items_markup .= sprintf(
							'<div class="lsx-block-post-avatar"><img src="%1$s" alt="avatar"/></div>',
							esc_html( get_avatar_url( $post->post_author ) )
						);
					}
					// Get the post date
					if ( isset( $attributes['displayPostDateCarousel'] ) && $attributes['displayPostDateCarousel'] ) {
						$list_items_markup .= sprintf(
							'<time datetime="%1$s" class="lsx-block-post-grid-date">%2$s</time>',
							esc_attr( get_the_date( 'c', $post_id ) ),
							esc_html( get_the_date( '', $post_id ) )
						);
					}

					// Get the post author
					if ( isset( $attributes['displayPostAuthorCarousel'] ) && $attributes['displayPostAuthorCarousel'] ) {
						$list_items_markup .= sprintf(
							'<div class="lsx-block-post-grid-author"><a class="lsx-text-link" href="%2$s">%1$s</a></div>',
							esc_html( get_the_author_meta( 'display_name', $post->post_author ) ),
							esc_html( get_author_posts_url( $post->post_author ) )
						);
					}

				// Close the byline content

				$list_items_markup .= sprintf(
					'</div>'
				);

				$list_items_markup .= sprintf(
					'<h2 class="lsx-block-post-grid-title"><a href="%1$s" rel="bookmark">%2$s</a></h2>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $title )
				);

				// Wrap the excerpt content
				$list_items_markup .= sprintf(
					'<div class="lsx-block-post-grid-excerpt">'
				);

					// Get the excerpt
					$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $post_id, 'display' ) );

					if ( empty( $excerpt ) ) {
						$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post->post_content, 20 ) );
					}

					if ( ! $excerpt ) {
						$excerpt = null;
					}

					if ( isset( $attributes['displayPostExcerptCarousel'] ) && $attributes['displayPostExcerptCarousel'] ) {
						$list_items_markup .= wp_kses_post( $excerpt );
					}

					if ( isset( $attributes['displayPostLinkCarousel'] ) && $attributes['displayPostLinkCarousel'] ) {
						$list_items_markup .= sprintf(
							'<p><a class="lsx-block-post-grid-link lsx-text-link" href="%1$s" rel="bookmark">%2$s</a></p>',
							esc_url( get_permalink( $post_id ) ),
							esc_html( $attributes['readMoreText'] )
						);
					}

				// Close the excerpt content
				$list_items_markup .= sprintf(
					'</div>'
				);

			// Wrap the text content
			$list_items_markup .= sprintf(
				'</div>'
			);

			// Close the markup for the post
			$list_items_markup .= "</div>\n";
		}
	}

	// Build the classes
	$class = "lsx-block-post-carousel align{$attributes['alignCarousel']}";

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$grid_class = 'lsx-post-carousel-items slick-slider';

	if ( isset( $attributes['columnsCarousel'] ) ) {
		$grid_class .= ' columns-' . $attributes['columnsCarousel'];
	}

	$slides_to_show   = $attributes['columnsCarousel'];
	$slides_to_scroll = $attributes['columnsCarousel'];
	$interval         = 'data-interval="false"';
	$slick_internal   = "data-slick='{ \"slidesToShow\": {$slides_to_show}, \"slidesToScroll\": {$slides_to_scroll} }'";

	// Output the post markup
	$block_content = sprintf(
		'<div class="%1$s"><div class="%2$s"' . $slick_internal . $interval . '>%3$s</div></div>',
		esc_attr( $class ),
		esc_attr( $grid_class ),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function lsx_blocks_register_block_core_latest_posts_carousel() {

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'lsx-blocks/lsx-post-carousel', array(
		'attributes' => array(
			'categories' => array(
				'type' => 'string',
			),
			'className' => array(
				'type' => 'string',
			),
			'postsToShowCarousel' => array(
				'type' => 'number',
				'default' => 6,
			),
			'displayPostDateCarousel' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostExcerptCarousel' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostAuthorCarousel' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostImageCarousel' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostLinkCarousel' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'columnsCarousel' => array(
				'type' => 'number',
				'default' => 3,
			),
			'alignCarousel' => array(
				'type' => 'string',
				'default' => 'center',
			),
			'width' => array(
				'type' => 'string',
				'default' => 'wide',
			),
			'orderCarousel' => array(
				'type' => 'string',
				'default' => 'desc',
			),
			'orderByCarousel'  => array(
				'type' => 'string',
				'default' => 'date',
			),
			'imageCrop'  => array(
				'type' => 'string',
				'default' => 'landscape',
			),
			'readMoreText'  => array(
				'type' => 'string',
				'default' => 'Continue Reading',
			),
		),
		'render_callback' => 'lsx_blocks_render_block_core_latest_posts_carousel',
	) );
}

add_action( 'init', 'lsx_blocks_register_block_core_latest_posts_carousel' );


/**
 * Create API fields for additional info
 */
function lsx_blocks_register_rest_fields_carousel() {
	// Add landscape featured image source
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback' => 'lsx_blocks_get_image_src_landscape_carousel',
			'update_callback' => null,
			'schema' => null,
		)
	);

	// Add square featured image source
	register_rest_field(
		'post',
		'featured_image_src_square',
		array(
			'get_callback' => 'lsx_blocks_get_image_src_square_carousel',
			'update_callback' => null,
			'schema' => null,
		)
	);

	// Add author info
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback' => 'lsx_blocks_get_author_info_carousel',
			'update_callback' => null,
			'schema' => null,
		)
	);
}
add_action( 'rest_api_init', 'lsx_blocks_register_rest_fields_carousel' );


/**
 * Get landscape featured image source for the rest field
 */
function lsx_blocks_get_image_src_landscape_carousel( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'lsx-block-post-grid-landscape',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get square featured image source for the rest field
 */
function lsx_blocks_get_image_src_square_carousel( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'lsx-block-post-grid-square',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get author info for the rest field
 */
function lsx_blocks_get_author_info_carousel( $object, $field_name, $request ) {
	// Get the author name
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	// Get the author link
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	// Get the author avatar
	$author_data['author_avatar'] = get_avatar_url( $object['author'] );

	// Return the author data
	return $author_data;
}
