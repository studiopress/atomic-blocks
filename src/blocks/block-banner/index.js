/**
 * BLOCK: LSX Blocks Banner (Hero Image) Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import Inspector from './components/inspector';
import BannerBox from './components/banner';
import CustomButton from './components/button';
import ImageColumn from './components/image';
import LogoColumn from './components/logo';
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

//API FETCH
const { apiFetch } = wp;

// Register components
const {
	RichText,
	AlignmentToolbar,
	BlockAlignmentToolbar,
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
		default: '#ffffff',
	},
	buttonUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
	},
	buttonAlignment: {
		type: 'string',
		default: 'center',
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
		default: 'center',
	},
	bannerWidth: {
		type: 'string',
		default: 'full',
	},
	bannerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img.lazyload',
	},
	bannerLogoURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img.lsx-banner-logo-img',
	},
	bannerImgID: {
		type: 'number',
	},
	bannerLogoID: {
		type: 'number',
	},
	bgPosition: {
		type: 'string',
		default: 'lsx-container-initial',
	},
	bannerBackgroundColor: {
		type: 'string',
		default: '#ffffff',
	},
	textBannerBackgroundColor: {
		type: 'string',
		default: '#ffffff',
	},
	bannerFontOpacity: {
		type: 'number',
		default: 0,
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
		default: 40,
	},
	bannerHeight: {
		type: 'number',
		default: 40,
	},
	bannerTitlePosition: {
		type: 'string',
		default: 'title-centered',
	},
};

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class LSXBannerBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonTextColor,
				buttonBackgroundColor,
				buttonShadowColor,
				buttonAlignment,
				bannerWidth,
				buttonUrl,
				buttonShape,
				buttonSize,
				buttonFlat,
				buttonGhost,
				bannerName,
				bannerTitle,
				bannerContent,
				bannerAlignment,
				bannerLogoID,
				bannerLogoURL,
				bannerImgURL,
				bannerImgID,
				bgPosition,
				bannerFontSize,
				bannerBackgroundColor,
				bannerHeight,
				textBannerBackgroundColor,
				bannerFontOpacity,
				bannerTextColor,
				bannerLinkColor,
				bannerTitlePosition
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		// Upload Image options
		const onSelectLogo = logo => {
			console.log( logo );
			setAttributes( {
				bannerLogoID: logo.id,
				bannerLogoURL: logo.url,
				bannerLogoAlt: logo.alt,
			} );
		};

		const onRemoveLogo = () => {
			setAttributes( {
				bannerLogoID: null,
				bannerLogoURL: null,
				bannerLogoAlt: null,
			} );
		};

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ bannerAlignment }
					onChange={ ( value ) => setAttributes( { bannerAlignment: value } ) }
				/>
				<BlockAlignmentToolbar
					value={ bannerWidth }
					//onChange={ bannerWidth => setAttributes( { bannerWidth } ) }
					controls={ [ 'full' ] }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<BannerBox key="banner" { ...this.props }>
				<ImageColumn { ...this.props }>
					{ bannerImgURL && (
						<picture className="lazyload">
							<source data-srcset={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=2048:*' } media="(min-width: 100rem)" srcSet={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=2048:*' } />
							<source data-srcset={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=1200:*' } media="(min-width: 61.25rem)" srcSet={ bannerImgURL  + '?crop=1.00xw:0.887xh;0,0.108xh&resize=1200:*'} />
							<source data-srcset={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=768:*' } media="(min-width: 30rem)" srcSet={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=768:*' } />
							<img title={ bannerName } className="lazyload" data-src={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=640:*' } src={ bannerImgURL } alt={ bannerTitle } />
						</picture>
					) }
				</ImageColumn>

				<div
					className={ classnames(
						'lsx-banner-content-wrap'
					) }
					style={ {
						backgroundColor: hexToRgba( textBannerBackgroundColor, bannerFontOpacity ),
					} }
				>

					<div className="lsx-banner-logo">
						<MediaUpload
							buttonProps={ {
								className: 'change-logo',
							} }
							onSelect={ onSelectLogo }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="logo"
							value={ bannerLogoID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! bannerLogoID ? icons.upload : <img
										className="banner-logo"
										src={ bannerLogoURL }
										alt="logo"
									/> }
								</Button>
							) }
						>
						</MediaUpload>
					</div>

					<RichText
						tagName="h2"
						placeholder={ __( 'Add Banner Title', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ bannerName }
						className="lsx-banner-name"
						style={ {
							color: bannerTextColor,
							fontSize: bannerFontSize,
						} }
						onChange={ ( value ) => setAttributes( { bannerName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add Banner Subtitle', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ bannerTitle }
						className="lsx-banner-title"
						style={ {
							color: bannerTextColor,
							fontSize: 'calc(' + bannerFontSize + 'px /2)',
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
			</BannerBox>,

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

	getEditWrapperProps( { bannerWidth } ) {
		return { 'data-align': bannerWidth };
	},

	// Render the block components
	edit: LSXBannerBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { bannerName, bannerTitle, bannerContent, bannerAlignment, bannerImgURL, bannerImgID, bannerLogoID, bannerLogoURL, bannerFontSize, bannerBackgroundColor, bannerTextColor, textBannerBackgroundColor, bannerHeight, bannerFontOpacity, bannerLinkColor, bannerTitlePosition, buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonFlat, buttonShape, buttonGhost, buttonTarget } = props.attributes;

		return (
			// Save the block markup for the front end
			<BannerBox { ...props }>
				<ImageColumn { ...props }>
					{ bannerImgURL && (
						<picture className="lazyload">
							<source data-srcset={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=2048:*' } media="(min-width: 100rem)" srcSet={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=2048:*' } />
							<source data-srcset={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=1200:*' } media="(min-width: 61.25rem)" srcSet={ bannerImgURL + '?crop=1.00xw:0.887xh;0,0.108xh&resize=1200:*' } />
							<source data-srcset={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=768:*' } media="(min-width: 30rem)" srcSet={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=768:*' } />
							<img title={ bannerName } className="lazyload" data-src={ bannerImgURL + '?crop=0.851xw:1.00xh;0.0753xw,0&resize=640:*' } src={ bannerImgURL } alt={ bannerTitle } />
						</picture>
					) }
				</ImageColumn>
				<div
					className={ classnames(
						'lsx-banner-content-wrap',
					) }
				>
					<div
						className={ classnames(
							'header-headings',
							bannerAlignment,
						) }
						style={ {
							backgroundColor: hexToRgba( textBannerBackgroundColor, bannerFontOpacity ),
						} }
					>
						<div className="lsx-banner-logo">
							{ undefined !== bannerLogoURL && (

								<img
									className="lsx-banner-logo-img"
									src={ bannerLogoURL }
									alt="logo"
								/>

							) }
						</div>
						<header className={ classnames(
							'page-header'
						) }>
							{ bannerName && (
								<RichText.Content
									tagName="h2"
									className="lsx-banner-name"
									style={ {
										color: bannerTextColor,
										fontSize: bannerFontSize,
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
									fontSize: 'calc(' + bannerFontSize + 'px /2)',
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
										rel="noopener noreferrer"
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
