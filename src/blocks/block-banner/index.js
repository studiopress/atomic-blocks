/**
 * BLOCK: LSX Blocks Banner (Hero Image) Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import BannerBox from './components/banner';
import CustomButton from './components/button';
import ImageColumn from './components/image';
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
	bannerName: {
		type: 'array',
		source: 'children',
		selector: '.lsx-banner-name',
	},
	bannerTitle: {
		type: 'array',
		source: 'children',
		selector: '.lsx-banner-title',
	},
	bannerContent: {
		type: 'array',
		selector: '.lsx-banner-text',
		source: 'children',
	},
	bannerAlignment: {
		type: 'string',
	},
	bannerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	bannerImgID: {
		type: 'number',
	},
	bannerBackgroundColor: {
		type: 'string',
		default: '#f2f2f2',
	},
	bannerTextColor: {
		type: 'string',
		default: '#32373c',
	},
	bannerLinkColor: {
		type: 'string',
		default: '#392f43',
	},
	bannerFontSize: {
		type: 'number',
		default: 18,
	},
	bannerTitlePosition: {
		type: 'string',
		default: 'title-centered',
	},
	twitter: {
		type: 'url',
	},
	facebook: {
		type: 'url',
	},
	instagram: {
		type: 'url',
	},
	pinterest: {
		type: 'url',
	},
	google: {
		type: 'url',
	},
	youtube: {
		type: 'url',
	},
	github: {
		type: 'url',
	},
	email: {
		type: 'url',
	},
	website: {
		type: 'url',
	},
};

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class LSXAuthorBannerBlock extends Component {
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
				bannerName,
				bannerTitle,
				bannerContent,
				bannerAlignment,
				bannerImgURL,
				bannerImgID,
				bannerFontSize,
				bannerBackgroundColor,
				bannerTextColor,
				bannerLinkColor,
				twitter,
				facebook,
				instagram,
				pinterest,
				google,
				youtube,
				github,
				email,
				website,
				bannerTitlePosition
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				bannerImgID: img.id,
				bannerImgURL: img.url,
			} );
		};

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ bannerAlignment }
					onChange={ ( value ) => setAttributes( { bannerAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<BannerBox key="banner" { ...this.props }>
				<ImageColumn { ...this.props }>
					<div class="lsx-banner-image-square">
						<MediaUpload
							buttonProps={ {
								className: 'change-image'
							} }
							onSelect={ ( img ) => setAttributes(
								{
									bannerImgID: img.id,
									bannerImgURL: img.url,
								}
							) }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="image"
							value={ bannerImgID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! bannerImgID ? icons.upload : <img
										class="banner-image"
										src={ bannerImgURL }
										alt="banner"
									/>  }
								</Button>
							) }
						>
						</MediaUpload>
					</div>
				</ImageColumn>

				<div
					className={ classnames(
						'lsx-banner-content-wrap'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add Banner Title', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ bannerName }
						className='lsx-banner-name'
						style={ {
							color: bannerTextColor
						} }
						onChange={ ( value ) => setAttributes( { bannerName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add Banner Subtitle', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ bannerTitle }
						className='lsx-banner-title'
						style={ {
							color: bannerTextColor
						} }
						onChange={ ( value ) => setAttributes( { bannerTitle: value } ) }
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
			</BannerBox>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-banner-box', {
	title: __( 'LSX Banner (Hero Image)', 'lsx-blocks' ),
	description: __( 'Add a banner with content and media.', 'lsx-blocks' ),
	icon: 'format-image',
	category: 'lsx-blocks',
	keywords: [
		__( 'banner', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	// Setup the block attributes
	attributes: blockAttributes,

	// Render the block components
	edit: LSXAuthorBannerBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { bannerName, bannerTitle, bannerContent, bannerAlignment, bannerImgURL, bannerImgID, bannerFontSize, bannerBackgroundColor, bannerTextColor, bannerLinkColor, bannerTitlePosition, buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonFlat, buttonShape, buttonGhost, buttonTarget } = props.attributes;

		return (
			// Save the block markup for the front end
			<BannerBox { ...props }>
				<ImageColumn { ...props }>
					{ bannerImgURL && (
						<picture className="lazyimage lazyloaded">
							<source data-srcset={ bannerImgURL } media="(min-width: 100rem)" srcSet={ bannerImgURL } />
							<source data-srcset={ bannerImgURL } media="(min-width: 61.25rem)" srcSet={ bannerImgURL } />
							<source data-srcset={ bannerImgURL } media="(min-width: 30rem)" srcSet={ bannerImgURL } />
							<img alt={ bannerTitle } title={ bannerName } className="lazyimage lazyloaded" data-src={ bannerImgURL } src={ bannerImgURL } />
						</picture>
					) }
				</ImageColumn>

				<div
					className={ classnames(
						'lsx-banner-content-wrap'
					) }
				>
					<div
						className={ classnames(
							'header-headings'
						) }
					>
						<header className={ classnames(
							'page-header'
						) }>
							{ bannerName && (
								<RichText.Content
									tagName="h2"
									className="lsx-banner-name"
									style={ {
										color: bannerTextColor,
									} }
									value={ bannerName }
								/>
							) }
						</header>
						{ bannerTitle && (
							<RichText.Content
								tagName="p"
								className="lsx-banner-title"
								style={ {
									color: bannerTextColor,
								} }
								value={ bannerTitle }
							/>
						) }
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
					</div>
				</div>
			</BannerBox>
		);
	},
} );
