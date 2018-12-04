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

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'atomic-blocks/ab-button' ];

const getColumnsTemplate = memoize( ( columns ) => {
	return times( columns, () => [
		'core/heading', {
			content: 'Default Heading Text',
		},
	] );
} );

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ABPricingBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				testimonialName,
				testimonialTitle,
				testimonialContent,
				testimonialAlignment,
				testimonialImgURL,
				testimonialImgID,
				testimonialBackgroundColor,
				testimonialTextColor,
				testimonialFontSize,
				testimonialCiteAlign
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				testimonialImgID: img.id,
				testimonialImgURL: img.url,
			} );
		};

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
					template={ getColumnsTemplate( columns ) }
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
			default: 3,
		},

		testimonialName: {
			type: 'array',
			selector: '.ab-testimonial-name',
			source: 'children',
		},
		testimonialTitle: {
			type: 'array',
			selector: '.ab-testimonial-title',
			source: 'children',
		},
		testimonialContent: {
			type: 'array',
			selector: '.ab-testimonial-text',
			source: 'children',
		},
		testimonialAlignment: {
			type: 'string',
		},
		testimonialImgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		testimonialImgID: {
			type: 'number',
		},
		testimonialBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		testimonialTextColor: {
			type: 'string',
			default: '#32373c'
		},
		testimonialFontSize: {
			type: 'number',
			default: 18,
		},
		testimonialCiteAlign: {
            type: 'string',
            default: 'left-aligned',
        },
	},

	// Render the block components
	edit: ABPricingBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			columns,
			testimonialName,
			testimonialTitle,
			testimonialContent,
			testimonialAlignment,
			testimonialImgURL,
			testimonialImgID,
			testimonialBackgroundColor,
			testimonialTextColor,
			testimonialFontSize,
			testimonialCiteAlign
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<PricingTable { ...props }>
				<InnerBlocks.Content />
			</PricingTable>
		);
	},
} );
