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
	$button_bg_color       = ! empty( $attributes['buttonBackgroundColor'] ) ? $attributes['buttonBackgroundColor'] : $defaults['buttonBackgroundColor']['default'];
	$button_text_color     = ! empty( $attributes['buttonTextColor'] ) ? $attributes['buttonTextColor'] : $defaults['buttonTextColor']['default'];
	$button_class          = ! empty( $attributes['buttonClass'] ) ? $attributes['buttonClass'] : $defaults['buttonClass']['default'];
	$button_class         .= ! empty( $attributes['buttonSize'] ) ? ' ' . $attributes['buttonSize'] : ' ' . $defaults['buttonSize']['default'];
	$button_text           = ! empty( $attributes['buttonText'] ) ? $attributes['buttonText'] : $defaults['buttonText']['default'];
	$button_styles         = 'style="background-color: ' . $button_bg_color . '; color: ' . $button_text_color . '"';
	$mailing_list_provider = ! empty( $attributes['mailingListProvider'] ) ? $attributes['mailingListProvider'] : $defaults['mailingListProvider']['default'];
	$mailing_list          = ! empty( $attributes['mailingList'] ) ? $attributes['mailingList'] : null;
	$padding_top       	   = ! empty( $attributes['paddingTop'] ) ? $attributes['paddingTop'] : $defaults['paddingTop']['default'];
	$padding_right         = ! empty( $attributes['paddingRight'] ) ? $attributes['paddingRight'] : $defaults['paddingRight']['default'];
	$padding_bottom        = ! empty( $attributes['paddingBottom'] ) ? $attributes['paddingBottom'] : $defaults['paddingBottom']['default'];
	$padding_left          = ! empty( $attributes['paddingLeft'] ) ? $attributes['paddingLeft'] : $defaults['paddingLeft']['default'];
	$success_message       = ! empty( $attributes['successMessage'] ) ? $attributes['successMessage'] : $defaults['successMessage']['default'];

	$padding_styles = "";

	if( ! empty( $padding_top ) && $padding_top > 0 ) {
		$padding_styles .= 'padding-top:' . $padding_top . 'px;';
	}

	if( ! empty( $padding_right ) && $padding_right > 0 ) {
		$padding_styles .= 'padding-right:' . $padding_right . 'px;';
	}

	if( ! empty( $padding_bottom ) && $padding_bottom > 0 ) {
		$padding_styles .= 'padding-bottom:' . $padding_bottom . 'px;';
	}

	if( ! empty( $padding_left ) && $padding_left > 0 ) {
		$padding_styles .= 'padding-left:' . $padding_left . 'px;';
	}

	if( ! empty( $padding_styles ) ) {
		$wrapper_styles = 'style=" ' . $padding_styles . ' " ';
	} else {
		$wrapper_styles = null;
	}

	$form = '
		<div class="ab-block-newsletter" ' . $wrapper_styles . '>
			<form method="post">
				<label for="ab-newsletter-email-address">' . esc_html( $email_input_label ) . '</label>
				<input type="text" name="ab-newsletter-email-address" />
				<button class="' . esc_attr( $button_class ) . ' ab-newsletter-submit" type="submit" ' . $button_styles . '>' . esc_html( $button_text ) . '</button>
				<input type="hidden" name="ab-newsletter-mailing-list-provider" value="' . esc_attr( $mailing_list_provider ) . '" />
				<input type="hidden" name="ab-newsletter-mailing-list" value="' . esc_attr( $mailing_list ) . '" />
				<input type="hidden" name="ab-newsletter-success-message" value="' . esc_attr( $success_message ) . '" />
				' . wp_nonce_field( 'ab-newsletter-form-nonce', 'ab-newsletter-form-nonce', true, false ) . '
			</form>
		</div>
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
		'buttonAlignment'       => [
			'type'    => 'string',
			'default' => 'left',
		],
		'buttonBackgroundColor' => [
			'type'    => 'string',
			'default' => '#3373dc',
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
		'paddingTop'   => [
			'type'    => 'number',
			'default' => '0',
		],
		'paddingRight'   => [
			'type'    => 'number',
			'default' => '0',
		],
		'paddingBottom'   => [
			'type'    => 'number',
			'default' => '0',
		],
		'paddingLeft'   => [
			'type'    => 'number',
			'default' => '0',
		],
	];
}
