/**
 * BLOCK: Atomic Blocks Pricing Table
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import icons from './components/icons';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	InnerBlocks,
} = wp.editor;

const {
	Fragment,
} = wp.element;

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
	},

	// Render the block components
	edit: props => {
		return (
			<Fragment>
				<div>
					<InnerBlocks
						template={[
							// Add placeholder blocks
							['core/heading', {
								content: '$49',
								attributes: {
									level: '4',
								},
							}],
							['core/list', {
								values: '<li>test this</li><li>test this two</li><li>test this three</li>',
								multilineTag: 'li',
								ordered: true,
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
		);
	},

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			columns,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
