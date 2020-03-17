jQuery( document ).ready( function( $ ) {
	// Tabs
	$( '.inline-list' ).each( function() {
		$( this )
			.find( 'li' )
			.each( function( i ) {
				$( this ).click( function() {
					$( this )
						.addClass( 'current' )
						.siblings()
						.removeClass( 'current' )
						.parents( '#wpbody' )
						.find( 'div.panel-left' )
						.removeClass( 'visible' )
						.end()
						.find( 'div.panel-left:eq(' + i + ')' )
						.addClass( 'visible' );
					return false;
				} );
			} );
	} );

	// Scroll to anchor
	$( '.anchor-nav a, .toc a' ).click( function( e ) {
		var href = $( this ).attr( 'href' );
		e.preventDefault();

		$( 'html, body' ).animate(
			{
				scrollTop: $( href ).offset().top,
			},
			'slow',
			'swing'
		);
	} );

	// Back to top links
	$( '#help-panel h3' ).append(
		$(
			"<a class='back-to-top' href='#panel'><i class='fa fa-angle-up'></i> Back to top</a>"
		)
	);
	// Pro opt-in analytics handler
	$( '.ab-gs-feedback input[name="atomic-blocks-settings[analytics-opt-in]"]' ).on( 'click', function( event ) {
		$.ajax({
			data: {
				action: 'atomic_blocks_pro_gs_analytics_toggle',
				'ab-pro-analytics-toggle-value': event.target.value,
				'atomic_blocks_pro_gs_analytics_toggle_nonce': $( '#atomic_blocks_pro_gs_analytics_toggle_nonce' ).val()
			},
			type: 'post',
			url: ajaxurl
		});
	});
});
