/**
 * BLOCK: Atomic Blocks Pricing Table
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import PricingTable from './components/pricing';
import memoize from 'memize';
import _times from 'lodash/times';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { BlockControls, BlockAlignmentToolbar, InnerBlocks } = wp.blockEditor;

const { dispatch } = wp.data;

// Set allowed blocks and media
const ALLOWED_BLOCKS = [ 'atomic-blocks/ab-pricing-table' ];

// Get the pricing template
const getPricingTemplate = memoize( ( columns ) => {
	return _times( columns, () => [ 'atomic-blocks/ab-pricing-table' ] );
} );

class ABPricingBlock extends Component {

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.columns !== prevProps.attributes.columns ) {
			dispatch( 'core/block-editor' ).synchronizeTemplate();
		}
	}

	render() {
		// Setup the attributes
		const {
			attributes: { columns, columnsGap, align },
			setAttributes,
		} = this.props;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( align ) => setAttributes( { align } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector key={ 'ab-pricing-table-inspector-' + this.props.clientId } { ...{ setAttributes, ...this.props } } />,

			// Show the block markup in the editor
			<PricingTable key={ 'ab-pricing-table-' + this.props.clientId } { ...this.props }>
				<div
					className={ classnames(
						'ab-pricing-table-wrap-admin',
						'ab-block-pricing-table-gap-' + columnsGap
					) }
				>
					<InnerBlocks
						template={ getPricingTemplate( columns ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</PricingTable>,
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing', {
	title: __( 'Pricing', 'atomic-blocks' ),
	description: __( 'Add a pricing table.', 'atomic-blocks' ),
	icon: 'cart',
	category: 'atomic-blocks',
	keywords: [
		__( 'pricing table', 'atomic-blocks' ),
		__( 'shop', 'atomic-blocks' ),
		__( 'purchase', 'atomic-blocks' ),
	],
	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		columnsGap: {
			type: 'number',
			default: 2,
		},
		align: {
			type: 'string',
		},
	},

	ab_settings_data: {
		ab_pricing_columns: {
			title: __( 'Pricing Columns', 'atomic-blocks' ),
		},
		ab_pricing_columnsGap: {
			title: __( 'Pricing Columns Gap', 'atomic-blocks' ),
		},
	},

	// Add alignment to block wrapper
	getEditWrapperProps( { align } ) {
		if (
			'left' === align ||
			'right' === align ||
			'full' === align ||
			'wide' === align
		) {
			return { 'data-align': align };
		}
	},

	// Render the block components
	edit: ABPricingBlock,

	// Save the attributes and markup
	save( props ) {
		// Setup the attributes
		const { columnsGap } = props.attributes;

		// Setup the classes
		const className = classnames( [
			'ab-pricing-table-wrap',
			'ab-block-pricing-table-gap-' + columnsGap,
		] );

		// Save the block markup for the front end
		return (
			<PricingTable { ...props }>
				<div className={ className ? className : undefined }>
					<InnerBlocks.Content />
				</div>
			</PricingTable>
		);
	},
} );
