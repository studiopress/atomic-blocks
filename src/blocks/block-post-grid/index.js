/**
 * BLOCK: Atomic Blocks Page Grid
 */

// Import block dependencies and components
import classnames from 'classnames';
import edit from './edit';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block controls
const {
	registerBlockType,
} = wp.blocks;

// Register alignments
const validAlignments = [ 'center', 'wide' ];

export const name = 'core/latest-posts';

// Register the block
registerBlockType( 'atomic-blocks/ab-post-grid', {
	title: __( 'AB Post Grid', 'atomic-blocks' ),
	description: __( 'Add a grid or list of customizable posts to your page.', 'atomic-blocks' ),
	icon: 'grid-view',
	category: 'atomic-blocks',
	keywords: [
		__( 'post', 'atomic-blocks' ),
		__( 'grid', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
	],

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},

	edit,

	// Render via PHP
	save() {
		return null;
	},
} );
