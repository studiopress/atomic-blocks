'use strict';
window.addEventListener( 'DOMContentLoaded', function() {
	var AtomicBlocksSettings = {
		init() {
			this.addListeners();
			this.setUpDefaultStates();
		},

		// Sets up default state for settings tabs and settings visibility.
		setUpDefaultStates() {
			var tab = 'general';

			var saved_tab = this.getActiveTabState();

			if ( saved_tab ) {
				tab = saved_tab.substring( 1 );
			}

			if ( window.location.hash ) {
				tab = window.location.hash.substring( 1 );
			} else {
				window.location.hash = tab;
			}

			jQuery( 'div[class^="atomic-blocks-settings-"], div[class^="genesis-page-builder-settings-"]' ).hide();
			jQuery( '#atomic-blocks-settings .tab-content' ).hide();
			jQuery( '.inline-list' )
				.find( 'li' )
				.removeClass( 'current' );
			jQuery( '.atomic-blocks-settings-tab-' + tab + ', .genesis-page-builder-settings-tab-' + tab )
				.addClass( 'current' )
				.blur();
			jQuery( '#atomic-blocks-settings' )
				.find( '.atomic-blocks-settings-' + tab + ', .genesis-page-builder-settings-' + tab )
				.show();
		},

		// Adds event listeners.
		addListeners() {
			jQuery( '.inline-list a' ).on( 'click', function( event ) {
				event.preventDefault();
				jQuery( 'div[class^="atomic-blocks-settings-"], div[class^="genesis-page-builder-settings-"]' ).hide();
				AtomicBlocksSettings.switchTab(
					jQuery( this ),
					event.target.hash
				);
				AtomicBlocksSettings.saveActiveTabState( event.target.hash );
			} );
		},

		// Handles tab switching functionality.
		switchTab( target, hash ) {
			var tab = target.data( 'tab' );
			window.location.hash = hash;
			target
				.parent()
				.siblings()
				.removeClass( 'current' );
			target
				.parent()
				.addClass( 'current' )
				.blur();
			jQuery( '#atomic-blocks-settings .tab-content' ).hide();
			jQuery( '#atomic-blocks-settings' )
				.find( '.atomic-blocks-settings-' + tab +', .genesis-page-builder-settings-' + tab )
				.show();
		},

		// Returns the active tab stored in session storage.
		getActiveTabState() {
			if ( 'undefined' === typeof sessionStorage ) {
				return;
			}

			return sessionStorage.getItem(
				'atomic_blocks_settings_active_tab'
			);
		},

		// Saves the active tab in session storage.
		saveActiveTabState( tab ) {
			if ( 'undefined' === typeof sessionStorage ) {
				return;
			}

			sessionStorage.setItem( 'atomic_blocks_settings_active_tab', tab );
		},
	};

	// Bootstrap the settings page.
	AtomicBlocksSettings.init();
} );
