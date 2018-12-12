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

class ABPricingTableBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { columns, tableAlignment }, isSelected, className, setAttributes } = this.props;

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ tableAlignment }
					onChange={ ( value ) => {
						setAttributes( { tableAlignment: value } );
					} }
				/>
			</BlockControls>,
			<Fragment>
				<div className={ classnames(
					tableAlignment ? 'ab-block-pricing-table-' + tableAlignment : null,
					'ab-block-pricing-table',
				) }>
					<InnerBlocks
						template={[
							// Add placeholder blocks
							['core/heading', {
								content: 'Price Title',
								attributes: {
									level: '6',
								},
							}],
							['core/heading', {
								content: '$49',
								attributes: {
									level: '4',
								},
							}],
							['core/list', {
								values: '<li>test this</li><li>test this two</li><li>test this three</li>',
								multilineTag: 'li',
								ordered: false,
							}],
							['core/paragraph', {
								content: 'Lorem ipsum dolor sit amet elit do, consectetur adipiscing, sed eiusmod tempor incididunt ut labore et.'
							}],
							['atomic-blocks/ab-button', {
								buttonText: 'Find Out More',
								buttonAlignment: 'left',
							}],
						]}
						templateLock={ false }
					/>
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
		columns: {
			type: 'number',
			default: 3,
		},
		tableAlignment: {
			type: 'string',
		},
	},

	// Render the block components
	edit: ABPricingTableBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			columns,
			tableAlignment,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<div className={ classnames(
				tableAlignment ? 'ab-block-pricing-table-' + tableAlignment : null,
			) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
