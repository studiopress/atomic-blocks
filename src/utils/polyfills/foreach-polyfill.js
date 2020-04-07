/*
 * Polyfill for NodeList.forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if ( 'NodeList' in window && !NodeList.prototype.forEach ) {
	NodeList.prototype.forEach = function ( callback, thisArg ) {
		thisArg = thisArg || window;
		for ( let i = 0; i < this.length; i++ ) {
			callback.call( thisArg, this[i], i, this );
		}
	};
}
