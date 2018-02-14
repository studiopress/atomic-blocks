(function($) {

	$(document).ready(function() {

		var notice, noticeId, storedNoticeId, dismissButton;
		notice = document.querySelector('.block-notice');
		
		if (!notice) {
			return;
		}
		
		dismissButton = document.querySelector('.block-notice-dismiss');
		noticeId = notice.getAttribute('data-id');
		storedNoticeId = localStorage.getItem('blockNotice');
		
		// This means that the user hasn't already dismissed
		// this specific notice. Let's display it.
		if (noticeId !== storedNoticeId) {
			notice.style.display = 'block';
		}
		
		dismissButton.addEventListener('click', function () {
			notice.style.display = 'none';
			localStorage.setItem('blockNotice', noticeId);
		});

	});

})(jQuery);
