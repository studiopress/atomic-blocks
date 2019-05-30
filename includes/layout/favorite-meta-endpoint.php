<?php
/**
 * REST API Endpoints for Sections and Layouts.
 *
 * @package AtomicBlocks
 */

namespace AtomicBlocks\Layouts;

use \WP_REST_Response;
use \WP_REST_Server;

const LAYOUT_NAMESPACE       = 'atomicblocks/v1';
const LAYOUT_FAVORITES_ROUTE = 'layouts/favorites';

add_action( 'rest_api_init', __NAMESPACE__ . '\register_layout_endpoints' );
/**
 * Create custom endpoints for block settings
 */
function register_layout_endpoints() {

	/**
	 * Register the GET endpoint.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		LAYOUT_FAVORITES_ROUTE,
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => function () {
				return new WP_REST_Response( get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the update endpoint.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		LAYOUT_FAVORITES_ROUTE,
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

				update_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', $favorites );

				return new WP_REST_Response( get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	/**
	 * Register the delete endpoint.
	 */
	register_rest_route(
		LAYOUT_NAMESPACE,
		LAYOUT_FAVORITES_ROUTE,
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

				update_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', $favorites );

				return new WP_REST_Response( get_user_meta( get_current_user_id(), 'atomic_blocks_favorite_layouts', true ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

}
