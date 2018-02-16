/**
 * BLOCK: Atomic Blocks Testimonial List
 */

 // Import block dependencies and components
import classnames from 'classnames';
import PostList from './components/post-list';

//  Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n; 

// Register block controls
const { 
	registerBlockType,
} = wp.blocks;

// Register components
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