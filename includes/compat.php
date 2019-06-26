<?php
/**
 * Compatibility related functionality.
 *
 * Handles things like PHP version requirements
 * not met, unregistering blocks, etc.
 *
 * This file should remain PHP 5.2 compatible.
 *
 * @package AtomicBlocks\Compatibility
 */

if ( PHP_VERSION_ID < 50600 ) {
	add_action( 'enqueue_block_editor_assets', 'atomic_blocks_unregister_incompatible_blocks' );
}
/**
 * Unregisters certain blocks on sites
 * running PHP < 5.6.
 */
function atomic_blocks_unregister_incompatible_blocks() {
	?>
	<script>
		window.addEventListener( 'DOMContentLoaded', function() {
			wp.domReady( function() {
				wp.blocks.unregisterBlockType( 'atomic-blocks/newsletter' );
				wp.blocks.unregisterBlockType( 'atomic-blocks/ab-layouts' );
			} );
		} );
	</script>
	<?php
}
