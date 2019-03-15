<?php
/**
 * Newsletter functions.
 */

namespace AtomicBlocks\Newsletter;

//add_action( 'init', __NAMESPACE__ . '\form_submission_listener' );
add_action( 'wp_ajax_atomic_blocks_newsletter_submission', __NAMESPACE__ . '\form_submission_listener' );
add_action( 'wp_ajax_nopriv_atomic_blocks_newsletter_submission', __NAMESPACE__ . '\form_submission_listener' );
/**
 * Listens for newsletter form submissions and
 * initiates the processing phase.
 *
 * @since 1.6.0
 */
function form_submission_listener() {

	if ( empty( $_POST['atomic-blocks-newsletter-form-nonce'] ) ) {
		return;
	}

	if ( wp_doing_ajax() && doing_action( 'init' ) ) {
		return;
	}

	if ( ! wp_verify_nonce( $_POST['atomic-blocks-newsletter-form-nonce']. 'atomic-blocks-newsletter-form-nonce' ) ) {
		send_processing_response( __( 'Nonce verification failed. Please try again.', 'atomic-blocks' ) );
	}

	if ( empty( $_POST['atomic-blocks-newsletter-mailing-list-provider'] ) || empty( $_POST['atomic-blocks-newsletter-mailing-list'] ) ) {
		send_processing_response( __( 'Invalid mailing provider configuration.', 'atomic-blocks' ) );
	}
	// send to process_submission

	// return response with send_processing_response
}

function send_processing_response( $message ) {
	if ( wp_doing_ajax() ) {
		wp_send_json_success( [ 'message' => esc_html( $message ) ] );
	}

	wp_die( esc_html( $message ) );
}

/**
 * Processes newsletter subscription requests
 * with the requested provider's API.
 *
 * @param string $email The email address.
 * @param string $provider The newsletter provider.
 * @param string $list_id The mailing list ID.
 *
 * @return bool|\WP_Error If any error occurs.
 */
function process_submission( $email, $provider, $list_id ) {

	$provider = sanitize_text_field( trim( (string) $provider ) );
	$email    = sanitize_email( trim( (string) $email ) );
	$list_id  = sanitize_text_field( trim( (string) $list_id ) );

	$errors = [
		'invalid_provider' => esc_html__( 'Invalid newsletter provider.', 'atomic-blocks' ),
		'invalid_email'    => esc_html__( 'Invalid email address.', 'atomic-blocks' ),
		'invalid_list_id'  => esc_html__( 'Invalid list ID.', 'atomic-blocks' ),
		'invalid_api_key'  => esc_html__( 'You must enter your email API key in the plugin settings page.', 'atomic-blocks' ),
	];

	if ( empty( $provider ) ) {
		return new \WP_Error( 'invalid_provider', $errors['invalid_provider'] );
	}

	if ( empty( $email ) || ! is_email( $email ) ) {
		return new \WP_Error( 'invalid_email', $errors['invalid_email'] );
	}

	if ( empty( $list_id ) ) {
		return new \WP_Error( 'invalid_list_id', $errors['invalid_list_id'] );
	}

	switch ( $provider ) {

		case 'mailchimp':
			$api_key = get_option( 'atomic_blocks_mailchimp_api_key' );

			if ( empty( $api_key ) ) {
				return new \WP_Error( 'invalid_api_key', $errors['invalid_api_key'] );
			}

			try {
				$chimp = new Mailchimp( $api_key );
				return $chimp->add_email_to_list( $email, $list_id );
			} catch ( \Mailchimp_API_Error_Exception $exception ) {
				return new \WP_Error( $exception->getCode(), $exception->getMessage() );
			}
			break;

		default:
			return new \WP_Error( $errors['invalid_provider'], $errors['invalid_provider'] );
	}
}


function mailing_list_providers() {

	$mailchimp_api_key = get_option( 'atomic_blocks_mailchimp_api_key' );

	$mailchimp_lists = [];

	if ( ! empty( $mailchimp_api_key ) ) {
		$chimp = new Mailchimp( $mailchimp_api_key );
		$lists = $chimp->get_lists();
		if ( ! empty( $lists ) ) {
			foreach( $lists as $key => $list ) {
				$mailchimp_lists[$key] = [
					'id'   => $list['id'],
					'name' => $list['name'],
				];
			}
		}
	}

	return [
		'mailchimp' => [
			'label'           => 'Mailchimp',
			'lists'           => $mailchimp_lists,
			'api_key_defined' => ! empty( get_option( 'atomic_blocks_mailchimp_api_key' ) ),
		],
		'test'      => [
			'label' => 'Test',
			'lists' => [],
		]
	];
}

function frontend_assets() {

}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\admin_assets' );
/**
 * Loads any editor assets needed for the newsletter block.
 */
function admin_assets() {
	wp_localize_script(
		'atomic-blocks-block-js',
		'atomic_blocks_newsletter_block_vars',
		[
			'mailingListProviders' => mailing_list_providers(),
		]
	);
}
