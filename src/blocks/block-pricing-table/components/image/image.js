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
		},
		alt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
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
			images,
			url,
			id,
			alt,
		} = props.attributes;

		// If there is no fontSizeClass, use customFontSize
		const styles = {
			// fontSize: fontSizeClass ? undefined : customFontSize,
			// backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			// color: textClass ? undefined : customTextColor,
		};

		const className = classnames( {
			// 'has-background': backgroundColor || customBackgroundColor,
			// 'ab-pricing-table-title': true,
			// [ fontSizeClass ]: fontSizeClass,
			// [ textClass ]: textClass,
			// [ backgroundClass ]: backgroundClass,
		} );

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="div"
				itemprop="price"
			/>
		);
	},
} );