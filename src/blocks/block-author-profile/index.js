/**
 * BLOCK: Atomic Blocks Profile Box
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
		selector: '.ab-profile-name',
	},
	profileTitle: {
		type: 'array',
		source: 'children',
		selector: '.ab-profile-title',
	},
	profileContent: {
		type: 'array',
		selector: '.ab-profile-text',
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

class ABAuthorProfileBlock extends Component {
	
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
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<ProfileBox { ...this.props }>
				<AvatarColumn { ...this.props }>
					<div class="ab-profile-image-square">
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
							type="image"
							value={ profileImgID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! profileImgID ? icons.upload : <img
										class="profile-avatar"
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
						'ab-profile-column ab-profile-content-wrap'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add name' ) }
						keepPlaceholderOnFocus
						value={ profileName }
						className='ab-profile-name'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes( { profileName: value } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add title' ) }
						keepPlaceholderOnFocus
						value={ profileTitle }
						className='ab-profile-title'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes( { profileTitle: value } ) }
					/>

					<RichText
						tagName="div"
						className='ab-profile-text'
						multiline="p"
						placeholder={ __( 'Add profile text...' ) }
						keepPlaceholderOnFocus
						value={ profileContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => setAttributes( { profileContent: value } ) }
						inlineToolbar
					/>

					<SocialIcons { ...this.props } />
				</div>
			</ProfileBox>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-profile-box', {
	title: __( 'AB Profile Box' ),
	description: __( 'Add a profile box with bio info and social media links.' ),
	icon: 'admin-users',
	category: 'atomic-blocks',
	keywords: [
		__( 'author' ),
		__( 'profile' ),
		__( 'atomic' ),
	],
	// Setup the block attributes
	attributes: blockAttributes,

	// Render the block components
	edit: ABAuthorProfileBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape } = props.attributes;

		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>

				{ profileImgURL && !! profileImgURL.length && (
					<AvatarColumn { ...props }>
						<div class="ab-profile-image-square">
							<img
								class="ab-profile-avatar"
								src={ profileImgURL }
								alt="avatar"
							/>
						</div>
					</AvatarColumn>
				) }

				<div
					className={ classnames(
						'ab-profile-column ab-profile-content-wrap'
					) }
				>
					{ profileName && !! profileName.length && (
						<RichText.Content 
							tagName="h2" 
							className="ab-profile-name"
							style={ {
								color: profileTextColor
							} }
							value={ profileName }
						/>
					) }
					
					{ profileTitle && !! profileTitle.length && (
						<RichText.Content 
							tagName="p" 
							className="ab-profile-title"
							style={ {
								color: profileTextColor
							} }
							value={ profileTitle }
						/>
					) }

					{ profileContent && !! profileContent.length && (
						<RichText.Content 
							tagName="div" 
							className="ab-profile-text"
							value={ profileContent }
						/>
					) }

					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		);
	},
} );
