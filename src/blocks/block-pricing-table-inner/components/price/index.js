/**
 * BLOCK: Atomic Blocks Pricing Table - Price Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './edit';

import deprecated from './deprecated/deprecated';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;

const {
	RichText,
	getFontSizeClass,
	FontSizePicker,
	withFontSizes,
	getColorClassName,
} = wp.blockEditor;

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-price', {
	title: __( 'Product Price', 'atomic-blocks' ),
	description: __(
		'Adds a product price component with schema markup.',
		'atomic-blocks'
	),
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
		currency: {
			type: 'string',
		},
		fontSize: {
			type: 'string',
		},
		customFontSize: {
			type: 'number',
			default: 60,
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
		showTerm: {
			type: 'boolean',
			default: true,
		},
		showCurrency: {
			type: 'boolean',
			default: true,
		},
		paddingTop: {
			type: 'number',
			default: 10,
		},
		paddingRight: {
			type: 'number',
			default: 20,
		},
		paddingBottom: {
			type: 'number',
			default: 10,
		},
		paddingLeft: {
			type: 'number',
			default: 20,
		},
	},

	// Render the block components
	edit: Edit,

	// Save the attributes and markup
	save( props ) {
		// Setup the attributes
		const {
			price,
			currency,
			fontSize,
			customFontSize,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
			term,
			showTerm,
			showCurrency,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
		} = props.attributes;

		// Retreive the fontSizeClass
		const fontSizeClass = getFontSizeClass( fontSize );

		// Retreive the getColorClassName
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName(
			'background-color',
			backgroundColor
		);

		// Setup wrapper class names
		const wrapperClassName = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'ab-pricing-table-price-wrap': true,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
			'ab-pricing-has-currency': showCurrency && currency,
		} );

		// Setup class names
		const className = classnames( {
			'ab-pricing-table-price': true,
			[ fontSizeClass ]: fontSizeClass,
		} );

		// Setup styles
		const wrapperStyles = {
			backgroundColor: backgroundClass
				? undefined
				: customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined,
		};

		// Setup styles
		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		// Setup currency styles
		const computedFontSize = fontSizeClass ? undefined : customFontSize;
		const currencySize = Math.floor( computedFontSize / 2.5 );
		const currencyStyles = {
			fontSize: computedFontSize ? currencySize + 'px' : undefined,
		};

		// Setup term styles
		const termSize = Math.floor( computedFontSize / 2.5 );
		const termStyles = {
			fontSize: computedFontSize ? termSize + 'px' : undefined,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ wrapperClassName ? wrapperClassName : undefined }
				style={ wrapperStyles }
			>
				<div
					itemProp="offers"
					itemScope
					itemType="http://schema.org/Offer"
				>
					{ currency && showCurrency && (
						<RichText.Content
							tagName="span"
							itemProp="priceCurrency"
							value={ currency }
							className="ab-pricing-table-currency"
							style={ currencyStyles }
						/>
					) }
					<RichText.Content
						tagName="div"
						itemProp="price"
						value={ price }
						className={ className ? className : undefined }
						style={ styles }
					/>
					{ term && showTerm && (
						<RichText.Content
							tagName="span"
							value={ term }
							className="ab-pricing-table-term"
							style={ termStyles }
						/>
					) }
				</div>
			</div>
		);
	},

	deprecated,
} );
