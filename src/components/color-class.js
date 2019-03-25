/**
 * Function to get the color picker class slug
 */

const { getColorClassName, getColorObjectByColorValue } = wp.editor;
const { select } = wp.data;

export function getColorClass( colorAttribute ) {
	const settings = select( 'core/editor' ).getEditorSettings();
	const colorObject = getColorObjectByColorValue( settings.colors, colorAttribute );

	return colorObject ?
		getColorClassName( 'background-color', colorObject.slug ) :
		undefined;
}
