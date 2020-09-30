/* global XMLHttpRequest, FormData, atomic_blocks_migration */

document.addEventListener( 'DOMContentLoaded', function() {
	var buttonElement = document.getElementById('atomic-blocks-install-genesis-blocks-button');

	buttonElement.addEventListener( 'click', function() {		
		var request = new XMLHttpRequest();
		var data    = new FormData();
		
		data.append( '_wpnonce', atomic_blocks_migration.install_gb_nonce );

		request.open( 'POST', atomic_blocks_migration.install_gb_endpoint, true );
		
		// Temporarily hide the install button while we wait to see if it installs.
		buttonElement.style.display = 'none';
		document.getElementById('atomic-blocks-install-genesis-blocks-error-message').style.display = 'none';
		document.getElementById('atomic-blocks-install-genesis-blocks-success-message').style.display = 'none';
		
		// Temporarily show a spinner.
		document.getElementById('atomic-blocks-install-genesis-blocks-spinner').style.visibility = 'visible';
		
		request.onreadystatechange = function() {
			if (request.readyState === 4) {

				// If successfully installed and activated.
				if (request.status === 200) {
					
					try {
						var responseJson = JSON.parse( request.response );
	
						// Hide the spinner.
						document.getElementById('atomic-blocks-install-genesis-blocks-spinner').style.visibility = 'hidden';
						
						var successMessageElement = document.getElementById('atomic-blocks-install-genesis-blocks-success-message');
						
						// Set a success message.
						if ( responseJson.message ) {
							successMessageElement.innerHTML = responseJson.message;
						}
						
						// Show the success message.
						successMessageElement.style.display = 'block';
						
						// Wait for 1 second.
						setTimeout( function() {
							
							// Redirect to the migration page.
							window.location.href = atomic_blocks_migration.success_redirect_url;
							
						}, 1000 );
					} catch (e) {
						uponError();
					}
					// If there was a non 200 response from the server.
				} else {
					uponError();
				}
			}
		}

		request.onerror = function () {
			uponError();
		};

		request.send( data );
		
		function uponError() {
			var responseJson = null;

			try {
				responseJson = JSON.parse( request.response );
			} catch (error) {
				responseJson = null;
			}
			
			// Hide the spinner.
			document.getElementById('atomic-blocks-install-genesis-blocks-spinner').style.visibility = 'hidden';
			
			var errorMessageElement = document.getElementById('atomic-blocks-install-genesis-blocks-error-message');

			// Set the error message text.
			if ( responseJson && responseJson.message ) {
				errorMessageElement.innerHTML = responseJson.message;
			}
			
			// Show the error message.
			errorMessageElement.style.display = 'block';

			// Show the button again so they can retry
			buttonElement.style.display= 'block';
		}

	} );
} );
