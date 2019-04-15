<?php
/**
 * Atomic Blocks Test Framework.
 *
 * @package AtomicBlocks\Tests
 */

/**
 * Bootstraps the test environment.
 */
function atomic_blocks_bootstrap_tests() {

	$atomic_blocks_test_dir = getenv( 'WP_TESTS_DIR' );

	if ( ! $atomic_blocks_test_dir ) {
		$atomic_blocks_test_dir = '/tmp/wordpress-tests-lib';
	}

	require_once $atomic_blocks_test_dir . '/includes/functions.php';

	tests_add_filter( 'muplugins_loaded', __NAMESPACE__ . '\atomic_blocks_manually_load_plugin' );

	require_once $atomic_blocks_test_dir . '/includes/bootstrap.php';

	activate_plugin( 'atomic-blocks/atomicblocks.php' );
}

/**
 * Loads the main Atomic Blocks plugin file.
 */
function atomic_blocks_manually_load_plugin() {
	require_once __DIR__ . '/../atomicblocks.php';
}

// Bootstrap the test environment.
atomic_blocks_bootstrap_tests();
