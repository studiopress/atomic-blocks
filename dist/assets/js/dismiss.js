/**
 * Handles dismissible notices from the Notice block.
 */

document.addEventListener( 'DOMContentLoaded', function() {

	var notices = document.querySelectorAll( '.ab-block-notice.ab-dismissable[data-id]' );

	notices.forEach( function( element ) {

		var uid = element.getAttribute( 'data-id' );

		var dismissible = element.querySelector( '.ab-notice-dismiss' );

		if ( ! localStorage.getItem( 'notice-' + uid ) ) {
			element.style.display = 'block';
		}

		if ( dismissible ) {
			dismissible.addEventListener( 'click', function( event ) {
				event.preventDefault();
				localStorage.setItem( 'notice-' + uid, '1' );
				element.style.display = '';
			});
		}
	});
});
