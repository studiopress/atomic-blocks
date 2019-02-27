<?php
/**
 * Server-side rendering for the post grid block
 *
 * @since 	1.1.7
 * @package Atomic Blocks
 */

/**
 * Renders the post grid block on server.
 */
function atomic_blocks_render_block_core_latest_posts( $attributes ) {

	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';

	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
		'category' => $categories,
		'offset' => $attributes['offset'],
		'post__not_in' => get_option('sticky_posts'),
		'post_type' => $attributes['postType'],
	), 'OBJECT' );

	$list_items_markup = '';

	if ( $recent_posts ) {
		foreach ( $recent_posts as $post ) {
			// Get the post ID
			$post_id = $post->ID;

			// Get the post thumbnail
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			if ( $post_thumb_id && isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] ) {
				$post_thumb_class = 'has-thumb';
			} else {
				$post_thumb_class = 'no-thumb';
			}

			$post_classes = join( ' ', get_post_class( $post_thumb_class, $post->ID ) );

			// Start the markup for the post
			$list_items_markup .= sprintf(
				'<article id="post-%1$s" class="%2$s">',
				esc_attr( $post->ID ),
				esc_attr( $post_classes )
			);

			// Get the featured image
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {
				if( $attributes['imageCrop'] === 'landscape' ) {
					$post_thumb_size = 'ab-block-post-grid-landscape';
				} else {
					$post_thumb_size = 'ab-block-post-grid-square';
				}

				$alt = get_post_meta( $post_thumb_id, '_wp_attachment_image_alt', true );

				if ( ! $alt ) {
					$link_alt = get_the_title( $post_id );
				} else {
					$link_alt = null;
				}

				$list_items_markup .= sprintf(
					'<div class="ab-block-post-grid-image"><a href="%1$s" rel="bookmark" alt="%3$s">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image( $post_thumb_id, $post_thumb_size ),
					esc_attr( $link_alt )
				);
			}

			// Wrap the text content
			$list_items_markup .= sprintf(
				'<div class="ab-block-post-grid-text">'
			);

				$list_items_markup .= sprintf(
					'<header class="entry-header">'
				);

					// Get the post title
					$title = get_the_title( $post_id );

					if ( ! $title ) {
						$title = __( 'Untitled', 'atomic-blocks' );
					}

					if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {
						$list_items_markup .= sprintf(
							'<h2 class="ab-block-post-grid-title entry-title"><a href="%1$s" rel="bookmark">%2$s</a></h2>',
							esc_url( get_permalink( $post_id ) ),
							esc_html( $title )
						);
					}

					if ( isset( $attributes['postType'] ) && $attributes['postType'] == 'post' ) {
						// Wrap the byline content
						$list_items_markup .= sprintf(
							'<div class="ab-block-post-grid-byline entry-meta">'
						);

							// Get the post author
							if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
								$list_items_markup .= sprintf(
									'<div class="ab-block-post-grid-author entry-author" itemprop="author" itemtype="https://schema.org/Person"><a class="ab-text-link entry-author-link" href="%2$s" itemprop="url" rel="author"><span class="entry-author-name" itemprop="name">%1$s</span></a></div>',
									esc_html( get_the_author_meta( 'display_name', $post->post_author ) ),
									esc_html( get_author_posts_url( $post->post_author ) )
								);
							}

							// Get the post date
							if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
								$list_items_markup .= sprintf(
									'<time datetime="%1$s" class="ab-block-post-grid-date entry-time" itemprop="datePublished">%2$s</time>',
									esc_attr( get_the_date( 'c', $post_id ) ),
									esc_html( get_the_date( '', $post_id ) )
								);
							}

						// Close the byline content
						$list_items_markup .= sprintf(
							'</div>'
						);
					}

				$list_items_markup .= sprintf(
					'</header>'
				);

				// Wrap the excerpt content
				$list_items_markup .= sprintf(
					'<div class="ab-block-post-grid-excerpt entry-content">'
				);

					// Get the excerpt
					$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $post_id, 'display' ) );

					if( empty( $excerpt ) && isset( $attributes['excerptLength'] ) ) {
						$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post->post_content, $attributes['excerptLength'] ) );
					}

					if ( ! $excerpt ) {
						$excerpt = null;
					}

					if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
						$list_items_markup .=  wp_kses_post( $excerpt );
					}

					if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
						$list_items_markup .= sprintf(
							'<p><a class="ab-block-post-grid-link ab-text-link" href="%1$s" rel="bookmark">%2$s <span class="screen-reader-text">%3$s</span></a></p>',
							esc_url( get_permalink( $post_id ) ),
							esc_html( $attributes['readMoreText'] ),
							esc_html( $title )
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
			$list_items_markup .= "</article>\n";
		}
	}

	// Build the classes
	$class = "ab-block-post-grid featured{$attributes['postType']} align{$attributes['align']}";

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	// Layout orientation class
	$grid_class = 'ab-post-grid-items';

	if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
		$grid_class .= ' is-list';
	} else {
		$grid_class .= ' is-grid';
	}

	// Grid columns class
	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$grid_class .= ' columns-' . $attributes['columns'];
	}

	// Post grid section title
	if ( ! empty( $attributes['sectionTitle'] ) ) {
		$section_title = '<h3>' . $attributes['sectionTitle'] . '</h3>';
	} else {
		$section_title = null;
	}

	// Output the post markup
	$block_content = sprintf(
		'<section class="%1$s">%4$s<div class="%2$s">%3$s</div></section>',
		esc_attr( $class ),
		esc_attr( $grid_class ),
		$list_items_markup,
		$section_title
	);

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function atomic_blocks_register_block_core_latest_posts() {

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'atomic-blocks/ab-post-grid', array(
		'attributes' => array(
			'categories' => array(
				'type' => 'string',
			),
			'className' => array(
				'type' => 'string',
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 6,
			),
			'displayPostDate' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostExcerpt' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostAuthor' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostImage' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostLink' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostTitle' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displaySectionTitle' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'excludeSticky' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'postLayout' => array(
				'type' => 'string',
				'default' => 'grid',
			),
			'columns' => array(
				'type' => 'number',
				'default' => 2,
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center',
			),
			'width' => array(
				'type' => 'string',
				'default' => 'wide',
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc',
			),
			'orderBy'  => array(
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
			'offset' => array(
				'type' => 'number',
				'default' => 0,
			),
			'excerptLength' => array(
				'type' => 'number',
				'default' => 55,
			),
			'postType' => array(
				'type' => 'string',
				'default' => 'post',
			),
			'sectionTitle' => array(
				'type' => 'string',
			),
		),
		'render_callback' => 'atomic_blocks_render_block_core_latest_posts',
	) );
}

add_action( 'init', 'atomic_blocks_register_block_core_latest_posts' );


/**
 * Create API fields for additional info
 */
function atomic_blocks_register_rest_fields() {
	// Add landscape featured image source
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback' => 'atomic_blocks_get_image_src_landscape',
			'update_callback' => null,
			'schema' => null,
		)
	);

	// Add square featured image source
	register_rest_field(
		'post',
		'featured_image_src_square',
		array(
			'get_callback' => 'atomic_blocks_get_image_src_square',
			'update_callback' => null,
			'schema' => null,
		)
	);

	// Add author info
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback' => 'atomic_blocks_get_author_info',
			'update_callback' => null,
			'schema' => null,
		)
	);
}
add_action( 'rest_api_init', 'atomic_blocks_register_rest_fields' );


/**
 * Get landscape featured image source for the rest field
 */
function atomic_blocks_get_image_src_landscape( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'ab-block-post-grid-landscape',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get square featured image source for the rest field
 */
function atomic_blocks_get_image_src_square( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'ab-block-post-grid-square',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get author info for the rest field
 */
function atomic_blocks_get_author_info( $object, $field_name, $request ) {
	// Get the author name
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	// Get the author link
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	// Return the author data
	return $author_data;
}
