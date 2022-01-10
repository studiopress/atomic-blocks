<?php
/**
 * Atomic Blocks Test_Redirect tests.
 *
 * @package AtomicBlocks\Tests
 */

namespace AtomicBlocks\Tests;

use stdClass;
use Atomic_Blocks\Admin\Migration\Redirect;

/**
 * Class Test_Redirect
 *
 * @package AtomicBlocks\Tests
 */
class Test_Redirect extends \WP_UnitTestCase {

	/**
	 * The option name to do the redirect.
	 *
	 * @var string
	 */
	const REDIRECT_OPTION_NAME = 'atomic_blocks_do_activation_redirect';

	/**
	 * The instance to test.
	 *
	 * @var Redirect
	 */
	public $instance;

	/**
	 * Sets up each test.
	 */
	public function setUp() {
		parent::setUp();
		$this->instance = new Redirect();
	}

	/**
	 * Tears down after each test.
	 */
	public function tearDown() {
		delete_option( self::REDIRECT_OPTION_NAME );
		parent::tearDown();
	}

	/**
	 * Test redirect_after_upgrade.
	 */
	public function test_redirect_after_upgrade_wrong_user() {
		$this->instance->redirect_after_upgrade( new stdClass(), [] );
		$this->assertFalse( get_option( self::REDIRECT_OPTION_NAME ) );
	}

	/**
	 * Test redirect_after_upgrade.
	 */
	public function test_redirect_after_upgrade_correct_user_wrong_plugin() {
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'administrator' ] ) );
		$this->instance->redirect_after_upgrade( new stdClass(), [ 'plugins' => [ 'foo/foo.php' ] ] );

		$this->assertFalse( get_option( self::REDIRECT_OPTION_NAME ) );
	}

	/**
	 * Test redirect_after_upgrade.
	 */
	public function test_redirect_after_upgrade_correct_user_correct_plugin() {
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'administrator' ] ) );
		$this->instance->redirect_after_upgrade( new stdClass(), [ 'plugins' => [ 'atomic-blocks/atomicblocks.php' ] ] );

		$this->assertTrue( get_option( self::REDIRECT_OPTION_NAME ) );
	}
}
