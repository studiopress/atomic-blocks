/**
 * BLOCK: Atomic Blocks Testimonial List
 */

import classnames from 'classnames';
import PostList from './post-list';

//  Import CSS
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; 
const { 
	registerBlockType,
} = wp.blocks;
const {
  IconButton,
  Button,
  Tooltip,
} = wp.components;

// Register the block
registerBlockType( 'atomic/atomic-testimonial-list', {
	title: __( 'Atomic - Testimonial List', 'atomic' ),
	icon: 'format-quote',
	category: 'common',
	keywords: [
		__( 'testimonial' ),
		__( 'quote' ),
		__( 'atomic' ),
	],

	edit: props => {
		return (
			<PostList
			className={props.className}
			/>
		);
	},

	save: props => {
		// Rendered via PHP
		return null
	},
});
