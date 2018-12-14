(function($) {

	$(document).ready(function() {

		const elems = document.querySelectorAll('.lsx-block-notice.lsx-dismissable[data-id]');
		elems.forEach(el => {
			const uid = el.getAttribute( 'data-id' );
			if ( ! localStorage.getItem(`notice-${uid}`) ) {
				el.style.display = 'block';
			}

			if ( $( '.lsx-notice-dismiss' ).length ) {
				el.querySelector('.lsx-notice-dismiss').addEventListener('click', () => {
					localStorage.setItem(`notice-${uid}`, 1);
					el.style.display = '';
				})
			}
		})

	});

})(jQuery);
