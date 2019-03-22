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

	$defaults = atomic_blocks_newsletter_block_attributes();

	$email_input_label     = ! empty( $attributes['emailInputLabel'] ) ? $attributes['emailInputLabel'] : $defaults['emailInputLabel']['default'];
	$form_background_color = ! empty( $attributes['formBackgroundColor'] ) ? $attributes['formBackgroundColor'] : null;
	$button_bg_color       = ! empty( $attributes['buttonBackgroundColor'] ) ? $attributes['buttonBackgroundColor'] : $defaults['buttonBackgroundColor']['default'];
	$button_text_color     = ! empty( $attributes['buttonTextColor'] ) ? $attributes['buttonTextColor'] : $defaults['buttonTextColor']['default'];
	$button_class          = ! empty( $attributes['buttonClass'] ) ? $attributes['buttonClass'] : $defaults['buttonClass']['default'];
	$button_class         .= ! empty( $attributes['buttonSize'] ) ? ' ' . $attributes['buttonSize'] : ' ' . $defaults['buttonSize']['default'];
	$button_text           = ! empty( $attributes['buttonText'] ) ? $attributes['buttonText'] : $defaults['buttonText']['default'];
	$button_styles         = 'style="background-color: ' . $button_bg_color . '; color: ' . $button_text_color . '"';
	$mailing_list_provider = ! empty( $attributes['mailingListProvider'] ) ? $attributes['mailingListProvider'] : $defaults['mailingListProvider']['default'];
	$mailing_list          = ! empty( $attributes['mailingList'] ) ? $attributes['mailingList'] : null;
	$newsletter_title      = ! empty( $attributes['newsletterTitle'] ) ? $attributes['newsletterTitle'] : null;
	$newsletter_text       = ! empty( $attributes['newsletterText'] ) ? $attributes['newsletterText'] : null;
	$padding               = ! empty( $attributes['padding'] ) ? $attributes['padding'] : $defaults['padding']['default'];
	$success_message       = ! empty( $attributes['successMessage'] ) ? $attributes['successMessage'] : $defaults['successMessage']['default'];

	/* Padding styles. */
	$padding_styles = '';

	if ( ! empty( $padding ) && $padding > 0 ) {
		$padding_styles .= 'padding:' . $padding . 'px;';
	}

	/* Background styles. */
	$background_styles = '';

	if ( ! empty( $form_background_color ) ) {
		$background_styles .= 'background-color:' . $form_background_color . '';
	}

	/* Newsletter wrapper styles. */
	if ( ! empty( $padding_styles || $background_styles ) ) {
		$wrapper_styles = 'style=" ' . $padding_styles . $background_styles . ' " ';
	} else {
		$wrapper_styles = null;
	}

		$form = '<div class="ab-block-newsletter" ' . $wrapper_styles . '>';

	if ( $newsletter_title ) {
		$form .= '<h2 class="ab-newsletter-title">' . esc_html( $newsletter_title ) . '</h2>';
	}

	if ( $newsletter_text ) {
		$allowed = array( 'p' => array() );
		$text    = '<div class="ab-newsletter-text">' . $newsletter_text . '</div>';
		$form   .= wp_kses( $text, $allowed );
	}

		$form .= '
			<form method="post">
				<label for="ab-newsletter-email-address">' . esc_html( $email_input_label ) . '</label>
				<input type="text" name="ab-newsletter-email-address" />
				<button class="' . esc_attr( $button_class ) . ' ab-newsletter-submit" type="submit" ' . $button_styles . '>' . esc_html( $button_text ) . '</button>
				<input type="hidden" name="ab-newsletter-mailing-list-provider" value="' . esc_attr( $mailing_list_provider ) . '" />
				<input type="hidden" name="ab-newsletter-mailing-list" value="' . esc_attr( $mailing_list ) . '" />
				<input type="hidden" name="ab-newsletter-success-message" value="' . esc_attr( $success_message ) . '" />
				' . wp_nonce_field( 'ab-newsletter-form-nonce', 'ab-newsletter-form-nonce', true, false ) . '
			</form>
		';

		$form .= '</div>';

		return $form;
}

/**
 * Returns the newsletter block attributes.
 *
 * @return array
 */
function atomic_blocks_newsletter_block_attributes() {
	return [
		'buttonAlignment'       => [
			'type'    => 'string',
			'default' => 'left',
		],
		'buttonBackgroundColor' => [
			'type'    => 'string',
			'default' => '#3373dc',
		],
		'formBackgroundColor'   => [
			'type' => 'string',
		],
		'buttonClass'           => [
			'type'    => 'string',
			'default' => 'ab-button',
		],
		'buttonShape'           => [
			'type'    => 'string',
			'default' => 'ab-button-shape-rounded',
		],
		'buttonSize'            => [
			'type'    => 'string',
			'default' => 'ab-button-size-medium',
		],
		'buttonText'            => [
			'type'    => 'string',
			'default' => esc_html__( 'Subscribe', 'atomic-blocks' ),
		],
		'buttonTextColor'       => [
			'type'    => 'string',
			'default' => '#fff',
		],
		'buttonTextProcessing'  => [
			'type'    => 'string',
			'default' => esc_html__( 'Please wait...', 'atomic-blocks' ),
		],
		'emailInputLabel'       => [
			'type'    => 'string',
			'default' => esc_html__( 'Your Email Address', 'atomic-blocks' ),
		],
		'mailingList'           => [
			'type' => 'string',
		],
		'mailingListProvider'   => [
			'type'    => 'string',
			'default' => 'mailchimp',
		],
		'successMessage'        => [
			'type'    => 'string',
			'default' => esc_html__( 'Thanks for subscribing.', 'atomic-blocks' ),
		],
		'padding'               => [
			'type'    => 'number',
			'default' => 0,
		],
		'newsletterTitle'       => [
			'type' => 'string',
		],
		'newsletterTitleToggle' => [
			'type' => 'boolean',
		],
		'newsletterText'        => [
			'type' => 'string',
		],
		'newsletterTextToggle'  => [
			'type' => 'boolean',
		],
	];
}
