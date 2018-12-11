/**
 * BLOCK: Atomic Blocks Pricing Table
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import PricingTable from './components/pricing';
import icons from './components/icons';
import memoize from 'memize';
import { times } from 'lodash';

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
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	SelectControl,
} = wp.components;

// Set allowed blocks and media
const ALLOWED_BLOCKS = [ 'atomic-blocks/ab-pricing-table' ];

// Get the pricing template
const getPricingTemplate = memoize( ( columns ) => {
	return times( columns, n => [ 'atomic-blocks/ab-pricing-table' ] );
} );

class ABPricingBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				testimonialAlignment,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ testimonialAlignment }
					onChange={ ( value ) => setAttributes( { testimonialAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<PricingTable { ...this.props }>
				<InnerBlocks
					template={ getPricingTemplate( columns ) }
					templateLock="all"
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</PricingTable>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-pricing', {
	title: __( 'AB Pricing', 'atomic-blocks' ),
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
		testimonialAlignment: {
			type: 'string',
		},
	},

	// Render the block components
	edit: ABPricingBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			columns,
			testimonialAlignment,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<PricingTable { ...props }>
				<InnerBlocks.Content />
			</PricingTable>
		);
	},
} );
