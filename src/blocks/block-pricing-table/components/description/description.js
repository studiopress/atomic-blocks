/**
 * BLOCK: Atomic Blocks Pricing Table - Description Component
 */

// Import block dependencies and components
import classnames from 'classnames';
import icons from '../icons';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
} = wp.editor;

class ABPricingTableDescription extends Component {

	render() {

		// Setup the attributes
		const { attributes: { description }, isSelected, className, setAttributes } = this.props;

		return [
			<RichText
				tagName="ul"
				multiline="li"
				itemprop="description"
				placeholder={ __( 'Add a product description', 'atomic-blocks' ) }
				keepPlaceholderOnFocus
				value={ description }
				onChange={ ( value ) => setAttributes( { description: value } ) }
				className={ classnames(
					'ab-pricing-table-description'
				) }
			/>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-description', {
	title: __( 'Product Description', 'atomic-blocks' ),
	description: __( 'Adds a product description component with schema markup.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],

	attributes: {
		description: {
			type: 'string',
			source: 'html',
			selector: 'ol,ul',
			multiline: 'li',
		},
	},

	// Render the block components
	edit: ABPricingTableDescription,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			description
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="ul"
				itemprop="description"
				value={ description }
				className={ classnames(
					'ab-pricing-table-description'
				) }
			/>
		);
	},
} );