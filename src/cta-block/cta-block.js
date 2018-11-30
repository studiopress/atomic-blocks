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
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	TextControl,
} = wp.components;

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
	buttonText: {
		type: 'string',
		source: 'html',
		selector: 'a',
	},
	buttonUrl: {
		type: 'url',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	headingSize: {
		type: 'number',
		default: 26,
	},
	fontSize: {
		type: 'number',
		default: 16,
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
				className="lsx-cta-block"
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
		const { heading, content, alignment, width, headingSize, fontSize, buttonText, buttonUrl } = attributes;

		function onChangeHeading( newHeading ) {
			setAttributes( { heading: newHeading } );
		}

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeButton( newButton ) {
			setAttributes( { buttonText: newButton } );
		}

		function onChangeButtonUrl( updatedUrl ) {
			setAttributes( { buttonUrl: updatedUrl } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( { alignment: newAlignment } );
		}

		function onChangeWidth( newWidth ) {
			setAttributes( { width: newWidth } );
		}

		function onChangeFontHeading( updatedHeadingFont ) {
			setAttributes( { headingSize: updatedHeadingFont } );
		}

		function onChangeFont( updatedFont ) {
			setAttributes( { fontSize: updatedFont } );
		}

		return (
			<Fragment>
				{
					<InspectorControls key="inspector">
						<PanelBody title={ __( 'CTA Settings', 'lsx-blocks' ) } >
							<RangeControl
								label={ __( 'Heading Font Size', 'lsx-blocks' ) }
								value={ headingSize }
								onChange={ onChangeFontHeading }
								min={ 16 }
								max={ 60 }
							/>
							<RangeControl
								label={ __( 'Content Font Size', 'lsx-blocks' ) }
								value={ fontSize }
								onChange={ onChangeFont }
								min={ 14 }
								max={ 40 }
							/>
							<TextControl
								label={ __( 'Button URL', 'lsx-blocks' ) }
								type="url"
								value={ buttonUrl }
								onChange={ onChangeButtonUrl }
							/>
						</PanelBody>
					</InspectorControls>
				}
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
				<div className={ className } >
					<RichText
						tagName="h2"
						placeholder={ __( 'CTA Heading', 'lsx-blocks' ) }
						style={ {
							fontSize: headingSize + 'px',
							textAlign: alignment,
						} }
						className="lsx-cta-title"
						onChange={ onChangeHeading }
						value={ heading }
					/>
					<RichText
						tagName="p"
						placeholder={ __( 'CTA Content', 'lsx-blocks' ) }
						style={ {
							fontSize: fontSize + 'px',
							textAlign: alignment,
						} }
						onChange={ onChangeContent }
						value={ content }
					/>
					<RichText
						tagName="a"
						placeholder={ __( 'Button text', 'lsx-blocks' ) }
						value={ buttonText }
						className="btn"
						style={ {
							textAlign: alignment,
							// color: buttonTextColor,
							// backgroundColor: buttonBackgroundColor,
						} }
						onChange={ onChangeButton }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { heading, content, alignment, headingSize, fontSize, width, buttonText, buttonUrl } = attributes;

		return (
			<div className={ 'align' + width }>
				<CallToAction>
					<div className="lsx-cta-container" style={ { fontSize: fontSize + 'px' } }>
						<RichText.Content
							className="lsx-cta-title"
							tagName="h2"
							style={ {
								fontSize: headingSize + 'px',
								textAlign: alignment,
							} }
							value={ heading }
						/>
						<RichText.Content
							style={ {
								fontSize: fontSize + 'px',
								textAlign: alignment,
							} }
							tagName="p"
							value={ content }
						/>
						<div className="button-container" style={ { textAlign: alignment } }>
							<a href={ buttonUrl } className="btn cta-btn" target="_blank" rel="noopener noreferrer">{ buttonText }</a>
						</div>
					</div>
				</CallToAction>
			</div>
		);
	},
} );
