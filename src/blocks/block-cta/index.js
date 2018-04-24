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

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	UrlInput,
} = wp.blocks;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

class ABctaBlock extends Component {
	
	render() {

		// Setup the attributes
		const { attributes: { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget, ctaTitle, ctaText, ctaTitleFontSize, ctaTextFontSize, ctaWidth, ctaBackgroundColor, ctaTextColor }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			isSelected && (
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
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the button markup in the editor
			<CallToAction { ...this.props }>
				<div class="ab-cta-content">
					<RichText
						tagName="h2"
						placeholder={ __( 'Call-To-Action Title' ) }
						isSelected={ isSelected }
						keepPlaceholderOnFocus
						value={ ctaTitle }
						formattingControls={ [] }
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
						value={ ctaText }
						isSelected={ isSelected }
						keepPlaceholderOnFocus
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
						className={ classnames(
							'ab-cta-text',
							'ab-font-size-' + ctaTextFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
						onChange={ ( value ) => this.props.setAttributes( { ctaText: value } ) }
					/>
				</div>
				
				<div class="ab-cta-button">
					<RichText
						tagName="span"
						placeholder={ __( 'Button text...' ) }
						isSelected={ isSelected }
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

					{ !! this.props.focus && (
						<form
							key="form-link"
							className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
							onSubmit={ event => event.preventDefault() }
							style={ {
								textAlign: buttonAlignment,
							} }
						>
							<Dashicon icon={ 'admin-links' } />
							<UrlInput
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
	category: 'common',
	keywords: [
		__( 'call to action' ),
		__( 'cta' ),
		__( 'atomic' ),
	],
	attributes: {
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
			type: 'string',
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
	},

	getEditWrapperProps( { ctaWidth } ) {
		if ( 'left' === ctaWidth || 'right' === ctaWidth || 'full' === ctaWidth ) {
			return { 'data-align': ctaWidth };
		}
	},

	// Render the block components
	edit: ABctaBlock,

	// Save the attributes and markup
	save: function( props ) {
		
		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget, ctaTitle, ctaText, ctaTitleFontSize, ctaTextFontSize, ctaWidth, ctaBackgroundColor, ctaTextColor } = props.attributes;
		
		// Save the block markup for the front end
		return (
			<CallToAction { ...props }>
				<div class="ab-cta-content">
					<h2 
						className={ classnames(
							'ab-cta-title',
							'ab-font-size-' + ctaTitleFontSize,
						) }
						style={ {
							color: ctaTextColor,
						} }
					>{ ctaTitle }</h2>
					
					<div 
						className={ classnames(
							'ab-cta-text',
						) }
						style={ {
							color: ctaTextColor,
						} }
					>{ ctaText }</div>
				</div>
				
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
						{ buttonText }
					</a>
				</div>
			</CallToAction>
		);
	},
} );