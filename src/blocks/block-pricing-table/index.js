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
	'atomic-blocks/ab-spacer',
	'core/paragraph',
	'core/list',
	'core/image',
];

class ABPricingTableBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: {
			borderWidth,
			borderColor,
			backgroundColor,
			padding,
			alignment
		},
			isSelected,
			className,
			setAttributes
		} = this.props;

		const styles = {
			borderWidth: borderWidth ? borderWidth : null,
			borderStyle: borderWidth > 0 ? 'solid' : null,
			borderColor: borderColor ? borderColor : null,
			backgroundColor: backgroundColor ? backgroundColor : null,
			padding: padding ? padding + '%' : null,
		};

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( nextAlign ) => {
						setAttributes( { alignment: nextAlign } );
					} }
				/>
			</BlockControls>,
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			<Fragment>
				<div
					className={ classnames(
						alignment ? 'ab-block-pricing-table-' + alignment : 'ab-block-pricing-table-center',
						'ab-block-pricing-table',
					) }
					itemscope
					itemtype="http://schema.org/Product"
				>
					<div
						class="ab-block-pricing-table-inside"
						style={ styles }
					>
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
									buttonBackgroundColor: '#272c30'
								}],
							]}
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateInsertUpdatesSelection={ false }
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
		__( 'buy', 'atomic-blocks' ),
	],
	attributes: {
		borderWidth: {
			type: 'number',
			default: 2,
		},
		borderColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		alignment: {
			type: 'string',
		},
		padding: {
			type: 'number',
			default: 10,
		},
	},

	// Render the block components
	edit: ABPricingTableBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			borderWidth,
			borderColor,
			backgroundColor,
			alignment,
			padding,
		} = props.attributes;

		const styles = {
			borderWidth: borderWidth ? borderWidth : null,
			borderStyle: borderWidth > 0 ? 'solid' : null,
			borderColor: borderColor ? borderColor : null,
			backgroundColor: backgroundColor ? backgroundColor : null,
			padding: padding ? padding + '%' : null,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ classnames(
					alignment ? 'ab-block-pricing-table-' + alignment : 'ab-block-pricing-table-center',
					'ab-block-pricing-table',
				) }
				itemscope
				itemtype="http://schema.org/Product"
			>
				<div
					class="ab-block-pricing-table-inside"
					style={ styles }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
