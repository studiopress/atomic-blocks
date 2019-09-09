<?php
/**
 * Atomic Blocks Mailchimp API Class
 *
 * @package AtomicBlocks\Newsletter\Mailchimp
 */

namespace AtomicBlocks\Newsletter;

use DrewM\MailChimp\MailChimp as MC;
use AtomicBlocks\Exception\Mailchimp_API_Error_Exception;

/**
 * Class Mailchimp
 *
 * @package AtomicBlocks\Newsletter
 */
final class Mailchimp implements Provider_Interface {

	/**
	 * Stores the current MailChimp instance
	 * for re-use by this class's methods.
	 *
	 * @var \DrewM\MailChimp\MailChimp
	 */
	private $mailchimp;

	/**
	 * Mailchimp constructor.
	 *
	 * @param string $api_key Mailchimp API key.
	 *
	 * @throws Mailchimp_API_Error_Exception If an API key is not provided.
	 */
	public function __construct( $api_key ) {

		if ( empty( $api_key ) ) {
			throw new Mailchimp_API_Error_Exception(
				/* translators: %s This PHP class name. Will print AtomicBlocks\Newsletter\Mailchimp */
				sprintf( esc_html__( 'An API key is required to use %s.', 'atomic-blocks' ), __CLASS__ )
			);
		}

		$api_key = sanitize_text_field( $api_key );

		try {
			$this->mailchimp = new MC( $api_key );
		} catch ( \Exception $exception ) {
			throw new Mailchimp_API_Error_Exception( $exception->getMessage() );
		}
	}

	/**
	 * Adds an email address to the specified list.
	 *
	 * @param string $email The email address.
	 * @param array  $args {
	 *      Additional arguments.
	 *      @type string $list_id The Mailchimp list ID.
	 * }
	 *
	 * @throws Mailchimp_API_Error_Exception If an invalid list ID is provided.
	 * @return bool
	 */
	public function subscribe( $email, array $args = array() ) {

		$email   = sanitize_email( trim( $email ) );
		$list_id = ! empty( $args['list_id'] ) ? sanitize_text_field( $args['list_id'] ) : false;

		$status         = 'subscribed';
		$valid_statuses = [ 'subscribed', 'pending' ];
		if ( ! empty( $args['status'] ) && in_array( $args['status'], $valid_statuses, true ) ) {
			$status = $args['status'];
		}

		if ( empty( $email ) || ! is_email( $email ) ) {
			throw new Mailchimp_API_Error_Exception(
				esc_html__( 'An invalid email address was provided.', 'atomic-blocks' )
			);
		}

		$lists    = $this->get_lists();
		$list_ids = wp_list_pluck( $lists, 'id' );

		if ( empty( $list_id ) || ! in_array( $list_id, $list_ids, true ) ) {
			throw new Mailchimp_API_Error_Exception(
				/* translators: %s The PHP method name. Will be AtomicBlocks\Newsletter\Mailchimp\subscribe. */
				sprintf( esc_html__( 'An invalid Mailchimp list ID was provided in %s', 'atomic-blocks' ), __METHOD__ )
			);
		}

		$request_method = sprintf( 'lists/%s/members/%s', $list_id, $this->mailchimp->subscriberHash( $email ) );

		$response = $this->mailchimp->put(
			$request_method,
			[
				'email_address' => $email,
				'status'        => $status,
			]
		);

		if ( ! $response || ( ! empty( $response['status'] ) && is_numeric( $response['status'] && 200 !== $response['status'] ) ) || $this->mailchimp->getLastError() ) {
			throw new Mailchimp_API_Error_Exception(
				/* translators: %s The error message returns from the Mailchimp API. */
				esc_html( sprintf( __( 'There was an error subscribing your email address. Please try again. Error: %s', 'atomic-blocks' ), $this->mailchimp->getLastError() ) ),
				$response['status']
			);
		}

		return true;
	}

	/**
	 * Retrieves the mailing list from Mailchimp's API.
	 *
	 * @return array
	 */
	public function get_lists() {
		return (array) $this->cached_lists();
	}

	/**
	 * Returns the cached Mailchimp mailing lists if available.
	 * Retrieves the lists from the Mailchimp API if necessary
	 * and caches them for 15 minutes.
	 *
	 * @return array
	 */
	private function cached_lists() {

		$lists = get_transient( 'atomic_blocks_mailchimp_lists' );

		if ( empty( $lists ) ) {
			$response = (array) $this->mailchimp->get( 'lists', [ 'count' => 200 ] );
			if ( ! empty( $response['lists'] ) ) {
				$lists = $response['lists'];
			}
			set_transient( 'atomic_blocks_mailchimp_lists', $lists, MINUTE_IN_SECONDS * 15 );
		}

		return (array) $lists;
	}

}
