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
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
		'category' => $attributes['categories'],
	), 'OBJECT' );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		// Get the post ID
		$post_id = $post->ID;

		// Get the post thumbnail 
		$post_thumb_id = get_post_thumbnail_id( $post_id );

		if ( $post_thumb_id ) {
			$post_thumb_class = 'has-thumb';
		} else {
			$post_thumb_class = 'no-thumb';
		}

		// Start the markup for the post
		$list_items_markup .= sprintf(
			'<article class="%1$s">',
			esc_attr( $post_thumb_class )
		);
		
		if ( $post_thumb_id ) {
			$list_items_markup .= sprintf( 
				'<div class="ab-block-post-grid-image"><a href="%1$s" rel="bookmark">%2$s</a></div>',
				esc_url( get_permalink( $post_id ) ),
				wp_get_attachment_image( $post_thumb_id, 'medium_large' ) 
			);
		}

		// Wrap the text content
		$list_items_markup .= sprintf(
			'<div class="ab-block-post-grid-text">'
		);

		// Get the post title 
		$title = get_the_title( $post_id );

		if ( ! $title ) {
			$title = __( 'Untitled', 'atomic-blocks' );
		}

		$list_items_markup .= sprintf(
			'<h2 class="ab-block-post-grid-title"><a href="%1$s" rel="bookmark">%2$s</a></h2>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);

		// Get the post date
		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="ab-block-post-grid-date">%2$s</time>',
				esc_attr( get_the_date( 'c', $post_id ) ),
				esc_html( get_the_date( '', $post_id ) )
			);
		}

		// Get the post author
		$author_id = $post->post_author;
		if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
			$list_items_markup .= sprintf(
				'<a class="entry-byline-author" href="%2$s">%1$s</a>',
				esc_html( get_the_author_meta( 'display_name', $author_id ) ),
				esc_url( get_author_posts_url( $author_id ) )
			);
		}

		// Get the excerpt
		$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $post_id, 'display' ) );

		if( empty( $excerpt ) ) {
			$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post->post_content, 55 ) );
		}

		if ( ! $excerpt ) {
			$excerpt = null;
		}

		if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
			$list_items_markup .= wp_kses_post( $excerpt );
		}

		// Wrap the text content
		$list_items_markup .= sprintf(
			'</div>'
		);

		// Close the markup for the post
		$list_items_markup .= "</article>\n";
	}

	// Build the classes
	$class = "ab-block-post-grid align{$attributes['align']}";

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}
	
	$grid_class = 'ab-post-grid-items';

	if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
		$grid_class .= ' is-list';
	} else {
		$grid_class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$grid_class .= ' columns-' . $attributes['columns'];
	}

	// Output the post markup
	$block_content = sprintf(
		'<div class="%1$s"><div class="%2$s">%3$s</div></div>',
		esc_attr( $class ),
		esc_attr( $grid_class ),
		$list_items_markup
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
				'default' => 5,
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
		),
		'render_callback' => 'atomic_blocks_render_block_core_latest_posts',
	) );
}

add_action( 'init', 'atomic_blocks_register_block_core_latest_posts' );


/**
 * Create an API field for the featured image
 */
function atomic_blocks_add_thumbnail_to_JSON() {
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback'    => 'atomic_blocks_get_image_src',
			'update_callback' => null,
			'schema'          => null,
			)
		);
	}
add_action( 'rest_api_init', 'atomic_blocks_add_thumbnail_to_JSON' );

/**
 * Build the featured image
 */
function atomic_blocks_get_image_src( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
	$object['featured_media'],
		'medium_large',
		false
	);
	return $feat_img_array[0];
}
