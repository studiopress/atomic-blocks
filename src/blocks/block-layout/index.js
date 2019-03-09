/**
 * BLOCK: Atomic Blocks Layout
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Edit from './components/edit';
import Save from './components/save';


// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	SelectControl,
} = wp.components;

// Register the block
registerBlockType( 'atomic-blocks/ab-layout', {
	title: __( 'AB Layout', 'atomic-blocks' ),
	description: __( 'Add a pre-defined layout.', 'atomic-blocks' ),
	icon: 'welcome-widgets-menus',
	category: 'atomic-blocks',
	keywords: [
		__( 'layout', 'atomic-blocks' ),
		__( 'column', 'atomic-blocks' ),
		__( 'row', 'atomic-blocks' ),
	],
	attributes: {
		columns: {
			type: 'number',
		},
		columnStyle: {
			type: 'string',
		},
		columnsGap: {
			type: 'number',
			default: 2,
		},
		align: {
			type: 'string',
		},
		layoutClass: {
			type: 'string',
		},
	},

	// Add alignment to block wrapper
	getEditWrapperProps( { align } ) {
		if ( 'left' === align || 'right' === align || 'full' === align || 'wide' === align ) {
			return { 'data-align': align };
		}
	},

	// Render the Edit component
	edit: Edit,

	// Render the Save component
	save: Save,
} );
