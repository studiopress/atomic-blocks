/**
 * BLOCK: Atomic Blocks Call-To-Action
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CallToAction from './components/cta';

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
	URLInput,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	Toolbar,
} = wp.components;

const blockAttributes = {
	buttonText: {
		type: 'string',
	},
	buttonUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
	},
	buttonAlignment: {
		type: 'string',
		default: 'center'
	},
	buttonBackgroundColor: {
		type: 'string',
		default: '#3373dc'
	},
	buttonTextColor: {
		type: 'string',
		default: '#ffffff'
	},
	buttonSize: {
		type: 'string',
		default: 'ab-button-size-medium'
	},
	buttonShape: {
		type: 'string',
		default: 'ab-button-shape-rounded'
	},
	buttonTarget: {
		type: 'boolean',
		default: false
	},
	ctaTitle: {
		type: 'array',
		selector: '.ab-cta-title',
		source: 'children',
	},
	ctaTitleFontSize: {
		type: 'string',
		default: '32'
	},
	ctaTextFontSize: {
		type: 'string',
		default: '20'
	},
	ctaText: {
		type: 'array',
		selector: '.ab-cta-text',
		source: 'children',
	},
	ctaWidth: {
		type: 'string',
		default: 'center',
	},
	ctaBackgroundColor: {
		type: 'string',
		default: '#f2f2f2'
	},
	ctaTextColor: {
		type: 'string',
		default: '#32373c'
	},
	imgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	imgID: {
		type: 'number',
	},
	imgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	dimRatio: {
		type: 'number',
		default: 50,
	},
};

class ABCTABlock extends Component {
	
	render() {

		// Setup the attributes
		const { 
			attributes: { 
			buttonText, 
			buttonUrl, 
			buttonAlignment, 
			buttonBackgroundColor, 
			buttonTextColor, 
			buttonSize, 
			buttonShape, 
			buttonTarget, 
			ctaTitle, 
			ctaText, 
			ctaTitleFontSize, 
			ctaTextFontSize, 
			ctaWidth, 
			ctaBackgroundColor, 
			ctaTextColor,
			imgURL,
			imgID,
			imgAlt,
			dimRatio,
			}, 
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={ ctaWidth }
					onChange={ ctaWidth => setAttributes( { ctaWidth } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
				<AlignmentToolbar
					value={ buttonAlignment }
					onChange={ ( value ) => {
						setAttributes( { buttonAlignment: value } );
					} }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the button markup in the editor
			<CallToAction { ...this.props }>
				{ imgURL && !! imgURL.length && (
					<div class="ab-cta-image-wrap">
						<img 
							className={ classnames(
								'ab-cta-image',
								dimRatioToClass( dimRatio ),
								{
									'has-background-dim': dimRatio !== 0,
								}
							) }
							src={ imgURL }
							alt={ imgAlt }
						/>
					</div>
				) }

				<div class="ab-cta-content">
					<RichText
						tagName="h2"
						placeholder={ __( 'Call-To-Action Title' ) }
						keepPlaceholderOnFocus
						value={ ctaTitle }
						className={ classnames(
							'ab-cta-title',
							'ab-font-size-' + ctaTitleFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
						onChange={ (value) => setAttributes( { ctaTitle: value } ) }
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Call To Action Text' ) }
						keepPlaceholderOnFocus
						value={ ctaText }
						className={ classnames(
							'ab-cta-text',
							'ab-font-size-' + ctaTextFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
						onChange={ ( value ) => setAttributes( { ctaText: value } ) }
					/>
				</div>
				<div class="ab-cta-button">
					<RichText
						tagName="span"
						placeholder={ __( 'Button text...' ) }
						keepPlaceholderOnFocus
						value={ buttonText }
						formattingControls={ [] }
						className={ classnames(
							'ab-button',
							buttonShape,
							buttonSize,
						) }
						style={ {
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						} }
						onChange={ (value) => setAttributes( { buttonText: value } ) }
					/>
					{ isSelected && (
						<form
							key="form-link"
							className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
							onSubmit={ event => event.preventDefault() }
							style={ {
								textAlign: buttonAlignment,
							} }
						>
							<Dashicon icon={ 'admin-links' } />
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply' ) }
								type="submit"
							/>
						</form>
					) }
				</div>
			</CallToAction>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-cta', {
	title: __( 'AB Call To Action' ),
	description: __( 'Add a call to action section with a title, text, and a button.' ),
	icon: 'megaphone',
	category: 'atomic-blocks',
	keywords: [
		__( 'call to action' ),
		__( 'cta' ),
		__( 'atomic' ),
	],

	attributes: blockAttributes,

	getEditWrapperProps( { ctaWidth } ) {
		if ( 'left' === ctaWidth || 'right' === ctaWidth || 'full' === ctaWidth ) {
			return { 'data-align': ctaWidth };
		}
	},

	// Render the block components
	edit: ABCTABlock,

	// Save the attributes and markup
	save: function( props ) {
		
		// Setup the attributes
		const { 
			buttonText, 
			buttonUrl, 
			buttonAlignment, 
			buttonBackgroundColor, 
			buttonTextColor, 
			buttonSize, 
			buttonShape, 
			buttonTarget, 
			ctaTitle, 
			ctaText, 
			ctaTitleFontSize, 
			ctaTextFontSize, 
			ctaWidth, 
			ctaBackgroundColor, 
			ctaTextColor,
			imgURL,
			imgID,
			imgAlt,
			dimRatio,
		} = props.attributes;
		
		// Save the block markup for the front end
		return (
			<CallToAction { ...props }>
				{ imgURL && !! imgURL.length && (
					<div class="ab-cta-image-wrap">
						<img 
							className={ classnames(
								'ab-cta-image',
								dimRatioToClass( dimRatio ),
								{
									'has-background-dim': dimRatio !== 0,
								}
							) }
							src={ imgURL }
							alt={ imgAlt }
						/>
					</div>
				) }

				<div class="ab-cta-content">
					{ ctaTitle && !! ctaTitle.length && (
						<RichText.Content 
							tagName="h2" 
							className={ classnames(
								'ab-cta-title',
								'ab-font-size-' + ctaTitleFontSize,
							) }
							style={ {
								color: ctaTextColor,
							} }
							value={ ctaTitle } 
						/>
					) }
					{ ctaText && !! ctaText.length && (
						<RichText.Content 
							tagName="div" 
							className={ classnames(
								'ab-cta-text',
								'ab-font-size-' + ctaTextFontSize,
							) }
							style={ {
								color: ctaTextColor,
							} }
							value={ ctaText } 
						/>
					) }
				</div>
				{ buttonText && !! buttonText.length && (
					<div class="ab-cta-button">
						<a
							href={ buttonUrl }
							target={ buttonTarget ? '_blank' : '_self' } 
							className={ classnames(
								'ab-button',
								buttonShape,
								buttonSize,
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							} }
						>
							<RichText.Content 
								value={ buttonText } 
							/>
						</a>
					</div>
				) }
			</CallToAction>
		);
	},
} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}