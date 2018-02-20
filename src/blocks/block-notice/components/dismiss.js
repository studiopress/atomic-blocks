(function($) {

	$(document).ready(function() {

		const elems = document.querySelectorAll('.block-notice.dismissable[data-id]');
		elems.forEach(el => {
			const uid = el.getAttribute( 'data-id' );
			if ( ! localStorage.getItem(`notice-${uid}`) ) {
				el.style.display = 'block';
			}
			el.querySelector('.block-notice-dismiss').addEventListener('click', () => {
				localStorage.setItem(`notice-${uid}`, 1);
				el.style.display = '';
			})
		})

	});

})(jQuery);
