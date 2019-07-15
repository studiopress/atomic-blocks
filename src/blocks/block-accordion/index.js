/**
 * BLOCK: Atomic Blocks Accordion Block
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';
import Deprecated from './deprecated/deprecated';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const {
	registerBlockType
} = wp.blocks;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.ab-accordion-title',
		source: 'children'
	},
	accordionText: {
		type: 'array',
		selector: '.ab-accordion-text',
		source: 'children'
	},
	accordionAlignment: {
		type: 'string'
	},
	accordionFontSize: {
		type: 'number',
		default: null
	},
	accordionOpen: {
		type: 'boolean',
		default: false
	}
};

// Register the block
registerBlockType( 'atomic-blocks/ab-accordion', {
	title: __( 'AB Accordion', 'atomic-blocks' ),
	description: __( 'Add accordion block with a title and text.', 'atomic-blocks' ),
	icon: 'editor-ul',
	category: 'atomic-blocks',
	keywords: [
		__( 'accordion', 'atomic-blocks' ),
		__( 'list', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],
	attributes: blockAttributes,

	// Render the block components
	edit: props => {
		return <Edit { ...props } />;
	},

	// Save the attributes and markup
	save: props => {
		return <Save { ...props } />;
	},

	deprecated: Deprecated
});
