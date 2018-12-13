/**
 * BLOCK: Atomic Blocks Pricing Table - Title Component
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

class ABPricingTableTitle extends Component {

	render() {

		// Setup the attributes
		const { attributes: { title }, isSelected, className, setAttributes } = this.props;

		return [
			<RichText
				tagName="div"
				itemprop="name"
				placeholder={ __( 'Price Title', 'atomic-blocks' ) }
				keepPlaceholderOnFocus
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				className={ classnames(
					'ab-pricing-table-title'
				) }
			/>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table-title', {
	title: __( 'Product Title', 'atomic-blocks' ),
	description: __( 'Adds a product title component with schema markup.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing-table' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],

	attributes: {
		title: {
			type: 'string',
		},
	},

	// Render the block components
	edit: ABPricingTableTitle,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			title
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<RichText.Content
				tagName="div"
				itemprop="name"
				value={ title }
				className={ classnames(
					'ab-pricing-table-title'
				) }
			/>
		);
	},
} );