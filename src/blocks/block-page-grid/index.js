/**
 * BLOCK: Atomic Blocks Page Grid
 */

// Import block dependencies and components
import classnames from 'classnames';
// import Inspector from './components/inspector';
// import ShareLinks from './components/sharing';
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

export const name = 'core/latest-posts';

// Register the block
registerBlockType( 'atomic-blocks/ab-post-grid', {
	title: __( 'AB Post Grid' ),
	description: __( 'Add sharing buttons to your posts and pages.' ),
	icon: 'list-view',
	category: 'common',
	keywords: [
		__( 'post' ),
		__( 'grid' ),
		__( 'atomic' ),
	],

	edit,

	// Render via PHP
	save() {
		return null;
	},
} );