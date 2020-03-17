/**
 * BLOCK: Atomic Blocks Pricing Table - Button Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './edit';
import CustomButton from './../../../block-button/components/button';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

const {
	RichText,
	getFontSizeClass,
	FontSizePicker,
	withFontSizes,
	getColorClassName,
} = wp.blockEditor;

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-button', {
	title: __( 'Product Button', 'atomic-blocks' ),
	description: __( 'Adds a product button component.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'subtitle', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
	],

	attributes: {
		buttonText: {
			type: 'string',
		},
		buttonUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		buttonAlignment: {
			type: 'string',
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#3373dc',
		},
		buttonTextColor: {
			type: 'string',
			default: '#ffffff',
		},
		buttonSize: {
			type: 'string',
			default: 'ab-button-size-medium',
		},
		buttonShape: {
			type: 'string',
			default: 'ab-button-shape-rounded',
		},
		buttonTarget: {
			type: 'boolean',
			default: false,
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
			backgroundColor,
			customBackgroundColor,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			buttonText,
			buttonUrl,
			buttonAlignment,
			buttonBackgroundColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonTarget,
		} = props.attributes;

		// Retreive the getColorClassName
		const backgroundClass = getColorClassName(
			'background-color',
			backgroundColor
		);

		// Setup class names
		const className = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'ab-pricing-table-button': true,
			[ backgroundClass ]: backgroundClass,
		} );

		// Setup styles
		const styles = {
			backgroundColor: backgroundClass
				? undefined
				: customBackgroundColor,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ className ? className : undefined }
				style={ styles }
			>
				<CustomButton { ...props }>
					{ // Check if there is button text and output
					buttonText && (
						<a
							href={ buttonUrl }
							target={ buttonTarget ? '_blank' : null }
							rel={ buttonTarget ? 'noopener noreferrer' : null }
							className={ classnames(
								'ab-button',
								buttonShape,
								buttonSize
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							} }
						>
							<RichText.Content value={ buttonText } />
						</a>
					) }
				</CustomButton>
			</div>
		);
	},
} );
