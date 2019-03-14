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
class Admin {

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
		add_action( 'add_meta_boxes', array( $this, 'featured_meta' ) );
		add_action( 'save_post', array( $this, 'meta_save' ) );
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
	 * Adds a meta box to the post editing screen
	 */
	public function featured_meta() {
		add_meta_box(
			'lsx_blocks_title_meta',
			__( 'Disable Title', 'lsx-blocks' ),
			array( $this, 'meta_callback' ),
			null,
			'side',
			'high'
		);
	}


	/**
	 * Outputs the content of the meta box
	 */

	public function meta_callback( $post ) {
		wp_nonce_field( basename( __FILE__ ), 'lsx_blocks_disable_title_nonce' );
		$prfx_stored_meta = get_post_meta( $post->ID );
		?>

		<p>
		<div class="prfx-row-content">
			<label for="disable-title-checkbox">
				<input type="checkbox" name="lsx_disable_title" id="disable-title-checkbox" value="yes" <?php if ( isset( $prfx_stored_meta['lsx_disable_title'] ) ) checked( $prfx_stored_meta['lsx_disable_title'][0], 'yes' ); ?> />
				<?php esc_html_e( 'Hide the title', 'lsx-blocks' ); ?>
			</label>

		</div>
		</p>

		<?php
	}

	/**
	 * Saves the custom meta input
	 */
	public function meta_save( $post_id ) {

		// Checks save status - overcome autosave, etc.
		$is_autosave = wp_is_post_autosave( $post_id );
		$is_revision = wp_is_post_revision( $post_id );
		$is_valid_nonce = ( isset( $_POST['lsx_blocks_disable_title_nonce'] ) && wp_verify_nonce( $_POST['lsx_blocks_disable_title_nonce'], basename( __FILE__ ) ) ) ? 'true' : 'false';

		// Exits script depending on save status
		if ( $is_autosave || $is_revision || ! $is_valid_nonce ) {
			return;
		}

		// Checks for input and saves - save checked as yes and unchecked at no
		if ( isset( $_POST['lsx_disable_title'] ) ) {
			update_post_meta( $post_id, 'lsx_disable_title', 'yes' );
		} else {
			update_post_meta( $post_id, 'lsx_disable_title', 'no' );
		}
	}
}
