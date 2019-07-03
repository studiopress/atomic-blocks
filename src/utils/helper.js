/**
 * Helper Functions
 */

// Import helper dependencies
import md5 from 'md5';

// Calculate the font size
export function fontRatioToClass( ratio ) {
	return ( 0 === ratio || 50 === ratio ) ?
		null :
		'font-size-' + ( 1 * Math.round( ratio / 1 ) );
}

// Generate a unique ID for the notice block
export function generateUniqueID( input ) {
	return md5( input ).substr( 0, 6 );
}
