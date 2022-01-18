<?php
/**
 * Displays a migration notice.
 *
 * @package   Atomic Blocks
 * @copyright Copyright(c) 2020, Atomic Blocks
 * @license   http://opensource.org/licenses/GPL-2.0 GNU General Public License, version 2 (GPL-2.0)
 */

namespace Atomic_Blocks\Admin\Migration;

/**
 * Class Notice
 */
class Notice {

	/**
	 * The AJAX action to dismiss the migration notice.
	 *
	 * @var string
	 */
	const NOTICE_AJAX_ACTION = 'ab_dismiss_migration_notice';

	/**
	 * The action of the migration notice nonce.
	 *
	 * @var string
	 */
	const NOTICE_NONCE_ACTION = 'ab-migration-nonce';

	/**
	 * The name of the migration notice nonce.
	 *
	 * @var string
	 */
	const NOTICE_NONCE_NAME = 'ab-migration-nonce-name';

	/**
	 * The slug of the stylesheet for the migration notice.
	 *
	 * @var string
	 */
	const NOTICE_STYLE_SLUG = 'atomic-blocks-migration-notice-style';

	/**
	 * The slug of the script for the migration notice.
	 *
	 * @var string
	 */
	const NOTICE_SCRIPT_SLUG = 'atomic-blocks-migration-notice-script';

	/**
	 * The user meta key to store whether a user has dismissed the migration notice.
	 *
	 * @var string
	 */
	const NOTICE_USER_META_KEY = 'atomic_blocks_show_migration_notice';

	/**
	 * The capability required to see the notice.
	 *
	 * @var string
	 */
	const CAPABILITY = 'install_plugins';

	/**
	 * Adds an action for the notice.
	 */
	public function __construct() {
		add_action( 'admin_notices', [ $this, 'render_migration_notice' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'wp_ajax_' . self::NOTICE_AJAX_ACTION, [ $this, 'ajax_handler_migration_notice' ] );
	}

	/**
	 * Outputs the migration notice if this is on the right page and the user has the right permission.
	 */
	public function render_migration_notice() {
		if ( ! $this->should_display_migration_notice() ) {
			return;
		}

		$migration_url = admin_url( 'admin.php?page=atomic-blocks-migrate-page' );

		?>
		<div id="ab-migration-notice" class="notice notice-warning ab-notice-migration">
			<?php wp_nonce_field( self::NOTICE_NONCE_ACTION, self::NOTICE_NONCE_NAME, false ); ?>
			<div class="ab-migration-copy">
				<p>
					<?php
						esc_html_e( "Atomic Blocks has been renamed to Genesis Blocks and will no longer be maintained. It's time to migrate to the new plugin, which is free and easy to do! Visit the Migrate page to learn more and begin the migration.", 'atomic-blocks' );
					?>
					<a rel="noopener noreferrer" class="ab-notice-migration__learn-more" href="<?php echo esc_url( $migration_url ); ?>">
						<?php esc_html_e( 'Learn more about migrating', 'atomic-blocks' ); ?>
					</a>
				</p>
			</div>
			<a href="<?php echo esc_url( $migration_url ); ?>" class="ab-notice-option button button-primary">
				<?php esc_html_e( 'Migrate', 'atomic-blocks' ); ?>
			</a>
		</div>
		<?php
	}

	/**
	 * Enqueues the migration notice assets.
	 */
	public function enqueue_assets() {
		if ( ! $this->should_display_migration_notice() ) {
			return;
		}

		wp_enqueue_style(
			self::NOTICE_STYLE_SLUG,
			plugins_url( 'dist/migration/admin.migration-notice.css', dirname( dirname( __FILE__ ) ) ),
			[],
			filemtime( plugin_dir_path( dirname( __FILE__ ) ) . 'migration/admin.migration-notice.css' )
		);

		wp_enqueue_script(
			self::NOTICE_SCRIPT_SLUG,
			plugins_url( 'dist/migration/admin.migration-notice.js', dirname( dirname( __FILE__ ) ) ),
			[],
			filemtime( plugin_dir_path( dirname( __FILE__ ) ) . 'migration/admin.migration-notice.js' ),
			true
		);
	}

	/**
	 * Gets whether the migration notice should display.
	 *
	 * This should display on Atomic Blocks > Content Blocks,
	 * /wp-admin/plugins.php, the Dashboard, and Atomic Blocks > Settings.
	 *
	 * @return bool Whether the migration notice should display.
	 */
	public function should_display_migration_notice() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			return false;
		}

		$screen = get_current_screen();
		return ( isset( $screen->base ) && in_array( $screen->base, array( 'plugins', 'dashboard', 'atomic-blocks', 'atomic-blocks-plugin-settings' ), true ) );
	}

	/**
	 * Handles an AJAX request to not display the notice.
	 *
	 * This stores in the user meta the fact that the notice was dismissed,
	 * so it's not displayed again.
	 */
	public function ajax_handler_migration_notice() {
		check_ajax_referer( self::NOTICE_NONCE_ACTION, self::NOTICE_NONCE_NAME );

		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_send_json_error();
		}

		update_user_meta( get_current_user_id(), self::NOTICE_USER_META_KEY, time() );

		wp_send_json_success();
	}
}
