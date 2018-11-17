/**
 * BLOCK: CTA Block
 *
 * Registering a cta block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
} = wp.editor;
const {
	Fragment,
	Component,
} = wp.element;

/**
 * Register: aa Gutenberg Block.
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	width: {
		type: 'string',
		default: 'center',
	},
	ctaBackgroundColor: {
		type: 'string',
		default: '#f2f2f2',
	},
	buttonAlignment: {
		type: 'string',
		default: 'center',
	},
};

/**
 * Create a CallToAction wrapper Component
 */
class CallToAction extends Component {
	render() {
		//const { attributes: { width } } = this.props;
		return (
			<div
				className="wp-block-lsx-blocks-cta-block "
			>{ this.props.children }</div>
		);
	}
}

registerBlockType( 'lsx-blocks/cta-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LSX CTA' ), // Block title.
	icon: 'slides', // Block icon
	category: 'common', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'CTA' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { content, alignment, width } = attributes;

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( { alignment: newAlignment } );
		}

		function onChangeWidth( newWidth ) {
			setAttributes( { width: newWidth } );
		}

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ width }
						onChange={ onChangeWidth }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<RichText
					tagName="p"
					className={ className }
					onChange={ onChangeContent }
					value={ content }
				/>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { content, alignment } = attributes;

		return (
			<CallToAction>
				<div className="lsx-cta-container">
					<RichText.Content
						style={ { textAlign: alignment } }
						tagName="p"
						value={ content }
					/>
				</div>
			</CallToAction>
		);
	},
} );
