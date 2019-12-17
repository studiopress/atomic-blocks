/**
 * BLOCK: Atomic Blocks Container
 */

// Import block dependencies and components
import Inspector from './components/inspector';
import Container from './components/container';

// Deprecated components
import deprecated from './deprecated/deprecated';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks
} = wp.editor;

const blockAttributes = {
	containerPaddingTop: {
		type: 'number'
	},
	containerPaddingRight: {
		type: 'number'
	},
	containerPaddingBottom: {
		type: 'number'
	},
	containerPaddingLeft: {
		type: 'number'
	},
	containerMarginTop: {
		type: 'number'
	},
	containerMarginBottom: {
		type: 'number'
	},
	containerWidth: {
		type: 'string'
	},
	containerMaxWidth: {
		type: 'number'
	},
	containerBackgroundColor: {
		type: 'string'
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img'
	},
	containerImgID: {
		type: 'number'
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	containerDimRatio: {
		type: 'number',
		default: 50
	}
};

class ABContainerBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				containerWidth
			},
			setAttributes
		} = this.props;

		return [

			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={ containerWidth }
					onChange={ containerWidth => setAttributes({ containerWidth }) }
					controls={ [ 'center', 'full' ] }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,

			// Show the container markup in the editor
			<Container { ...this.props }>
				<InnerBlocks />
			</Container>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-container', {
	title: __( 'AB Container', 'atomic-blocks' ),
	description: __( 'Add a container block to wrap several blocks in a parent container.', 'atomic-blocks' ),
	icon: 'editor-table',
	category: 'atomic-blocks',
	keywords: [
		__( 'container', 'atomic-blocks' ),
		__( 'section', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],

	attributes: blockAttributes,

	ab_settings_data: {
        ab_container_containerOptions: {
            title: __( 'Container Options', 'atomic-blocks' )
        },
        ab_container_backgroundOptions: {
            title: __( 'Background Options', 'atomic-blocks' )
		}
    },

	getEditWrapperProps({ containerWidth }) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: ABContainerBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Save the block markup for the front end
		return (
			<Container { ...props }>
				<InnerBlocks.Content />
			</Container>
		);
	},

	deprecated: deprecated

});
