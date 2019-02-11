/**
 * BLOCK: LSX Blocks Card Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CardBox from './components/card';
import CustomButton from './components/card';
//import SocialIcons from './components/social';
import AvatarColumn from './components/avatar';
import icons from './components/icons';

// Import styles
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
	URLInput,
} = wp.editor;

// Register Inspector components
const {
	Button,
	Dashicon,
	IconButton,
} = wp.components;

const blockAttributes = {
	buttonText: {
		type: 'string',
	},
	buttonTextColor: {
		type: 'string',
		default: '#ffffff'
	},
	buttonUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
	},
	buttonAlignment: {
		type: 'string',
	},
	buttonBackgroundColor: {
		type: 'string',
		default: '#3373dc',
	},
	buttonShadowColor: {
		type: 'string',
		default: '#27639e',
	},
	buttonHoverColor: {
		type: 'string',
		default: '#27639D',
	},
	buttonFlat: {
		type: 'string',
		default: 'lsx-button-normal',
	},
	buttonSize: {
		type: 'string',
		default: 'lsx-button-size-medium',
	},
	buttonShape: {
		type: 'string',
		default: 'lsx-button-shape-rounded',
	},
	buttonGhost: {
		type: 'string',
		default: 'lsx-button-no-border',
	},
	buttonTarget: {
		type: 'boolean',
		default: false,
	},
	cardName: {
		type: 'array',
		source: 'children',
		selector: '.lsx-card-name',
	},
	cardTitle: {
		type: 'array',
		source: 'children',
		selector: '.lsx-card-title',
	},
	cardContent: {
		type: 'array',
		selector: '.lsx-card-text',
		source: 'children',
	},
	cardAlignment: {
		type: 'string',
	},
	cardImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	cardImgID: {
		type: 'number',
	},
	cardBackgroundColor: {
		type: 'string',
		default: '#f2f2f2',
	},
	cardTextColor: {
		type: 'string',
		default: '#32373c',
	},
	cardLinkColor: {
		type: 'string',
		default: '#392f43',
	},
	cardFontSize: {
		type: 'number',
		default: 15,
	},
};

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class LSXAuthorCardBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonTextColor,
				buttonBackgroundColor,
				buttonShadowColor,
				buttonAlignment,
				buttonUrl,
				buttonShape,
				buttonSize,
				buttonFlat,
				buttonGhost,
				cardName,
				cardTitle,
				cardContent,
				cardAlignment,
				cardImgURL,
				cardImgID,
				cardFontSize,
				cardBackgroundColor,
				cardTextColor,
				cardLinkColor,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				cardImgID: img.id,
				cardImgURL: img.url,
			} );
		};

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ cardAlignment }
					onChange={ ( value ) => setAttributes( { cardAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<CardBox key="card" { ...this.props }>
				<AvatarColumn { ...this.props }>
					<div className="lsx-card-image-square">
						<MediaUpload
							buttonProps={ {
								className: 'change-image',
							} }
							onSelect={ ( img ) => setAttributes(
								{
									cardImgID: img.id,
									cardImgURL: img.url,
								}
							) }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="image"
							value={ cardImgID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! cardImgID ? icons.upload : <img
										className="card-avatar"
										src={ cardImgURL }
										alt="avatar"
									/>  }
								</Button>
							) }
						>
						</MediaUpload>
					</div>
				</AvatarColumn>

				<div
					className={ classnames(
						'lsx-card-column lsx-card-content-wrap'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add Card Title', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ cardName }
						className="lsx-card-name"
						style={ {
							color: cardTextColor,
							fontSize: 'calc(' + cardFontSize + 'px + 5px)',
						} }
						onChange={ ( value ) => setAttributes( { cardName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add Card Subtitle', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ cardTitle }
						className="lsx-card-title"
						style={ {
							color: cardTextColor,
							fontSize: 'calc(' + cardFontSize + 'px - 2px)',
						} }
						onChange={ ( value ) => setAttributes( { cardTitle: value } ) }
					/>

					<RichText
						tagName="div"
						className={ classnames(
							'lsx-card-text',
						) }
						style={ {
							fontSize: cardFontSize + 'px',
						} }
						multiline="p"
						placeholder={ __( 'Add content...', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ cardContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => setAttributes( { cardContent: value } ) }
					/>

					<CustomButton { ...this.props }>
						<RichText
							tagName="span"
							placeholder={ __( 'Button text...', 'lsx-blocks' ) }
							keepPlaceholderOnFocus
							value={ buttonText }
							formattingControls={ [] }
							className={ classnames(
								'lsx-button',
								buttonShape,
								buttonSize,
								buttonFlat,
								buttonGhost,
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
								boxShadow: '2px 2px 0 0 ' + buttonShadowColor,
								borderColor: buttonBackgroundColor,
							} }
							onChange={ ( value ) => setAttributes( { buttonText: value } ) }
						/>
					</CustomButton>
					<form
						key="form-link"
						className={ `blocks-button__inline-link lsx-button-${ buttonAlignment }` }
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
							label={ __( 'Apply', 'lsx-blocks' ) }
							type="submit"
						/>
					</form>

				</div>
			</CardBox>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-card-box', {
	title: __( 'LSX Card Box', 'lsx-blocks' ),
	description: __( 'Add a card box with content and media.', 'lsx-blocks' ),
	icon: 'images-alt',
	category: 'lsx-blocks',
	keywords: [
		__( 'card', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	// Setup the block attributes
	attributes: blockAttributes,

	// Render the block components
	edit: LSXAuthorCardBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { cardName, cardTitle, cardContent, cardAlignment, cardImgURL, cardImgID, cardFontSize, cardBackgroundColor, cardTextColor, cardLinkColor, buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonFlat, buttonShape, buttonGhost, buttonTarget } = props.attributes;

		return (
			// Save the block markup for the front end
			<CardBox { ...props }>

				{ cardImgURL && (
					<AvatarColumn { ...props }>
						<div className="lsx-card-image-square">
							<a
								href={ buttonUrl }
								target={ buttonTarget ? '_blank' : '_self' }
							>
								<img
									className="lsx-card-avatar"
									src={ cardImgURL }
									alt="avatar"
								/>
							</a>
						</div>
					</AvatarColumn>
				) }

				<div
					className={ classnames(
						'lsx-card-column lsx-card-content-wrap'
					) }
				>
					{ cardName && (
						<RichText.Content
							tagName="h2"
							className="lsx-card-name"
							style={ {
								color: cardTextColor,
								fontSize: 'calc(' + cardFontSize + 'px + 5px)',
							} }
							value={ cardName }
						/>
					) }

					{ cardTitle && (
						<RichText.Content
							tagName="p"
							className="lsx-card-title"
							style={ {
								color: cardTextColor,
								fontSize: 'calc(' + cardFontSize + 'px - 2px)',
							} }
							value={ cardTitle }
						/>
					) }

					{ cardContent && (
						<RichText.Content
							tagName="div"
							className={ classnames(
								'lsx-card-text',
							) }
							style={ {
								fontSize: cardFontSize + 'px',
							} }
							value={ cardContent }
						/>
					) }


				</div>
				<CustomButton { ...props }>
					{	// Check if there is button text and output
						buttonText && (
							<a
								href={ buttonUrl }
								target={ buttonTarget ? '_blank' : '_self' }
								className={ classnames(
									'lsx-button',
									buttonShape,
									buttonSize,
									buttonFlat,
									buttonGhost,
								) }
								style={ {
									color: buttonTextColor,
									backgroundColor: buttonBackgroundColor,
									boxShadow: '2px 2px 0 0 ' + buttonShadowColor,
									borderColor: buttonBackgroundColor,
								} }
								data-onhover={ buttonHoverColor }
								data-offhover={ buttonBackgroundColor }
								onMouseEnter="this.style.backgroundColor=this.getAttribute('data-onhover');"
								onMouseLeave="this.style.backgroundColor=this.getAttribute('data-offhover');"
							>
								<RichText.Content
									value={ buttonText }
								/>
							</a>
						) }
				</CustomButton>
			</CardBox>
		);
	},
} );
