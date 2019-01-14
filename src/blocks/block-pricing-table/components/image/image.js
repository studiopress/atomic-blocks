/**
 * BLOCK: Atomic Blocks Pricing Table - Image Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './edit';
import icons from '../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

const {
	RichText,
	Fragment,
} = wp.editor;

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-image', {
	title: __( 'Product Image', 'atomic-blocks' ),
	description: __( 'Adds a product image component with schema markup.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'image', 'atomic-blocks' ),
	],

	attributes: {
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		id: {
			type: 'number',
		},
	},

	// Render the block components
	edit: Edit,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			url,
			alt,
		} = props.attributes;

		// const productImage = ( src, alt ) => {
		// 	if( !src ) return null;

		// 	if( alt ) {
		// 		return (
		// 			<img
		// 				className="card__image"
		// 				src={ src }
		// 				alt={ alt }
		// 			/>
		// 		);
		// 	}

		// 	// No alt set, hide it from screen readers
		// 	return (
		// 		<img
		// 			className="card__image"
		// 			src={ src }
		// 			alt=""
		// 			aria-hidden="true"
		// 		/>
		// 	);
		// };

		return (
			<div className="ab-block-pricing-table-image-wrap">
				<img
					className="ab-block-pricing-table-image"
					src={ url }
					alt={ alt }
				/>
			</div>
		);
	},
} );