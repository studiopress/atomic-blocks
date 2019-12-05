"use strict";
window.addEventListener( 'DOMContentLoaded', function() {
	AtomicBlocksSettings.init();
} );

var AtomicBlocksSettings = {
	init: function() {
		this.addListeners();
		this.setUpDefaultStates();
	},

	setUpDefaultStates: function() {
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
console.log(tab);
		// jQuery( '.inline-list' ).hide();
		jQuery( '#atomic-blocks-settings .tab-content' ).hide();
		jQuery( '.inline-list' ).find( 'li' ).removeClass( 'current' );
		jQuery( '#atomic-blocks-settings-tab-' + tab ).addClass( 'current' ).blur();
		// jQuery( '.inline-list' ).show();
		jQuery( '#atomic-blocks-settings' ).find( '#atomic-blocks-settings-' + tab ).show();
	},

	addListeners: function() {
		jQuery( '.inline-list a' ).on( 'click', function( event ) {
			event.preventDefault();
			console.log(event);
			AtomicBlocksSettings.switchTab( jQuery( this ), event.target.hash );
			AtomicBlocksSettings.saveActiveTabState( event.target.hash );
		} );
	},

	switchTab: function( target, hash ) {
		window.location.hash = hash;
		var tab = target.data( 'tab' );
console.log( tab );
		target.parent().siblings().removeClass( 'current' );
		target.parent().addClass( 'current' ).blur();
		jQuery( '#atomic-blocks-settings .tab-content' ).hide();
		jQuery( '#atomic-blocks-settings' ).find( '#atomic-blocks-settings-' + tab ).show();
	},

	getActiveTabState: function() {
		if ( typeof sessionStorage === 'undefined' ) {
			return;
		}

		return sessionStorage.getItem( 'atomic_blocks_settings_active_tab' );
	},

	saveActiveTabState: function( tab ) {
		if ( typeof sessionStorage === 'undefined' ) {
			return;
		}

		sessionStorage.setItem( 'atomic_blocks_settings_active_tab', tab );
	}
}
