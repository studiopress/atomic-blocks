/**
 * BLOCK: Atomic Blocks Pricing Table - Price Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import Edit from './edit';
import icons from '../icons';
import get from 'lodash/get';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	getFontSizeClass,
	FontSizePicker,
  	withFontSizes,
} = wp.editor;

// Compose
const { compose } = wp.compose;

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-price', {
	title: __( 'Product Price', 'atomic-blocks' ),
	description: __( 'Adds a product price component with schema markup.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],

	attributes: {
		price: {
			type: 'string',
		},
		fontSize: {
			type: 'string',
		},
		customFontSize: {
			type: 'number',
		},
	},

	// Render the block components
	edit: Edit,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			price,
			fontSize,
			customFontSize,
		} = props.attributes;

		const fontSizeClass = getFontSizeClass( fontSize );

		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="div"
				itemprop="price"
				value={ price }
				style={ styles }
				className={ classnames(
					'ab-pricing-table-price',
					fontSizeClass
				) }
			/>
		);
	},
} );

export default compose( [
	// applyWithColors,
	// applyFallbackStyles,
	withFontSizes( 'fontSize' ),
] )( Inspector );