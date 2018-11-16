/**
 * BLOCK: Basic
 *
 * CTA Block
 *
 * Styles:
 *        cta-editor.css — Editor styles for the block.
 *        cta-style.css  — Editor & Front end styles for the block.
 */

( function( blocks, element, editor, components, i18n ) {
	const { registerBlockType } = blocks;
	const { RichText } = editor;
	const { createElement } = element;
	const { InspectorControls } = editor;
	const { SelectControl, ToggleControl } = components;
	const { __ } = i18n;

	const blockStyle = { backgroundColor: '#900', color: '#fff', padding: '20px' };

	registerBlockType( 'lsx-blocks/cta-block', {
		title: 'LSX CTA',

		icon: 'universal-access-alt',

		category: 'layout',

		edit: function() {
			return el( 'p', { style: blockStyle }, 'Hello editor.' );
		},
	
		save: function() {
			return el( 'p', { style: blockStyle }, 'Hello saved content.' );
		},
	} );
})(
	window.wp.blocks, 
	window.wp.element,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
