<?php
/**
 * Newsletter block registration and rendering functions.
 *
 * @package AtomicBlocks
 */

add_action( 'init', 'atomic_blocks_register_newsletter_block' );
/**
 * Registers the newsletter block.
 */
function atomic_blocks_register_newsletter_block() {

	register_block_type(
		'atomic-blocks/newsletter',
		[
			'attributes'      => atomic_blocks_newsletter_block_attributes(),
			'render_callback' => 'atomic_blocks_render_newsletter_block',
		]
	);
}

/**
 * Renders the newsletter block.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML.
 */
function atomic_blocks_render_newsletter_block( $attributes ) {

	wp_enqueue_script( 'atomic-blocks-newsletter-functions' );

	$email_input_label     = ! empty( $attributes['emailInputLabel'] ) ? $attributes['emailInputLabel'] : esc_html__( 'Your Email Address', 'atomic-blocks' );
	$button_bg_color       = ! empty( $attributes['buttonBackgroundColor'] ) ? $attributes['buttonBackgroundColor'] : null;
	$button_text_color     = ! empty( $attributes['buttonTextColor'] ) ? $attributes['buttonTextColor'] : null;
	$button_class          = ! empty( $attributes['buttonClass'] ) ? $attributes['buttonClass'] : 'ab-button';
	$button_class         .= ! empty( $attributes['buttonSize'] ) ? ' ' . $attributes['buttonSize'] : ' ab-button-size-medium';
	$button_text           = ! empty( $attributes['buttonText'] ) ? $attributes['buttonText'] : __( 'Subscribe', 'atomic-blocks' );
	$button_styles         = 'style="background-color: ' . $button_bg_color . '; color: ' . $button_text_color . '"';
	$mailing_list_provider = ! empty( $attributes['mailingListProvider'] ) ? $attributes['mailingListProvider'] : 'mailchimp';
	$mailing_list          = ! empty( $attributes['mailingList'] ) ? $attributes['mailingList'] : null;

	// @todo instance in the ID
	$form = '
		<form method="post">
			<label for="atomic-blocks-newsletter-email-address">' . esc_html( $email_input_label ) . '</label>
			<input type="text" name="atomic-blocks-newsletter-email-address" />
			<button class="' . esc_attr( $button_class ) . ' ab-newsletter-submit" type="submit" ' . $button_styles . '>' . esc_html( $button_text ) . '</button>
			<input type="hidden" name="atomic-blocks-newsletter-mailing-list-provider" value="' . esc_attr( $mailing_list_provider ) . '" />
			<input type="hidden" name="atomic-blocks-newsletter-mailing-list" value="' . esc_attr( $mailing_list ) . '" />
			' . wp_nonce_field( 'atomic-blocks-newsletter-form-nonce', 'atomic-blocks-newsletter-form-nonce', true, false ) . '
		</form>
	';
	return $form;
}

/**
 * Returns the newsletter block attributes.
 *
 * @return array
 */
function atomic_blocks_newsletter_block_attributes() {
	return [
		'buttonClass'           => [
			'type'    => 'string',
			'default' => 'ab-button',
		],
		'buttonText'            => [
			'type'    => 'string',
			'default' => esc_html__( 'Subscribe', 'atomic-blocks' ),
		],
		'buttonTextProcessing'  => [
			'type'    => 'string',
			'default' => esc_html__( 'Please wait...', 'atomic-blocks' ),
		],
		'buttonBackgroundColor' => [
			'type'    => 'string',
			'default' => '#3373dc',
		],
		'buttonSize'            => [
			'type'    => 'string',
			'default' => 'ab-button-size-medium',
		],
		'buttonTextColor'       => [
			'type'    => 'string',
			'default' => '#fff',
		],
	];
}
