/**
 * BLOCK: LSX Blocks Card Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CardBox from './components/card';
import SocialIcons from './components/social';
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
} = wp.editor;

// Register Inspector components
const {
	Button,
} = wp.components;

const blockAttributes = {
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
		default: '#f2f2f2'
	},
	cardTextColor: {
		type: 'string',
		default: '#32373c'
	},
	cardLinkColor: {
		type: 'string',
		default: '#392f43'
	},
	cardFontSize: {
		type: 'number',
		default: 18
	},
	cardAvatarShape: {
		type: 'string',
		default: 'square',
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

class LSXAuthorCardBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
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
				twitter,
				facebook,
				instagram,
				pinterest,
				google,
				youtube,
				github,
				email,
				website,
				cardAvatarShape
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
					<div class="lsx-card-image-square">
						<MediaUpload
							buttonProps={ {
								className: 'change-image'
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
										class="card-avatar"
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
						className='lsx-card-name'
						style={ {
							color: cardTextColor
						} }
						onChange={ ( value ) => setAttributes( { cardName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add title', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ cardTitle }
						className='lsx-card-title'
						style={ {
							color: cardTextColor
						} }
						onChange={ ( value ) => setAttributes( { cardTitle: value } ) }
					/>

					<RichText
						tagName="div"
						className='lsx-card-text'
						multiline="p"
						placeholder={ __( 'Add content...', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ cardContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => setAttributes( { cardContent: value } ) }
					/>

					<SocialIcons { ...this.props } />
				</div>
			</CardBox>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-card-box', {
	title: __( 'LSX Card Box', 'lsx-blocks' ),
	description: __( 'Add a card box with content and media.', 'lsx-blocks' ),
	icon: 'admin-users',
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
		const { cardName, cardTitle, cardContent, cardAlignment, cardImgURL, cardImgID, cardFontSize, cardBackgroundColor, cardTextColor, cardLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, cardAvatarShape } = props.attributes;

		return (
			// Save the block markup for the front end
			<CardBox { ...props }>

				{ cardImgURL && (
					<AvatarColumn { ...props }>
						<div class="lsx-card-image-square">
							<img
								class="lsx-card-avatar"
								src={ cardImgURL }
								alt="avatar"
							/>
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
								color: cardTextColor
							} }
							value={ cardName }
						/>
					) }

					{ cardTitle && (
						<RichText.Content
							tagName="p"
							className="lsx-card-title"
							style={ {
								color: cardTextColor
							} }
							value={ cardTitle }
						/>
					) }

					{ cardContent && (
						<RichText.Content
							tagName="div"
							className="lsx-card-text"
							value={ cardContent }
						/>
					) }

					<SocialIcons { ...props } />
				</div>
			</CardBox>
		);
	},
} );
