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
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
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
	heading: {
		type: 'string',
		source: 'html',
		selector: 'h2',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	accordionOpen: {
		type: 'boolean',
		default: false,
	},
};

/**
 * Create a AccordionBlock wrapper Component
 */
class AccordionBlock extends Component {
	render() {
		return (
			<div
				className="lsx-faq-block"
			>{ this.props.children }</div>
		);
	}
}

registerBlockType( 'lsx-blocks/faq-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LSX FAQ' ), // Block title.
	icon: 'format-status', // Block icon
	category: 'common', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'FAQ' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { heading, content, alignment } = attributes;

		function onChangeHeading( newHeading ) {
			setAttributes( { heading: newHeading } );
		}

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( { alignment: newAlignment } );
		}

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<div className={ className } >
					<RichText
						tagName="h2"
						placeholder={ __( 'FAQ Question', 'lsx-blocks' ) }
						style={ {
							textAlign: alignment,
						} }
						className="faq-accordion-title"
						onChange={ onChangeHeading }
						value={ heading }
					/>
					<RichText
						tagName="p"
						placeholder={ __( 'FAQ Answer', 'lsx-blocks' ) }
						style={ {
							textAlign: alignment,
						} }
						className="faq-accordion-text"
						onChange={ onChangeContent }
						value={ content }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { heading, content, alignment } = attributes;

		return (
			<AccordionBlock>
				<div className="wp-block-lsx-blocks-faq-block">
					<details>
						<summary className="lsx-faq-question">
							<RichText.Content
								style={ { textAlign: alignment } }
								tagName="h2"
								className="faq-accordion-title"
								value={ heading }
							/>
						</summary>
						<div className="lsx-faq-answer">
							<RichText.Content
								style={ { textAlign: alignment } }
								className="faq-accordion-text"
								tagName="p"
								value={ content }
							/>
						</div>
					</details>
				</div>
			</AccordionBlock>
		);
	},
} );
