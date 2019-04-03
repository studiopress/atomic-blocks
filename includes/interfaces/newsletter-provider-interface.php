<?php
/**
 * Newsletter Interface for Atomic Blocks.
 *
 * @package AtomicBlocks
 */

namespace AtomicBlocks\Newsletter;

interface Provider_Interface {

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
	 * @param array  $args Additional arguments.
	 *
	 * @return bool True if the email was added, false if not.
	 */
	public function subscribe( $email, array $args );
}
