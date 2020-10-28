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
	const NOTICE_CAPABILITY = 'install_plugins';

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
		<div id="ab-migration-notice" class="notice notice-info ab-notice-migration">
			<?php wp_nonce_field( self::NOTICE_NONCE_ACTION, self::NOTICE_NONCE_NAME, false ); ?>
			<div class="ab-migration-copy">
				<p>
					<?php
					printf(
						/* translators: %1$s: the plugin name */
						esc_html__( 'Atomic Blocks has moved! For future updates and improvements, migrate now to the new home of site building with Gutenberg: %1$s.', 'atomic-blocks' ),
						sprintf(
							'<strong>%1$s</strong>',
							esc_html__( 'Genesis Blocks', 'atomic-blocks' )
						)
					);
					?>
					<a rel="noopener noreferrer" class="ab-notice-migration__learn-more" href="<?php echo esc_url( $migration_url ); ?>">
						<?php esc_html_e( 'Learn more about migrating', 'atomic-blocks' ); ?>
					</a>
				</p>
			</div>
			<button id="ab-notice-not-now" href="#" class="ab-notice-option button button-secondary">
				<?php esc_html_e( 'Not Now', 'atomic-blocks' ); ?>
			</button>
			<a href="<?php echo esc_url( $migration_url ); ?>" class="ab-notice-option button button-primary">
				<?php esc_html_e( 'Migrate', 'atomic-blocks' ); ?>
			</a>
		</div>
		<div id="ab-not-now-notice" class="notice notice-info ab-notice-migration ab-hidden">
			<div class="ab-migration-copy">
				<p><?php esc_html_e( "When you're ready, our migration tool is available in the main menu, under Atomic Blocks > Migrate.", 'atomic-blocks' ); ?></p>
			</div>
			<button id="ab-notice-ok" class="ab-notice-option button">
				<?php esc_html_e( 'Okay', 'atomic-blocks' ); ?>
			</button>
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
		if ( ! current_user_can( self::NOTICE_CAPABILITY ) ) {
			return false;
		}

		// If the user has dismissed the notice, it should reappear in 2 weeks.
		$time_dismissed = get_user_meta( get_current_user_id(), self::NOTICE_USER_META_KEY, true );
		if ( ! empty( $time_dismissed ) && ( $time_dismissed + WEEK_IN_SECONDS * 2 > time() ) ) {
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

		if ( ! current_user_can( self::NOTICE_CAPABILITY ) ) {
			wp_send_json_error();
		}

		update_user_meta( get_current_user_id(), self::NOTICE_USER_META_KEY, time() );

		wp_send_json_success();
	}
}
