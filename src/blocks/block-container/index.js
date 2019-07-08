/**
 * BLOCK: Atomic Blocks Container
 */

// Import block dependencies and components
import classnames from 'classnames';
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
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
	InnerBlocks
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	withState,
	Toolbar
} = wp.components;

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
		type: 'number',
		default: 1600
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
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerBackgroundColor,
				containerImgURL,
				containerImgID,
				containerImgAlt,
				containerDimRatio
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt
			});
		};

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
				<div className="ab-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div className="ab-container-image-wrap">
							<img
								className={ classnames(
									'ab-container-image',
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': 0 !== containerDimRatio
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }

					<div
						className="ab-container-content"
						style={ {
							maxWidth: `${containerMaxWidth}px`
						} }
					>
						<InnerBlocks />
					</div>
				</div>
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

	getEditWrapperProps({ containerWidth }) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: ABContainerBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerWidth,
			containerMaxWidth,
			containerBackgroundColor,
			containerImgURL,
			containerImgID,
			containerImgAlt,
			containerDimRatio
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Container { ...props }>
				<div className="ab-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div className="ab-container-image-wrap">
							<img
								className={ classnames(
									'ab-container-image',
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': 0 !== containerDimRatio
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }

					<div
						className="ab-container-content"
						style={ {
							maxWidth: `${containerMaxWidth}px`
						} }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</Container>
		);
	},

	deprecated: deprecated

});

function dimRatioToClass( ratio ) {
	return ( 0 === ratio || 50 === ratio ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}
