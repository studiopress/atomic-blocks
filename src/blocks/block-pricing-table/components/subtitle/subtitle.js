/**
 * BLOCK: Atomic Blocks Pricing Table - Subtitle Component
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
} = wp.editor;

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-subtitle', {
	title: __( 'Product Subtitle', 'atomic-blocks' ),
	description: __( 'Adds a product subtitle component with schema markup.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],

	attributes: {
		subtitle: {
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
			subtitle,
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
				value={ subtitle }
				style={ styles }
				className={ classnames(
					'ab-pricing-table-subtitle',
					fontSizeClass
				) }
			/>
		);
	},
} );