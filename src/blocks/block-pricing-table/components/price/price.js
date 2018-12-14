/**
 * BLOCK: Atomic Blocks Pricing Table - Price Component
 */

// Import block dependencies and components
import classnames from 'classnames';
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
	getColorClassName,
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
		textColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
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
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
		} = props.attributes;

		// Retreive the fontSizeClass
		const fontSizeClass = getFontSizeClass( fontSize );

		// Retreive the getColorClassName
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		// If there is no fontSizeClass, use customFontSize
		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

		const className = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'ab-pricing-table-price': true,
			[ fontSizeClass ]: fontSizeClass,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
		} );

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="div"
				itemprop="price"
				value={ price }
				style={ styles }
				className={ className ? className : undefined }
			/>
		);
	},
} );