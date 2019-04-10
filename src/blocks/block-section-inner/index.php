<?php
/**
 * Server-side rendering for the layout block
 *
 * @since 	1.5.4
 * @package Atomic Blocks
 */

/**
* Register the block on the server
*/
function atomic_blocks_register_layout() {

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register the sharing block
	register_block_type(
		'atomic-blocks/ab-layout-column', array(
			'style' => 'atomic-blocks-style-css',
			'attributes' => array(
                'facebook' => array(
					'type'    => 'boolean',
					'default' => true,
                ),
			),
			'render_callback' => 'atomic_blocks_render_layout',
		)
	);
}
add_action( 'init', 'atomic_blocks_register_layout' );


/**
 * Render the layout
 */
function atomic_blocks_render_layout( $attributes, $content ) {

	//global $post;

	return $content;


	// // Render the list of share links
	// $block_content = sprintf(
	// 	'<div class="wp-block-atomic-blocks-ab-sharing ab-block-sharing %2$s %3$s %4$s %5$s %6$s">
	// 		<ul class="ab-share-list">%1$s</ul>
	// 	</div>',
	// 	$share_url,
	// 	isset( $attributes['shareButtonStyle'] ) ? $attributes['shareButtonStyle'] : null,
	// 	isset( $attributes['shareButtonShape'] ) ? $attributes['shareButtonShape'] : null,
	// 	isset( $attributes['shareButtonSize'] ) ? $attributes['shareButtonSize'] : null,
	// 	isset( $attributes['shareButtonColor'] ) ? $attributes['shareButtonColor'] : null,
	// 	isset( $attributes['shareAlignment'] ) ? $attributes['shareAlignment'] : null
	// );

	// return $block_content;
}
