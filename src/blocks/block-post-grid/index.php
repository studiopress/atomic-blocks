<?php
/**
 * Server-side rendering for the post grid block
 *
 * @since   1.1.7
 * @package Atomic Blocks
 */

/**
 * Renders the post grid block on server.
 *
 * @param string $attributes  Pass the block attributes.
 * @return string HTML content for the post grid.
 */
function atomic_blocks_render_block_core_latest_posts( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;

	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';

	/* Setup the query */
	$grid_query = new WP_Query(
		array(
			'posts_per_page'      => $attributes['postsToShow'],
			'post_status'         => 'publish',
			'order'               => $attributes['order'],
			'orderby'             => $attributes['orderBy'],
			'cat'                 => $categories,
			'offset'              => $attributes['offset'],
			'post_type'           => $attributes['postType'],
			'ignore_sticky_posts' => 1,
			'post__not_in'        => array( $post->ID ), // Exclude the current post from the grid.
		)
	);

	$post_grid_markup = '';

	/* Start the loop */
	if ( $grid_query->have_posts() ) {

		while ( $grid_query->have_posts() ) {
			$grid_query->the_post();

			/* Setup the post ID */
			$post_id = get_the_ID();

			/* Setup the featured image ID */
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			/* Setup the post classes */
			$post_classes = 'ab-post-grid-item';

			/* Add sticky class */
			if ( is_sticky( $post_id ) ) {
				$post_classes .= ' sticky';
			} else {
				$post_classes .= null;
			}

			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

			/* Start the markup for the post */
			$post_grid_markup .= sprintf(
				'<article id="post-%1$s" class="%2$s">',
				esc_attr( $post_id ),
				esc_attr( $post_classes )
			);

			/* Get the featured image */
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {

				$post_thumb_size = 'full';

				if ( ! empty( $attributes['imageSize'] ) ) {
					$post_thumb_size = $attributes['imageSize'];
				}

				/* Output the featured image */
				$post_grid_markup .= sprintf(
					'<div class="ab-block-post-grid-image"><a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image( $post_thumb_id, $post_thumb_size )
				);
			}

			/* Wrap the text content */
			$post_grid_markup .= sprintf(
				'<div class="ab-block-post-grid-text">'
			);

				$post_grid_markup .= sprintf(
					'<header class="ab-block-post-grid-header">'
				);

					/* Get the post title */
					$title = get_the_title( $post_id );

			if ( ! $title ) {
				$title = __( 'Untitled', 'atomic-blocks' );
			}

			if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {

				if ( isset( $attributes['postTitleTag'] ) ) {
					$post_title_tag = $attributes['postTitleTag'];
				} else {
					$post_title_tag = 'h2';
				}

				$post_grid_markup .= sprintf(
					'<%3$s class="ab-block-post-grid-title"><a href="%1$s" rel="bookmark">%2$s</a></%3$s>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $title ),
					esc_attr( $post_title_tag )
				);
			}

			if ( isset( $attributes['postType'] ) && $attributes['postType'] === 'post' ) {
				/* Wrap the byline content */
				$post_grid_markup .= sprintf(
					'<div class="ab-block-post-grid-byline">'
				);

				/* Get the post author */
				if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
					$post_grid_markup .= sprintf(
						'<div class="ab-block-post-grid-author" itemprop="author" itemtype="https://schema.org/Person"><a class="ab-text-link" href="%2$s" itemprop="url" rel="author"><span itemprop="name">%1$s</span></a></div>',
						esc_html( get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) ),
						esc_html( get_author_posts_url( get_the_author_meta( 'ID' ) ) )
					);
				}

				/* Get the post date */
				if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
						$post_grid_markup .= sprintf(
							'<time datetime="%1$s" class="ab-block-post-grid-date" itemprop="datePublished">%2$s</time>',
							esc_attr( get_the_date( 'c', $post_id ) ),
							esc_html( get_the_date( '', $post_id ) )
						);
				}

				/* Close the byline content */
				$post_grid_markup .= sprintf(
					'</div>'
				);
			}

			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</header>'
			);

			/* Wrap the excerpt content */
			$post_grid_markup .= sprintf(
				'<div class="ab-block-post-grid-excerpt">'
			);

			/* Get the excerpt */

			// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket
			$excerpt = apply_filters( 'the_excerpt',
				get_post_field(
					'post_excerpt',
					$post_id,
					'display'
				)
			);

			if ( empty( $excerpt ) && isset( $attributes['excerptLength'] ) ) {
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket  -- Running the_excerpt directly, Previous rule doesn't take without the_excerpt being moved up a line
				$excerpt = apply_filters( 'the_excerpt',
					wp_trim_words(
						preg_replace(
							array(
								'/\<figcaption>.*\<\/figcaption>/',
								'/\[caption.*\[\/caption\]/',
							),
							'',
							get_the_content()
						),
						$attributes['excerptLength']
					)
				);
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
				$post_grid_markup .= wp_kses_post( $excerpt );
			}

			/* Get the read more link */
			if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
				$post_grid_markup .= sprintf(
					'<p><a class="ab-block-post-grid-more-link ab-text-link" href="%1$s" rel="bookmark">%2$s <span class="screen-reader-text">%3$s</span></a></p>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $attributes['readMoreText'] ),
					esc_html( $title )
				);
			}

			/* Close the excerpt content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the text content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the post */
			$post_grid_markup .= "</article>\n";
		}

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "ab-block-post-grid featured{$attributes['postType']} align{$attributes['align']}";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		/* Layout orientation class */
		$grid_class = 'ab-post-grid-items';

		if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
			$grid_class .= ' is-list';
		} else {
			$grid_class .= ' is-grid';
		}

		/* Grid columns class */
		if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
			$grid_class .= ' columns-' . $attributes['columns'];
		}

		/* Post grid section title */
		if ( isset( $attributes['displaySectionTitle'] ) && $attributes['displaySectionTitle'] && ! empty( $attributes['sectionTitle'] ) ) {
			if ( isset( $attributes['sectionTitleTag'] ) ) {
				$section_title_tag = $attributes['sectionTitleTag'];
			} else {
				$section_title_tag = 'h2';
			}

			$section_title = '<' . esc_attr( $section_title_tag ) . '>' . esc_html( $attributes['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
		} else {
			$section_title = null;
		}

		/* Post grid section tag */
		if ( isset( $attributes['sectionTag'] ) ) {
			$section_tag = $attributes['sectionTag'];
		} else {
			$section_tag = 'section';
		}

		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s">%3$s<div class="%4$s">%5$s</div></%1$s>',
			$section_tag,
			esc_attr( $class ),
			$section_title,
			esc_attr( $grid_class ),
			$post_grid_markup
		);
		return $block_content;
	}
}

/**
 * Registers the post grid block on server
 */
function atomic_blocks_register_block_core_latest_posts() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/* Block attributes */
	register_block_type(
		'atomic-blocks/ab-post-grid',
		array(
			'attributes'      => array(
				'categories'          => array(
					'type' => 'string',
				),
				'className'           => array(
					'type' => 'string',
				),
				'postsToShow'         => array(
					'type'    => 'number',
					'default' => 6,
				),
				'displayPostDate'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostAuthor'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostImage'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostLink'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaySectionTitle' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postTitleTag'        => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'postLayout'          => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'columns'             => array(
					'type'    => 'number',
					'default' => 2,
				),
				'align'               => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'width'               => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'               => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'             => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'readMoreText'        => array(
					'type'    => 'string',
					'default' => 'Continue Reading',
				),
				'offset'              => array(
					'type'    => 'number',
					'default' => 0,
				),
				'excerptLength'       => array(
					'type'    => 'number',
					'default' => 55,
				),
				'postType'            => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'sectionTag'          => array(
					'type'    => 'string',
					'default' => 'section',
				),
				'sectionTitle'        => array(
					'type' => 'string',
				),
				'sectionTitleTag'     => array(
					'type'    => 'string',
					'default' => 'h2',
				),
				'imageSize'           => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'url'                 => array(
					'type'      => 'string',
					'source'    => 'attribute',
					'selector'  => 'img',
					'attribute' => 'src',
				),
				'id'                  => array(
					'type' => 'number',
				),
			),
			'render_callback' => 'atomic_blocks_render_block_core_latest_posts',
		)
	);
}
add_action( 'init', 'atomic_blocks_register_block_core_latest_posts' );


/**
 * Create API fields for additional info
 */
function atomic_blocks_register_rest_fields() {
	/* Add landscape featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src',
		array(
			'get_callback'    => 'atomic_blocks_get_image_src_landscape',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add square featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src_square',
		array(
			'get_callback'    => 'atomic_blocks_get_image_src_square',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add author info */
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback'    => 'atomic_blocks_get_author_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'atomic_blocks_register_rest_fields' );


/**
 * Get landscape featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
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
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
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
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function atomic_blocks_get_author_info( $object, $field_name, $request ) {
	/* Get the author name */
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	/* Get the author link */
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	/* Return the author data */
	return $author_data;
}
