'use strict';

var $ = jQuery;

var AtomicBlocksNewsletterSubmission = {
	init() {
		$( '.ab-newsletter-submit' ).on( 'click', function( event ) {
			var button = $( this );

			var button_text_original = button.val();

			var form = $( this ).parents( 'form' );

			var nonce = button
				.parent()
				.find( "[name='ab-newsletter-form-nonce']" )
				.val();

			var email = button
				.parent()
				.find( "[name='ab-newsletter-email-address']" )
				.val();

			var provider = button
				.parent()
				.find( "[name='ab-newsletter-mailing-list-provider']" )
				.val();

			var list = button
				.parent()
				.find( "[name='ab-newsletter-mailing-list']" )
				.val();

			var successMessage = button
				.parent()
				.find( "[name='ab-newsletter-success-message']" )
				.val();

			var errorMessageContainer = button
				.parents( '.ab-block-newsletter' )
				.find( '.ab-block-newsletter-errors' );

			var ampEndpoint = button
				.parent()
				.find( "[name='ab-newsletter-amp-endpoint-request']" )
				.val();

			var doubleOptIn = button
				.parent()
				.find( "[name='ab-newsletter-double-opt-in']" )
				.val();

			event.preventDefault();

			wp.a11y.speak(
				atomic_blocks_newsletter_vars.l10n.a11y.submission_processing
			);

			button
				.val(
					atomic_blocks_newsletter_vars.l10n.button_text_processing
				)
				.prop( 'disabled', true );

			if ( ! email ) {
				setTimeout( function() {
					button
						.val( button_text_original )
						.prop( 'disabled', false );
					wp.a11y.speak(
						atomic_blocks_newsletter_vars.l10n.a11y
							.submission_failed
					);
				}, 400 );
				return;
			}

			if ( ! provider || ! list ) {
				form.html(
					'<p class="ab-newsletter-submission-message">' +
						atomic_blocks_newsletter_vars.l10n
							.invalid_configuration +
						'</p>'
				);
				return;
			}

			$.ajax( {
				data: {
					action: 'atomic_blocks_newsletter_submission',
					'ab-newsletter-email-address': email,
					'ab-newsletter-mailing-list-provider': provider,
					'ab-newsletter-mailing-list': list,
					'ab-newsletter-form-nonce': nonce,
					'ab-newsletter-success-message': successMessage,
					'ab-newsletter-amp-endpoint-request': ampEndpoint,
					'ab-newsletter-double-opt-in': doubleOptIn,
				},
				type: 'post',
				url: atomic_blocks_newsletter_vars.ajaxurl,
				success( response ) {
					if ( response.success ) {
						form.html(
							'<p class="ab-newsletter-submission-message">' +
								response.data.message +
								'</p>'
						);
						wp.a11y.speak(
							atomic_blocks_newsletter_vars.l10n.a11y
								.submission_succeeded
						);
					}

					if ( ! response.success ) {
						errorMessageContainer
							.html( '<p>' + response.data.message + '</p>' )
							.fadeIn();
						button
							.val( button_text_original )
							.prop( 'disabled', false );
						wp.a11y.speak(
							atomic_blocks_newsletter_vars.l10n.a11y
								.submission_failed
						);
					}
				},
				failure( response ) {
					errorMessageContainer
						.html( '<p>' + response.data.message + '</p>' )
						.fadeIn();
				},
			} );
		} );

		$( '.ab-newsletter-email-address-input' ).on( 'keyup', function(
			event
		) {
			$( '.ab-block-newsletter-errors' )
				.html( '' )
				.fadeOut();
		} );
	},
};

$( document ).ready( function() {
	AtomicBlocksNewsletterSubmission.init();
} );
