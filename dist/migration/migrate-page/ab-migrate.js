/* global XMLHttpRequest, FormData */

document.addEventListener( 'DOMContentLoaded', function() {
	var buttonElement = document.getElementById('atomic-blocks-install-genesis-blocks-button');

	buttonElement.addEventListener( 'click', function() {
		var installGbEndpointUrl = buttonElement.getAttribute( 'install_gb_endpoint' );
		var installGbNonce       = buttonElement.getAttribute( 'install_gb_nonce' );
		
		var request = new XMLHttpRequest();
		var data    = new FormData();
		
		data.append( '_wpnonce', installGbNonce );

		request.open( 'POST', installGbEndpointUrl, true );
		
		// Temporarily hide the install button while we wait to see if it installs.
		buttonElement.style.display= 'none';
	
		request.onload = function () {
			done(null, request.response);
			console.log( request.response );
			
			// Show a success message, then redirect the user to the Genesis Blocks Migration page.
		};
		request.onerror = function () {
			done(request.response);
			console.log( request.response );
			
			// Show the error message.
			
			// Show the button again so they can retry
			buttonElement.style.display= 'none';
		};

		request.send( data );

	} );
} );
