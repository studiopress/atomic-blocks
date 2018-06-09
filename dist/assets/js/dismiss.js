(function($) {

	$(document).ready(function() {

		const elems = document.querySelectorAll('.ab-block-notice.ab-dismissable[data-id]');
		elems.forEach(el => {
			const uid = el.getAttribute( 'data-id' );
			if ( ! localStorage.getItem(`notice-${uid}`) ) {
				el.style.display = 'block';
			}

			if ( $( '.ab-notice-dismiss' ).length ) {
				el.querySelector('.ab-notice-dismiss').addEventListener('click', () => {
					localStorage.setItem(`notice-${uid}`, 1);
					el.style.display = '';
				})
			}
		})

	});

})(jQuery);
