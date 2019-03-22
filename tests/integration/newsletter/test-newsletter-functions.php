<?php
/**
 * Atomic Blocks newsletter function tests.
 *
 * @package AtomicBlocks\Tests
 */

namespace AtomicBlocks\Tests;

use function \AtomicBlocks\Newsletter\process_submission;

/**
 * Class Newsletter_Functions
 *
 * @package AtomicBlocks\Tests
 */
class Newsletter_Functions extends \WP_UnitTestCase {

	/**
	 * Sets up the environment for the tests.
	 */
	public static function setUpBeforeClass() {
		update_option( 'atomic_blocks_mailchimp_api_key', 'abc123' );
	}

	/**
	 * Tests newsletter form submission processing.
	 *
	 * @covers ::process_submission
	 */
	public function test_process_submission_with_invalid_email() {
		$response = process_submission( 'moo', 'mailchimp', [] );
		$this->assertWPError( $response );
		$this->assertSame( $response->get_error_code(), 'invalid_email' );
	}

	/**
	 * Tests newsletter form submission processing.
	 *
	 * @covers ::process_submission
	 */
	public function test_process_submission_with_invalid_provider() {
		$response = process_submission( 'test@example.com', false, [] );
		$this->assertWPError( $response );
		$this->assertSame( $response->get_error_code(), 'invalid_provider' );
	}

	/**
	 * Tests newsletter form submission processing.
	 *
	 * @covers ::process_submission
	 */
	public function test_process_submission_with_invalid_list_id() {
		$response = process_submission( 'test@example.com', 'mailchimp', [] );
		$this->assertWPError( $response );
		$this->assertSame( $response->get_error_code(), 'invalid_list_id' );
	}
}
