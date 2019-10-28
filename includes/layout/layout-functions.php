<?php
/**
 * Layout block related functions.
 *
 * @package AtomicBlocks
 */

use AtomicBlocks\Layouts\Component_Registry;

/**
 * Registers layout components with the Component Registry
 * for use in the Layouts block.
 *
 * @param array $data The component data.
 *
 * @return bool|WP_Error
 */
function atomic_blocks_register_layout_component( array $data ) {

	$registry = Component_Registry::instance();

	try {
		$registry::add( $data );
		return true;
	} catch ( Exception $exception ) {
		return new WP_Error( esc_html( $exception->getMessage() ) );
	}
}

/**
 * Unregisters the specified layout component from the Component Registry
 * for use in the Layouts block.
 *
 * @return mixed Boolean true if component unregistered. WP_Error object if an error occurs.
 * @param string $type The component type to be unregistered.
 * @param string $key The unique layout key to be unregistered.
 */
function atomic_blocks_unregister_layout_component( $type, $key ) {
	$registry = Component_Registry::instance();
	try {
		$registry::remove( $type, $key );
		return true;
	} catch ( Exception $exception ) {
		return new WP_Error( esc_html( $exception->getMessage() ) );
	}
}

/**
 * Retrieves the specified layout component.
 *
 * @param string $type The layout component type.
 * @param string $key The layout component's unique key.
 *
 * @return mixed|WP_Error
 */
function atomic_blocks_get_layout_component( $type, $key ) {

	if ( empty( $type ) ) {
		return new WP_Error( esc_html__( 'You must supply a type to retrieve a layout component.', 'atomic-blocks' ) );
	}

	if ( empty( $key ) ) {
		return new WP_Error( esc_html__( 'You must supply a key to retrieve a layout component.', 'atomic-blocks' ) );
	}

	$type = sanitize_key( $type );

	$key = sanitize_key( $key );

	$registry = Component_Registry::instance();

	try {
		return $registry::get( $type, $key );
	} catch ( Exception $exception ) {
		return new WP_Error( esc_html( $exception->getMessage() ) );
	}
}

/**
 * Gets the registered layouts.
 *
 * @return array Array of registered layouts.
 */
function atomic_blocks_get_layouts() {
	$registry = Component_Registry::instance();
	return $registry::layouts();
}

/**
 * Gets the registered sections.
 *
 * @return array Array of registered sections.
 */
function atomic_blocks_get_sections() {
	$registry = Component_Registry::instance();
	return $registry::sections();
}
