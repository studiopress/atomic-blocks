/**
 * BLOCK: Atomic Blocks Pricing Table
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	Fragment,
} = wp.element;

const ALLOWED_BLOCKS = [
	'atomic-blocks/ab-pricing-table-description',
	'atomic-blocks/ab-pricing-table-price',
	'atomic-blocks/ab-pricing-table-subtitle',
	'atomic-blocks/ab-pricing-table-title',
	'atomic-blocks/ab-button',
	'core/paragraph',
	'core/list',
	'core/image',
];

class ABPricingTableBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: {
			featured,
			featuredBorderWidth,
			featuredBorderColor,
			tableAlignment
		},
			isSelected,
			className,
			setAttributes
		} = this.props;

		const styles = {
			borderWidth: featuredBorderWidth ? featuredBorderWidth : null,
			borderStyle: featuredBorderWidth > 0 ? 'solid' : null,
			borderColor: featuredBorderColor ? featuredBorderColor : null,
		};

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ tableAlignment }
					onChange={ ( nextAlign ) => {
						setAttributes( { tableAlignment: nextAlign } );
					} }
				/>
			</BlockControls>,
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			<Fragment>
				<div
					className={ classnames(
						tableAlignment ? 'ab-block-pricing-table-' + tableAlignment : null,
						featured ? 'ab-block-pricing-table-featured' : null,
						'ab-block-pricing-table',
					) }
					style={ styles }
					itemscope
					itemtype="http://schema.org/Product"
				>
					<div class="ab-block-pricing-table-inside">
						<InnerBlocks
							template={[
								// Add placeholder blocks
								['atomic-blocks/ab-pricing-table-title', {
									title: '<strong>Test Content</strong>',
									fontSize: 'medium',
								}],
								['atomic-blocks/ab-pricing-table-subtitle', {
									subtitle: 'Price Subtitle Description',
									fontSize: 'normal',
								}],
								['atomic-blocks/ab-pricing-table-price', {
									price: '$49',
									fontSize: 'huge',
								}],
								['atomic-blocks/ab-pricing-table-description', {
									description: '<li>Product Feature One</li><li>Product Feature Two</li><li>Product Feature Three</li><li>Product Feature Four</li>',
									multilineTag: 'li',
									ordered: false,
									fontSize: 'normal',
								}],
								['atomic-blocks/ab-button', {
									buttonText: 'Buy Now',
									buttonBackgroundColor: '#191e22'
								}],
							]}
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing-table', {
	title: __( 'AB Pricing Table', 'atomic-blocks' ),
	description: __( 'Add a pricing table.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-pricing' ],
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],
	attributes: {
		featured: {
			type: 'boolean',
			default: false
		},
		featuredBorderWidth: {
			type: 'number',
			default: 0,
		},
		featuredBorderColor: {
			type: 'string',
		},
		tableAlignment: {
			type: 'string',
			default: 'center',
		},
	},

	// Render the block components
	edit: ABPricingTableBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			featured,
			featuredBorderWidth,
			featuredBorderColor,
			tableAlignment,

		} = props.attributes;

		const styles = {
			borderWidth: featuredBorderWidth ? featuredBorderWidth : null,
			borderStyle: featuredBorderWidth > 0 ? 'solid' : null,
			borderColor: featuredBorderColor ? featuredBorderColor : null,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ classnames(
					tableAlignment ? 'ab-block-pricing-table-' + tableAlignment : null,
					featured ? 'ab-block-pricing-table-featured' : null,
					'ab-block-pricing-table',
				) }
				style={ styles }
				itemscope
				itemtype="http://schema.org/Product"
			>
				<div class="ab-block-pricing-table-inside">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
