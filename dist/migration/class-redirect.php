<?php
/**
 * Redirects to the Migrate page.
 *
 * @package   Atomic Blocks
 * @copyright Copyright(c) 2022, Atomic Blocks
 * @license   http://opensource.org/licenses/GPL-2.0 GNU General Public License, version 2 (GPL-2.0)
 */

namespace Atomic_Blocks\Admin\Migration;

/**
 * Class Redirect
 */
class Redirect {

	/**
	 * Adds an action.
	 */
	public function __construct() {
		add_action( 'upgrader_process_complete', [ $this, 'redirect_after_upgrade' ], 10, 2 );
	}

	/**
	 * Redirects to the Migrate page after upgrading Atomic Blocks.
	 *
	 * @param \WP_Upgrader $upgrader The upgrader class.
	 * @param array        $extra Extra data from the bulk update.
	 */
	public function redirect_after_upgrade( $upgrader, $extra ) {
		unset( $upgrader );
		if ( current_user_can( Notice::NOTICE_CAPABILITY ) && isset( $extra['plugins'] ) && in_array( 'atommic-blocks/atomicblocks.php', $extra['plugins'], true ) ) {
			add_option( 'atomic_blocks_do_activation_redirect', true );
		}
	}
}
