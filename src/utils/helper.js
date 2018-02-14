/**
 * Helper Functions
 */

// Calculate the font size
export function fontRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'font-size-' + ( 1 * Math.round( ratio / 1 ) );
}