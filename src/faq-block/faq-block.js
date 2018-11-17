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
const {
	registerBlockType,
	createBlock,
} = wp.blocks; // Import registerBlockType() from wp.blocks

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
	accordionTitle: {
		type: 'array',
		selector: '.ab-accordion-title',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.ab-accordion-text',
		source: 'children',
	},
	accordionAlignment: {
		type: 'string',
	},
	accordionFontSize: {
		type: 'number',
		default: 18,
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
		//const { attributes: { width } } = this.props;
		return (
			<div
				className="wp-block-lsx-blocks-fqa-block "
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

	edit( { attributes, setAttributes, accordionTitle, accordionText } ) {
		const { alignment } = attributes;

		// function onChangeContent( newContent ) {
		// 	setAttributes( { content: newContent } );
		// }

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
				<RichText
					tagName="h2"
					placeholder={ __( 'Accordion Title' ) }
					value={ accordionTitle }
					className="ab-accordion-title"
					onChange={ ( value ) => this.props.setAttributes( { accordionTitle: value } ) }
				/>
				<RichText
					tagName="p"
					placeholder={ __( 'Accordion Text' ) }
					value={ accordionText }
					className="ab-accordion-title"
					onChange={ ( value ) => this.props.setAttributes( { accordionTitle: value } ) }
				/>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { accordionText, alignment, accordionTitle } = attributes;

		return (
			<AccordionBlock>
				<div className="lsx-cta-container">
					<RichText.Content
						style={ { textAlign: alignment } }
						tagName="h2"
						value={ accordionTitle }
					/>
				</div>
				<div className="lsx-cta-container">
					<RichText.Content
						style={ { textAlign: alignment } }
						tagName="p"
						value={ accordionText }
					/>
				</div>
			</AccordionBlock>
		);
	},
} );
