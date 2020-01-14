<?php
/**
 * Server-side rendering for the container block
 *
 * @since   2.5.0
 * @package Atomic Blocks
 */

/**
 * Filters the content of a single block.
 *
 * @since 2.5.0
 *
 * @param string $block_content The block content about to be appended.
 * @param array  $block         The full block, including name and attributes.
 * @return string Block content.
 */
function atomic_blocks_filter_container_block_for_amp( $block_content, $block ) {
	if ( ! (
		isset( $block['blockName'] )
		&&
		'atomic-blocks/ab-container' !== $block['blockName']
		&&
		function_exists( 'is_amp_endpoint' )
		&&
		is_amp_endpoint()
	) ) {
		$block_content = preg_replace(
			'/(?<=<img class="ab-container-image has-background-dim")/',
			' object-fit="cover" ',
			$block_content
		);
	}

	return $block_content;
}
add_filter( 'render_block', 'atomic_blocks_filter_container_block_for_amp', 10, 2 );
