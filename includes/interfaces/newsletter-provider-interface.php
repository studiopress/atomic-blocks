<?php
/**
 * Newsletter Interface for Atomic Blocks.
 *
 * @package AtomicBlocks
 */

interface Newsletter_Provider_Interface {

	/**
	 * Retrieves the mailing list from the provider API.
	 *
	 * @return array
	 */
	public function get_lists();

	/**
	 * Adds an email address to the specified list.
	 *
	 * @param string $email The email address.
	 * @param string $list_id The mailing list ID.
	 *
	 * @return bool True if the email was added, false if not.
	 */
	public function add_email_to_list( $email, $list_id );
}
