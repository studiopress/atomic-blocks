<?php
/**
 * Server-side rendering of the `core/latest-posts` block.
 *
 * @package gutenberg
 */

/**
 * Renders the `core/latest-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function atomic_blocks_render_block_core_latest_posts( $attributes ) {
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order'       => $attributes['order'],
		'orderby'     => $attributes['orderBy'],
		'category'    => $attributes['categories'],
	) );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id = $post['ID'];
		$post_thumb_id = get_post_thumbnail_id( $post_id );

		$title = get_the_title( $post_id );
		if ( ! $title ) {
			$title = __( '(Untitled)', 'gutenberg' );
		}

		$list_items_markup .= sprintf(
			'<li>'
		);

		if ( $post_thumb_id ) {
			$list_items_markup .= sprintf( wp_get_attachment_image( $post_thumb_id, 'medium_large' ) );
		}

		$list_items_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
				esc_attr( get_the_date( 'c', $post_id ) ),
				esc_html( get_the_date( '', $post_id ) )
			);
		}

		$list_items_markup .= "</li>\n";
	}

	$class = "wp-block-latest-posts align{$attributes['align']}";
	if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' columns-' . $attributes['columns'];
	}

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr( $class ),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function atomic_blocks_register_block_core_latest_posts() {
	register_block_type( 'atomic-blocks/ab-post-grid', array(
		'attributes'      => array(
			'categories'      => array(
				'type' => 'string',
			),
			'className'       => array(
				'type' => 'string',
			),
			'postsToShow'     => array(
				'type'    => 'number',
				'default' => 5,
			),
			'displayPostDate' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'displayPostExcerpt' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'postLayout'      => array(
				'type'    => 'string',
				'default' => 'list',
			),
			'columns'         => array(
				'type'    => 'number',
				'default' => 3,
			),
			'align'           => array(
				'type'    => 'string',
				'default' => 'center',
			),
			'order'           => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'         => array(
				'type'    => 'string',
				'default' => 'date',
			),
		),
		'render_callback' => 'atomic_blocks_render_block_core_latest_posts',
	) );
}

add_action( 'init', 'atomic_blocks_register_block_core_latest_posts' );


/**
 * Create a field for the featured image
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

function atomic_blocks_get_image_src( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
	$object['featured_media'],
		'thumbnail',
		false
	);
	return $feat_img_array[0];
}
