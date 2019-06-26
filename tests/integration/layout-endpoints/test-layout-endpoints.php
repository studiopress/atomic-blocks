<?php
/**
 * Atomic Blocks layout endpoint tests.
 *
 * @package AtomicBlocks\Tests
 */

namespace AtomicBlocks\Tests;

/**
 * Class Layout_Endpoints
 *
 * @package AtomicBlocks\Tests
 */
class Layout_Endpoints extends \WP_UnitTestCase {

	/**
	 * The REST API server instance.
	 *
	 * @var \WP_REST_Server
	 */
	private $server;

	/**
	 * Atomic Blocks REST API namespace.
	 *
	 * @var string
	 */
	private $namespace = '/atomicblocks/v1';

	/**
	 * Favorite layouts endpoint.
	 *
	 * @var string
	 */
	private $favorites_route = '/layouts/favorites';

	/**
	 * REST API routes.
	 *
	 * @var array
	 */
	private $routes;

	/**
	 * Default favorite layouts for user 1.
	 *
	 * @var array
	 */
	private static $user_1_favorites = [ 'ab_layout_hero_1', 'ab_layout_full_1' ];

	/**
	 * Favorite layout to add.
	 *
	 * @var string
	 */
	private $favorite_key_to_add = 'ab_section_service_4';

	/**
	 * Updated favorites after adding a new layout.
	 *
	 * @var array
	 */
	private $user_1_favorites_after_addition = [ 'ab_layout_hero_1', 'ab_layout_full_1', 'ab_section_service_4' ];

	/**
	 * Favorite layout to remove.
	 *
	 * @var string
	 */
	private $favorite_key_to_remove = 'ab_layout_full_1';

	/**
	 * Updated favorites after removing a layout.
	 *
	 * @var array
	 */
	private $user_1_favorites_after_removal = [ 'ab_layout_hero_1' ];

	/**
	 * Sets up the test environment.
	 */
	public function setUp() {
		parent::setUp();

		update_user_meta( 1, 'atomic_blocks_favorite_layouts', self::$user_1_favorites );

		/**
		 * WP_Rest_Server instance.
		 *
		 * @var WP_REST_Server $wp_rest_server
		 */
		global $wp_rest_server;

		$wp_rest_server = new \WP_REST_Server();

		$this->server = $wp_rest_server;

		do_action( 'rest_api_init' );

		$this->routes = $this->server->get_routes();
	}

	/**
	 * Resets the test data between each test.
	 */
	public function tearDown() {
		delete_user_meta( 1, 'atomic_blocks_favorite_layouts' );
		wp_set_current_user( null );
	}

	/**
	 * Tests that the Atomic Blocks namespace exists in the REST API.
	 */
	public function test_namespace_exists() {
		$this->assertArrayHasKey( $this->namespace, $this->routes );

	}

	/**
	 * Tests that the Atomic Blocks Favorite Layouts route exists in the REST API.
	 */
	public function test_favorites_route_exists() {
		$this->assertArrayHasKey( $this->namespace . $this->favorites_route, $this->routes );
	}

	/**
	 * Tests the retrieval of favorite layouts.
	 */
	public function test_retrieve_user_1_favorites() {
		wp_set_current_user( 1 );
		$request  = new \WP_REST_Request( 'GET', '/atomicblocks/v1/layouts/favorites' );
		$response = $this->server->dispatch( $request );
		$this->assertSame( self::$user_1_favorites, $response->get_data() );
	}

	/**
	 * Tests that a logged out user cannot retrieve favorite layouts.
	 */
	public function test_retrieve_logged_out_user_favorites_fails() {
		$request  = new \WP_REST_Request( 'GET', '/atomicblocks/v1/layouts/favorites' );
		$response = $this->server->dispatch( $request );
		$this->assertSame( 401, $response->get_status() );
	}

	/**
	 * Tests adding a new favorite layout.
	 */
	public function test_adding_new_favorite_to_user_1() {
		wp_set_current_user( 1 );
		$request = new \WP_REST_Request( 'PATCH', '/atomicblocks/v1/layouts/favorites' );
		$request->set_body( wp_json_encode( [ 'atomic_blocks_favorite_key' => $this->favorite_key_to_add ] ) );
		$response = $this->server->dispatch( $request );
		$this->assertSame( $this->user_1_favorites_after_addition, $response->get_data() );
	}

	/**
	 * Tests removing a favorite layout.
	 */
	public function test_removing_favorite_from_user_1() {
		wp_set_current_user( 1 );
		$request = new \WP_REST_Request( 'DELETE', '/atomicblocks/v1/layouts/favorites' );
		$request->set_body( wp_json_encode( [ 'atomic_blocks_favorite_key' => $this->favorite_key_to_remove ] ) );
		$response = $this->server->dispatch( $request );
		$this->assertSame( $this->user_1_favorites_after_removal, $response->get_data() );
	}

}
