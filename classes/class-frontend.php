<?php
namespace lsx\blocks\classes;
/**
 * @package   lsx\blocks\classes
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2019 LightSpeed
 */

/**
 * Setup plugin class.
 *
 * @package lsx\blocks\classes
 * @author  LightSpeed
 */
class Frontend {

	/**
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'body_class', array( $this, 'banner_class' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_filter( 'lsx_page_banner_disable', array( $this, 'disable_lsx_page_title' ));
		add_filter( 'lsx_global_header_disable', array( $this, 'disable_lsx_page_title' ));
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\blocks\classes\Frontend();    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	/**
	 * Add the class 'has-block-banner' if the banner block is the first thing on the page.
	 */
	public function banner_class( $classes ) {
		$post = get_post();
		if ( function_exists( 'has_blocks' ) && has_blocks( $post->post_content ) ) {
			$blocks = parse_blocks( $post->post_content );

			if ( 'lsx-blocks/lsx-banner-box' === $blocks[0]['blockName'] ) {
				$classes[] = 'has-block-banner';
			}
		}
		return $classes;
	}

	/**
	 * Enques the frontend scripts
	 */
	public function scripts() {
		if ( function_exists( 'has_blocks' ) && has_blocks() ) {
			wp_enqueue_script( 'lsx_blocks_script', LSX_BLOCKS_URL . '/dist/assets/js/frontend.js', array( 'jquery', 'slick' ), LSX_BLOCKS_VER, true );
		}
	}

	/**
	 * Disables the page title banner for LSX
	 * @param $disable boolean
	 *
	 * @return boolean
	 */
	public function disable_lsx_page_title( $disable ) {
		$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
		if ( 'yes' === $disable_title ) {
			$disable = true;
		}
		return $disable;
	}
}
