/**
 * BLOCK: Atomic Blocks Pricing Table - Price Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import Edit from './edit';
import icons from '../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { compose } = wp.compose;
const { Component } = wp.element;

const {
	RichText,
	getFontSizeClass,
	FontSizePicker,
  	withFontSizes,
} = wp.editor;

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

		// Retreive the fontSizeClass
		const fontSizeClass = getFontSizeClass( fontSize );

		// If there is no fontSizeClass, use customFontSize
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