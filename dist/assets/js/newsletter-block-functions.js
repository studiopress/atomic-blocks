"use strict";

var $ = jQuery;

var AtomicBlocksNewsletterSubmission = {

	init: function() {
		$( '.ab-newsletter-submit' ).on( 'click', function( event ) {

			event.preventDefault();

			var button = $( this );

			button.text( atomic_blocks_newsletter_vars.button_text_processing ).prop( 'disabled', true );

			var form = $( this ).parents( 'form' );

			var email = button.parent().find( "[name='ab-newsletter-email-address']" ).val();

			var provider = button.parent().find( "[name='ab-newsletter-mailing-list-provider']" ).val();

			var list = button.parent().find( "[name='ab-newsletter-mailing-list']" ).val();

			var successMessage = button.parent().find( "[name='ab-newsletter-success-message']" ).val();

			if ( ! email ) {
				button.text( atomic_blocks_newsletter_vars.button_text_default ).prop( 'disabled', false );
				return;
			}

			if ( ! provider || ! list ) {
				form.html( '<p class="ab-newsletter-submission-message">' + atomic_blocks_newsletter_vars.invalid_configuration + '</p>' );
				return;
			}

			$.ajax( {
				data: {
					action: 'atomic_blocks_newsletter_submission',
					atomic_blocks_newsletter_email: email,
					atomic_blocks_newsletter_mailing_list_provider: provider,
					atomic_blocks_newsletter_mailing_list: list,
					atomic_blocks_newsletter_form_nonce: $( '#ab-newsletter-form-nonce' ).val(),
					atomic_blocks_newsletter_success_message: successMessage,
				},
				type: 'post',
				url: atomic_blocks_newsletter_vars.ajaxurl,
				success: function( response ) {
					form.html( '<p class="ab-newsletter-submission-message">' + response.data.message + '</p>' );
				},
				failure: function( response ) {
					form.html( '<p class="ab-newsletter-submission-message">' + response.data.message + '</p>' );
				}

			} );
		} );
	}
}

$( document ).ready( function() {
	AtomicBlocksNewsletterSubmission.init();
} );
