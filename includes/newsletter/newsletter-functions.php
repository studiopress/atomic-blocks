<?php
/**
 * Newsletter functions.
 *
 * @package AtomicBlocks
 */

namespace AtomicBlocks\Newsletter;

use AtomicBlocks\Exception\Mailchimp_API_Error_Exception;

add_action( 'init', __NAMESPACE__ . '\form_submission_listener' );
add_action( 'wp_ajax_atomic_blocks_newsletter_submission', __NAMESPACE__ . '\form_submission_listener' );
add_action( 'wp_ajax_nopriv_atomic_blocks_newsletter_submission', __NAMESPACE__ . '\form_submission_listener' );
/**
 * Listens for newsletter form submissions and
 * initiates the processing phase.
 *
 * @since 1.6.0
 */
function form_submission_listener() {

	if ( empty( $_POST['ab-newsletter-form-nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ab-newsletter-form-nonce'] ) ), 'ab-newsletter-form-nonce' ) ) {
		send_processing_response( __( 'Nonce verification failed. Please try again.', 'atomic-blocks' ) );
	}

	if ( empty( $_POST['ab-newsletter-mailing-list-provider'] ) || empty( $_POST['ab-newsletter-mailing-list'] ) ) {
		send_processing_response( __( 'Invalid mailing provider configuration.', 'atomic-blocks' ) );
	}

	if ( empty( $_POST['ab-newsletter-email-address'] ) ) {
		send_processing_response( __( 'You must provide an email address.', 'atomic-blocks' ) );
	}

	$email              = sanitize_email( wp_unslash( $_POST['ab-newsletter-email-address'] ) );
	$provider           = sanitize_text_field( wp_unslash( $_POST['ab-newsletter-mailing-list-provider'] ) );
	$list               = sanitize_text_field( wp_unslash( $_POST['ab-newsletter-mailing-list'] ) );
	$default_attributes = atomic_blocks_newsletter_block_attributes();
	$success_message    = ! empty( $_POST['ab-newsletter-success-message'] ) ? sanitize_text_field( wp_unslash( $_POST['ab-newsletter-success-message'] ) ) : $default_attributes['successMessage']['default'];
	$subscriber_status  = ! empty( $_POST['ab-newsletter-double-opt-in'] ) ? 'pending' : 'subscribed';

	if ( ! is_email( $email ) ) {
		send_processing_response( __( 'Please provide a valid email address.', 'atomic-blocks' ) );
	}

	$response = process_submission(
		$email,
		$provider,
		[
			'list_id' => $list,
			'status'  => $subscriber_status,
		]
	);

	if ( is_wp_error( $response ) ) {
		send_processing_response( $response->get_error_message(), false );
	}

	send_processing_response( $success_message );
}

/**
 * Sends the appropriate response based on the request type.
 *
 * @param string $message The message indicating success or failure.
 * @param bool   $success Whether or not the response should communicate success or failure.
 */
function send_processing_response( $message, $success = true ) {

	/**
	 * If this is an AMP request, set up the headers so they meet AMP requirements.
	 */
	// @todo look at removing $_POST usage from here, and maybe setting the headers elsewhere or adding a param to this function.
	// phpcs:ignore WordPress.Security.NonceVerification.Missing -- False positive. Nonce is processed elsewhere before reaching here.
	if ( function_exists( 'is_amp_endpoint' ) && ! empty( $_POST['ab-newsletter-amp-endpoint-request'] ) ) {

		$redirect_url = null;
		$location     = wp_get_referer();

		if ( ! $location && ! empty( $_SERVER['HTTP_REFERER'] ) ) {
			$location = wp_validate_redirect( wp_sanitize_redirect( esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) ) );
		}

		if ( $location ) {
			$redirect_url = add_query_arg(
				[
					'ab-newsletter-submitted'          => true,
					'ab-newsletter-submission-message' => rawurlencode( $message ),
				],
				$location
			);

			header_remove( 'Location' );
			header( "AMP-Redirect-To: $redirect_url" );
			header( 'AMP-Access-Control-Allow-Source-Origin: ' . home_url() );
			header( 'Access-Control-Expose-Headers: AMP-Redirect-To, AMP-Access-Control-Allow-Source-Origin' );
		}
	}

	if ( $success && wp_doing_ajax() ) {
		wp_send_json_success( [ 'message' => esc_html( $message ) ] );
	}

	if ( ! $success && wp_doing_ajax() ) {
		wp_send_json_error( [ 'message' => esc_html( $message ) ] );
	}

	wp_die( esc_html( $message ) );
}

/**
 * Processes newsletter subscription requests
 * with the requested provider's API.
 *
 * @param string $email The email address.
 * @param string $provider The newsletter provider.
 * @param array  $args Additional arguments.
 *
 * @return bool|\WP_Error If any error occurs.
 */
function process_submission( $email, $provider, array $args ) {

	$provider       = sanitize_text_field( trim( (string) $provider ) );
	$email          = sanitize_email( trim( (string) $email ) );
	$list_id        = ! empty( $args['list_id'] ) ? sanitize_text_field( trim( (string) $args['list_id'] ) ) : false;
	$args['status'] = ! empty( $args['status'] ) ? sanitize_key( $args['status'] ) : false;

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
				return $chimp->subscribe(
					$email,
					[
						'list_id' => $list_id,
						'status'  => $args['status'],
					]
				);
			} catch ( Mailchimp_API_Error_Exception $exception ) {
				return new \WP_Error( $exception->getCode(), $exception->getMessage() );
			}
			break;

		default:
			return new \WP_Error( $errors['invalid_provider'], $errors['invalid_provider'] );
	}
}

/**
 * Returns a list of supported mailing list providers.
 *
 * @return array
 */
function mailing_list_providers() {

	$mailchimp_api_key = get_option( 'atomic_blocks_mailchimp_api_key' );

	$mailchimp_lists = [];

	if ( ! empty( $mailchimp_api_key ) ) {
		try {
			$chimp = new Mailchimp( $mailchimp_api_key );
			$lists = $chimp->get_lists();
			if ( ! empty( $lists ) ) {
				foreach ( $lists as $key => $list ) {
					$mailchimp_lists[ $key ] = [
						'id'   => $list['id'],
						'name' => $list['name'],
					];
				}
			}
		// phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedCatch
		} catch ( Mailchimp_API_Error_Exception $exception ) {
			// Do nothing and return an empty array for mailing lists.
		}
	}

	return [
		'mailchimp' => [
			'label'           => 'Mailchimp',
			'lists'           => $mailchimp_lists,
			'api_key_defined' => ! empty( get_option( 'atomic_blocks_mailchimp_api_key' ) ),
		],
	];
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\frontend_assets' );
/**
 * Registers the frontend assets for the newsletter block.
 */
function frontend_assets() {
	wp_register_script(
		'atomic-blocks-newsletter-functions',
		plugins_url( '/dist/assets/js/newsletter-block-functions.js', atomic_blocks_main_plugin_file() ),
		[ 'jquery', 'wp-a11y' ],
		'1.0',
		true
	);

	wp_localize_script(
		'atomic-blocks-newsletter-functions',
		'atomic_blocks_newsletter_vars',
		[
			'ajaxurl' => esc_url( admin_url( 'admin-ajax.php' ) ),
			'l10n'    => [
				'button_text_processing' => esc_html( atomic_blocks_newsletter_block_attributes()['buttonTextProcessing']['default'] ),
				'invalid_configuration'  => esc_html__( 'Invalid configuration. Site owner: Please configure your newsletter provider settings.', 'atomic-blocks' ),
				'a11y'                   => [
					'submission_processing' => esc_html__( 'The submission is being processed.', 'atomic-blocks' ),
					'submission_succeeded'  => esc_html__( 'The submission successfully succeeded.', 'atomic-blocks' ),
					'submission_failed'     => esc_html__( 'The submission failed.', 'atomic-blocks' ),
				],
			],
		]
	);
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
			'mailingListProviders'     => mailing_list_providers(),
			'plugin_settings_page_url' => esc_url( admin_url( 'admin.php?page=atomic-blocks-plugin-settings' ) ),
		]
	);
}
