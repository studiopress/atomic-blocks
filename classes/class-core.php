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
 * Class Core
 * @package lsx\blocks\classes
 */
class Core {

	/**
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object lsx\blocks\classes\Core()
	 */
	protected static $instance = null;

	/**
	 * @var object \lsx\member_directory\classes\Setup();
	 */
	public $setup;

	/**
	 * @var object \lsx\member_directory\classes\Frontend();
	 */
	public $frontend;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
		$this->load_classes();
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\member_directory\classes\Core()    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;

	}

	/**
	 * Loads the variable classes and the static classes.
	 */
	private function load_classes() {
		require_once( LSX_BLOCKS_PATH . 'classes/class-setup.php' );
		$this->setup = Setup::get_instance();

		require_once( LSX_BLOCKS_PATH . 'classes/class-frontend.php' );
		$this->frontend = Frontend::get_instance();
	}
}
