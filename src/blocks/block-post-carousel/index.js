/**
 * BLOCK: LSX Blocks Page Carousel
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
registerBlockType( 'lsx-blocks/lsx-post-carousel', {
	title: __( 'LSX Post Carousel', 'lsx-blocks' ),
	description: __( 'Add a carousel or list of customizable posts to your page.', 'lsx-blocks' ),
	icon: 'images-alt2',
	category: 'lsx-blocks',
	keywords: [
		__( 'post', 'lsx-blocks' ),
		__( 'carousel', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
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
