<?php
/**
 * Layout Component Registry
 *
 * @package AtomicBlocks
 */

namespace AtomicBlocks\Layouts;

use \Exception;
use \InvalidArgumentException;

/**
 * Class Component_Registry
 *
 * @access private Not intended as a public API.
 * Use the helper functions to manage layouts.
 * This class will likely go away in the future.
 */
final class Component_Registry {

	/**
	 * Supported component types.
	 *
	 * @var array
	 */
	private static $supported_component_types = [ 'layout', 'section' ];

	/**
	 * Required keys for components.
	 *
	 * @var array
	 */
	private static $required_data_keys = [ 'type', 'key', 'name', 'content', 'category', 'keywords', 'image' ];

	/**
	 * Holds the registered layouts.
	 *
	 * @var array
	 */
	private static $layouts = [];

	/**
	 * Holds the registered sections.
	 *
	 * @var array
	 */
	private static $sections = [];

	/**
	 * The Component_Registry object.
	 *
	 * @var object Component_Registry
	 */
	private static $instance;

	/**
	 * Creates the Component_Registry instance.
	 *
	 * @return Component_Registry
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Adds a component to the registry.
	 *
	 * @param array $data Component data.
	 * @throws InvalidArgumentException If invalid data is provided or the component is already registered.
	 */
	public static function add( array $data ) {

		if ( empty( $data['type'] ) || ! in_array( $data['type'], self::$supported_component_types, true ) ) {
			throw new InvalidArgumentException( esc_html__( 'You must supply a valid component type.', 'atomic-blocks' ) );
		}

		if ( empty( $data ) ) {
			throw new InvalidArgumentException( __( 'You must supply valid layout data to register a layout.', 'atomic-blocks' ) );
		}

		foreach ( self::$required_data_keys as $required_key ) {
			if ( ! array_key_exists( $required_key, $data ) || empty( $data[ $required_key ] ) ) {
				/* translators: %s: The missing key that is required to register a component. */
				throw new InvalidArgumentException( sprintf( esc_html__( 'You must supply a %s to register a layout.', 'atomic-blocks' ), $required_key ) );
			}
		}

		switch ( $data['type'] ) {
			case 'layout':
				if ( ! empty( self::$layouts[ $data['key'] ] ) ) {
					/* translators: %s: The component's unique key. */
					throw new InvalidArgumentException( sprintf( esc_html__( 'The %s layout is already registered.', 'atomic-blocks' ), $data['key'] ) );
				}
				self::$layouts[ $data['key'] ] = $data;
				break;

			case 'section':
				if ( ! empty( self::$sections[ $data['key'] ] ) ) {
					/* translators: %s: The component's unique key. */
					throw new InvalidArgumentException( sprintf( esc_html__( 'The %s section is already registered.', 'atomic-blocks' ), $data['key'] ) );
				}
				self::$sections[ $data['key'] ] = $data;
				break;

			default:
				/* translators: %s: This functions name. Will always be AtomicBlocks\Layouts\Component_Registry::add(). */
				throw new InvalidArgumentException( sprintf( esc_html__( 'You must supply a valid component type in %s.', 'atomic-blocks' ), __METHOD__ ) );
		}
	}

	/**
	 * Removes an existing component from the registry.
	 *
	 * @param string $type The component type to unregister.
	 * @param string $key The unique layout key to be removed.
	 *
	 * @throws Exception If the required data is not provided or the specified component is not registered.
	 * @throws InvalidArgumentException If an unsupported component type is provided.
	 */
	public static function remove( $type, $key ) {

		if ( empty( $type ) || ! in_array( $type, self::$supported_component_types, true ) ) {
			/* translators: %s: This functions name. Will always be AtomicBlocks\Layouts\Component_Registry::remove(). */
			throw new InvalidArgumentException( sprintf( esc_html__( 'You must supply a valid component type in %s.', 'atomic-blocks' ), __METHOD__ ) );
		}

		if ( empty( $key ) ) {
			/* translators: %s: This functions name. Will always be AtomicBlocks\Layouts\Component_Registry::remove(). */
			throw new InvalidArgumentException( sprintf( esc_html__( 'You must supply a valid component key in %s.', 'atomic-blocks' ), __METHOD__ ) );
		}

		$key = sanitize_key( $key );

		switch ( $type ) {
			case 'layout':
				if ( empty( self::$layouts[ $key ] ) ) {
					/* translators: The requested components unique key. */
					throw new Exception( sprintf( esc_html__( 'The %s layout is not registered.', 'atomic-blocks' ), $key ) );
				}
				unset( self::$layouts[ $key ] );
				break;

			case 'section':
				if ( empty( self::$sections[ $key ] ) ) {
					/* translators: The requested components unique key. */
					throw new Exception( sprintf( esc_html__( 'The %s section is not registered.', 'atomic-blocks' ), $key ) );
				}
				unset( self::$sections[ $key ] );
				break;
		}

	}

	/**
	 * Gets a component from the registry.
	 *
	 * @param string $type The component type.
	 * @param string $key The component's unique key.
	 *
	 * @return mixed
	 * @throws Exception If the required data is not provided or the specified component is not registered.
	 * @throws InvalidArgumentException If an unsupported component type is provided.
	 */
	public static function get( $type, $key ) {

		if ( empty( $type ) || ! in_array( $type, self::$supported_component_types, true ) ) {
			/* translators: This function name. Will always be AtomicBlocks\Layouts\Component_Registry::get(). */
			throw new Exception( sprintf( esc_html__( 'You must supply a component type in %s.', 'atomic-blocks' ), __METHOD__ ) );
		}

		switch ( $type ) {
			case 'layout':
				if ( empty( self::$layouts[ $key ] ) ) {
					/* translators: The requested components unique key. */
					throw new Exception( sprintf( esc_html__( 'The %s layout is not registered.', 'atomic-blocks' ), $key ) );
				}
				return self::$layouts[ $key ];

			case 'section':
				if ( empty( self::$sections[ $key ] ) ) {
					/* translators: The requested components unique key. */
					throw new Exception( sprintf( esc_html__( 'The %s section is not registered.', 'atomic-blocks' ), $key ) );
				}
				return self::$sections[ $key ];

			default:
				/* translators: This function name. Will always be AtomicBlocks\Layouts\Component_Registry::get(). */
				throw new InvalidArgumentException( sprintf( esc_html__( 'You must supply a valid component type in %s.', 'atomic-blocks' ), __METHOD__ ) );
		}
	}

	/**
	 * Returns the registered layouts.
	 *
	 * @return array
	 */
	public static function layouts() {
		return self::$layouts;
	}

	/**
	 * Returns the registered sections.
	 *
	 * @return array
	 */
	public static function sections() {
		return self::$sections;
	}
}
