/**
 * Price component deprecations.
 */

import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	RichText,
	getFontSizeClass,
	getColorClassName
} = wp.editor;

export const Price_1_7_0_attributes = {
	price: {
		type: 'string'
	},
	currency: {
		type: 'string'
	},
	fontSize: {
		type: 'string'
	},
	customFontSize: {
		type: 'number',
	default: 60
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
	term: {
		type: 'string'
	},
	showTerm: {
		type: 'boolean',
	default: true
	},
	showCurrency: {
		type: 'boolean',
	default: true
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
};

export const Price_1_7_0_save = props => {

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
		paddingLeft
	} = props.attributes;

	// Retreive the fontSizeClass
	const fontSizeClass = getFontSizeClass( fontSize );

	// Retreive the getColorClassName
	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	// Setup wrapper class names
	const wrapperClassName = classnames({
		'has-background': backgroundColor || customBackgroundColor,
		'ab-pricing-table-price-wrap': true,
		[ textClass ]: textClass,
		[ backgroundClass ]: backgroundClass,
		'ab-pricing-has-currency': showCurrency && currency
	});

	// Setup class names
	const className = classnames({
		'ab-pricing-table-price': true,
		[ fontSizeClass ]: fontSizeClass
	});

	// Setup styles
	const wrapperStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		paddingTop: paddingTop ? paddingTop + 'px' : undefined,
		paddingRight: paddingRight ? paddingRight + 'px' : undefined,
		paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
		paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined
	};

	// Setup styles
	const styles = {
		fontSize: fontSizeClass ? undefined : customFontSize
	};

	// Setup currency styles
	var computedFontSize = fontSizeClass ? undefined : customFontSize;
	var currencySize = Math.floor( computedFontSize / 2.5 );
	const currencyStyles = {
		fontSize: computedFontSize ? currencySize + 'px' : undefined
	};

	// Setup term styles
	var termSize = Math.floor( computedFontSize / 2.5 );
	const termStyles = {
		fontSize: computedFontSize ? termSize + 'px' : undefined
	};

	// Save the block markup for the front end
	return (
		<div
			className={ wrapperClassName ? wrapperClassName : undefined }
			style={ wrapperStyles }
		>
			<div itemProp="offers" itemScope itemType="http://schema.org/Offer">
				{ currency && showCurrency && (
					<RichText.Content
						tagName="span"
						itemProp="priceCurrency"
						placeholder={ __( '$', 'atomic-blocks' ) }
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
};

const deprecated = [

	// Version 1.7.0
	{
		attributes: Price_1_7_0_attributes,
		save: Price_1_7_0_save
	}
];

export default deprecated;
