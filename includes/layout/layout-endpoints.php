<?php
/**
 * REST API Endpoints for Sections and Layouts.
 *
 * @package AtomicBlocks
 */

namespace AtomicBlocks\Layouts;

use \WP_REST_Response;
use \WP_REST_Server;

const LAYOUT_NAMESPACE = 'atomicblocks/v1';

const LAYOUTS_ROUTE       = 'layouts';
const SINGLE_LAYOUT_ROUTE = 'layouts/([A-Za-z])\w+/';

const SECTIONS_ROUTE       = 'sections';
const SINGLE_SECTION_ROUTE = 'sections/([A-Za-z])\w+/';

const FAVORITE_LAYOUTS_ROUTE = 'layouts/favorites';
const ALL_LAYOUTS_ROUTE      = 'layouts/all';

add_action( 'rest_api_init', __NAMESPACE__ . '\register_layout_endpoints' );
/**
 * Create custom endpoints for block settings
 */
function register_layout_endpoints() {

	/**
	 * Register the favorites GET endpoint.
	 *
	 * Note: Keep this route before the other routes
	 * otherwise they may override this one.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		FAVORITE_LAYOUTS_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function () {
				return new WP_REST_Response( (array) get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	register_rest_route(
		LAYOUT_NAMESPACE,
		ALL_LAYOUTS_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function () {
				$layouts  = atomic_blocks_get_layouts();
				$sections = atomic_blocks_get_sections();
				return new WP_REST_Response( array_merge( $layouts, $sections ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the layouts GET endpoint.
	 * Returns all registered layouts.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		LAYOUTS_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function () {
				return new WP_REST_Response( (array) atomic_blocks_get_layouts() );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the single layout GET endpoint.
	 * Returns a single requested layout.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		SINGLE_LAYOUT_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function ( $request ) {
				$route      = $request->get_route();
				$layout_key = substr( strrchr( $route, '/' ), 1 );
				$layouts    = atomic_blocks_get_layouts();
				if ( isset( $layouts[ $layout_key ] ) ) {
					return new WP_REST_Response( $layouts[ $layout_key ] );
				}

				return new WP_REST_Response( esc_html__( 'Layout not found.', 'atomic-blocks' ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the favorites update endpoint.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		FAVORITE_LAYOUTS_ROUTE,
		[
			'methods'             => 'PATCH',
			'callback'            => function ( $request ) {

				$body      = json_decode( $request->get_body(), true );
				$new       = sanitize_key( $body['atomic_blocks_favorite_key'] );
				$favorites = (array) get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true );

				if ( in_array( $new, $favorites, true ) ) {
					return new WP_REST_Response( $favorites );
				}

				if ( empty( $favorites[0] ) ) {
					$favorites = array( $new );
				} else {
					$favorites[] = $new;
				}

				update_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', array_values( $favorites ) );

				return new WP_REST_Response( (array) get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the favorites delete endpoint.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		FAVORITE_LAYOUTS_ROUTE,
		[
			'methods'             => 'DELETE',
			'callback'            => function ( $request ) {

				$body      = json_decode( $request->get_body(), true );
				$delete_id = sanitize_key( $body['atomic_blocks_favorite_key'] );
				$favorites = (array) get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true );

				if ( ! in_array( $delete_id, $favorites, true ) ) {
					return new WP_REST_Response( $favorites );
				}

				$position = array_search( $delete_id, $favorites, true );

				unset( $favorites[ $position ] );

				update_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', array_values( $favorites ) );

				return new WP_REST_Response( (array) get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the sections GET endpoint.
	 * Returns all registered sections.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		SECTIONS_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function () {
				return new WP_REST_Response( (array) atomic_blocks_get_sections() );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);
}
