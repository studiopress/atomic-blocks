<?php
/**
 * Atomic Blocks layout endpoint tests.
 *
 * @package AtomicBlocks\Tests
 */

namespace AtomicBlocks\Tests;

use function \atomic_blocks_register_layout_component;

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
		parent::tearDown();
		global $wp_rest_server;
		$wp_rest_server = null;
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

	/**
	 * Tests that the total number of layouts returned
	 * from the API matches the expected number.
	 */
	public function test_total_layout_count() {
		wp_set_current_user( 1 );
		$request  = new \WP_REST_Request( 'GET', '/atomicblocks/v1/layouts/all' );
		$response = $this->server->dispatch( $request );
		$this->assertCount( 12, json_decode( wp_json_encode( $response->get_data() ), true ) );
	}

	/**
	 * Tests that filtering the All Layouts endpoint
	 * returns the expected number of layouts.
	 */
	public function test_filtered_layout_count() {
		wp_set_current_user( 1 );

		// Filter the allowed layouts list.
		add_filter( 'atomic_blocks_allowed_layout_components', [ __CLASS__, 'filter_allowed_layouts' ] );

		// Fetch the allowed layouts from the API endpoint.
		$request = new \WP_REST_Request( 'GET', '/atomicblocks/v1/layouts/all' );
		$request->set_param( 'filter', 'allowed' );
		$response = $this->server->dispatch( $request );

		$this->assertCount( 1, json_decode( wp_json_encode( $response->get_data() ), true ) );

		// Remove the allowed layouts filter.
		remove_filter( 'atomic_blocks_allowed_layout_components', [ __CLASS__, 'filter_allowed_layouts' ] );
	}

	/**
	 * Tests that registering a layout component is successful
	 * and returns boolean true.
	 */
	public function test_register_layout_component_succeeds() {
		$keywords = [ 'test1', 'test2', 'test3' ];

		$new_layout = atomic_blocks_register_layout_component(
			[
				'type'     => 'layout',
				'key'      => 'ab_integration_test_layout_1',
				'name'     => 'Integration Test Layout 1',
				'content'  => 'moo',
				'category' => [ 'test' ],
				'keywords' => $keywords,
				'image'    => 'https://example.org',
			]
		);

		$this->assertTrue( $new_layout );

		// Fetch registered layouts from API and check all the values for the one we just registered.
		$layouts = atomic_blocks_get_layouts();

		$this->assertArrayHasKey( 'ab_integration_test_layout_1', $layouts );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['type'], 'layout' );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['key'], 'ab_integration_test_layout_1' );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['name'], 'Integration Test Layout 1' );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['content'], 'moo' );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['keywords'], $keywords );

		$this->assertSame( $layouts['ab_integration_test_layout_1']['category'], [ 'test' ] );

	}

	/**
	 * Tests that registering an invalid component type fails
	 * and returns a WP_Error object.
	 *
	 * @covers ::atomic_blocks_register_layout_component()
	 */
	public function test_register_invalid_layout_component_fails() {
		$new_layout = atomic_blocks_register_layout_component(
			[
				'type' => 'fake',
			]
		);

		$this->assertWPError( $new_layout );
	}

	/**
	 * Tests that unregistering an existing layout component succeeds.
	 *
	 * @covers ::atomic_blocks_unregister_layout_component()
	 */
	public function test_unregister_existing_layout_component_succeeds() {
		$success = atomic_blocks_unregister_layout_component( 'layout', 'ab_layout_business_1' );
		$this->assertTrue( $success );
		$layouts = atomic_blocks_get_layouts();
		$this->assertArrayNotHasKey( 'ab_layout_business_1', $layouts );
	}

	/**
	 * Tests layout fetching functionality.
	 *
	 * @covers ::atomic_blocks_get_layouts()
	 */
	public function test_get_layouts() {
		$layouts = atomic_blocks_get_layouts();
		$this->assertArrayHasKey( 'ab_integration_test_layout_1', $layouts );
	}

	/**
	 * Filters the allowed layouts, for testing purposes.
	 *
	 * @see `atomic_blocks_allowed_layout_components` filter.
	 * @param array $layouts Array of allowed layouts.
	 * @return array
	 */
	public static function filter_allowed_layouts( array $layouts ) {
		return [ 'ab_layout_business_1' ];
	}
}
