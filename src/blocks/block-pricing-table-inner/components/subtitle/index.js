/**
 * BLOCK: Atomic Blocks Pricing Table - Subtitle Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

const {
	RichText,
	getFontSizeClass,
	FontSizePicker,
	withFontSizes,
	getColorClassName
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
		__( 'subtitle', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' )
	],

	attributes: {
		subtitle: {
			type: 'string'
		},
		fontSize: {
			type: 'string'
		},
		customFontSize: {
			type: 'number'
		},
		textColor: {
			type: 'string'
		},
		customTextColor: {
			type: 'string'
		},
		backgroundColor: {
			type: 'string'
		},
		customBackgroundColor: {
			type: 'string'
		},
		paddingTop: {
			type: 'number',
			default: 10
		},
		paddingRight: {
			type: 'number',
			default: 20
		},
		paddingBottom: {
			type: 'number',
			default: 10
		},
		paddingLeft: {
			type: 'number',
			default: 20
		}
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
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft
		} = props.attributes;

		// Retreive the fontSizeClass
		const fontSizeClass = getFontSizeClass( fontSize );

		// Retreive the getColorClassName
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		// Setup class names
		const className = classnames({
			'has-background': backgroundColor || customBackgroundColor,
			'ab-pricing-table-subtitle': true,
			[ fontSizeClass ]: fontSizeClass,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass
		});

		// Setup styles
		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined
		};

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="div"
				value={ subtitle }
				className={ className ? className : undefined }
				style={ styles }
			/>
		);
	}
});
