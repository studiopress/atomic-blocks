/**
 * BLOCK: Atomic Blocks Pricing Table - Price Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	Component,
	Fragment
} = wp.element;

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
		__( 'price', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
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
		term: {
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
			term,
		} = props.attributes;

		// Retreive the fontSizeClass
		const fontSizeClass = getFontSizeClass( fontSize );

		// Retreive the getColorClassName
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		// Setup wrapper class names
		const wrapperClassName = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'ab-pricing-table-price-wrap': true,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
		} );

		// Setup class names
		const className = classnames( {
			'ab-pricing-table-price': true,
			[ fontSizeClass ]: fontSizeClass,
		} );

		// Setup styles
		const wrapperStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

		// Setup styles
		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ wrapperClassName ? wrapperClassName : undefined }
				style={ wrapperStyles }
			>
				<RichText.Content
					tagName="div"
					itemprop="price"
					value={ price }
					className={ className ? className : undefined }
					style={ styles }
				/>
				{ term && (
					<RichText.Content
						tagName="span"
						value={ term }
						className={ classnames(
							'ab-pricing-table-term',
						) }
					/>
				) }
			</div>
		);
	},
} );