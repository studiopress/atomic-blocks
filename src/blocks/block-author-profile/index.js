/**
 * BLOCK: LSX Blocks Profile Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import ProfileBox from './components/profile';
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
	profileName: {
		type: 'array',
		source: 'children',
		selector: '.lsx-profile-name',
	},
	profileTitle: {
		type: 'array',
		source: 'children',
		selector: '.lsx-profile-title',
	},
	profileContent: {
		type: 'array',
		selector: '.lsx-profile-text',
		source: 'children',
	},
	profileAlignment: {
		type: 'string',
	},
	profileImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	profileImgID: {
		type: 'number',
	},
	profileBackgroundColor: {
		type: 'string',
		default: '#f2f2f2'
	},
	profileTextColor: {
		type: 'string',
		default: '#32373c'
	},
	profileLinkColor: {
		type: 'string',
		default: '#392f43'
	},
	profileFontSize: {
		type: 'number',
		default: 18
	},
	profileAvatarShape: {
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

class LSXAuthorProfileBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				profileName,
				profileTitle,
				profileContent,
				profileAlignment,
				profileImgURL,
				profileImgID,
				profileFontSize,
				profileBackgroundColor,
				profileTextColor,
				profileLinkColor,
				twitter,
				facebook,
				instagram,
				pinterest,
				google,
				youtube,
				github,
				email,
				website,
				profileAvatarShape
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				profileImgID: img.id,
				profileImgURL: img.url,
			} );
		};

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ profileAlignment }
					onChange={ ( value ) => setAttributes( { profileAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<ProfileBox key="profile" { ...this.props }>
				<AvatarColumn { ...this.props }>
					<div className="lsx-profile-image-square">
						<MediaUpload
							buttonProps={ {
								className: 'change-image'
							} }
							onSelect={ ( img ) => setAttributes(
								{
									profileImgID: img.id,
									profileImgURL: img.url,
								}
							) }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="image"
							value={ profileImgID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! profileImgID ? icons.upload : <img
										className="profile-avatar"
										src={ profileImgURL }
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
						'lsx-profile-column lsx-profile-content-wrap'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add name', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileName }
						className='lsx-profile-name'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes( { profileName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add title', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileTitle }
						className='lsx-profile-title'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes( { profileTitle: value } ) }
					/>

					<RichText
						tagName="div"
						className='lsx-profile-text'
						multiline="p"
						placeholder={ __( 'Add profile text...', 'lsx-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => setAttributes( { profileContent: value } ) }
					/>

					<SocialIcons { ...this.props } />
				</div>
			</ProfileBox>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-profile-box', {
	title: __( 'LSX Author Profile Box', 'lsx-blocks' ),
	description: __( 'Add a profile box with bio info and social media links.', 'lsx-blocks' ),
	icon: 'admin-users',
	category: 'lsx-blocks',
	keywords: [
		__( 'author', 'lsx-blocks' ),
		__( 'profile', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	// Setup the block attributes
	attributes: blockAttributes,

	// Render the block components
	edit: LSXAuthorProfileBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape } = props.attributes;

		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>

				{ profileImgURL && (
					<AvatarColumn { ...props }>
						<div className="lsx-profile-image-square">
							<img
								className="lsx-profile-avatar"
								src={ profileImgURL }
								alt="avatar"
							/>
						</div>
					</AvatarColumn>
				) }

				<div
					className={ classnames(
						'lsx-profile-column lsx-profile-content-wrap'
					) }
				>
					{ profileName && (
						<RichText.Content
							tagName="h2"
							className="lsx-profile-name"
							style={ {
								color: profileTextColor
							} }
							value={ profileName }
						/>
					) }

					{ profileTitle && (
						<RichText.Content
							tagName="p"
							className="lsx-profile-title"
							style={ {
								color: profileTextColor
							} }
							value={ profileTitle }
						/>
					) }

					{ profileContent && (
						<RichText.Content
							tagName="div"
							className="lsx-profile-text"
							value={ profileContent }
						/>
					) }

					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		);
	},
} );
