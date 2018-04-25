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

// Register components
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
} = wp.blocks;

// Register Inspector components
const {
	Button,
} = wp.components;

class ABProfileBlock extends Component {
	
	render() {
		
		// Setup constants and attributes
		const { attributes: { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape }, isSelected, className, setAttributes  } = this.props;

		return [
			// Show the block alignment controls on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ profileAlignment }
						onChange={ ( value ) => this.props.setAttributes( { profileAlignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the block markup in the editor
			<ProfileBox { ...this.props }>
				<AvatarColumn { ...this.props }>
					<div class="ab-profile-image-square">
						<MediaUpload
							buttonProps={ {
								className: 'change-image'
							} }
							onSelect={ ( img ) => this.props.setAttributes( 
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
						value={ profileName }
						keepPlaceholderOnFocus
						formattingControls={ [] }
						className='ab-profile-name'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { profileName: value } ) }
					/>
					
					<RichText
						tagName="p"
						placeholder={ __( 'Add title' ) }
						value={ profileTitle }
						keepPlaceholderOnFocus
						formattingControls={ [] }
						className='ab-profile-title'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { profileTitle: value } ) }
					/>

					<RichText
						tagName="div"
						className='ab-profile-text'
						multiline="p"
						placeholder={ __( 'Add profile text...' ) }
						isSelected={ isSelected }
						keepPlaceholderOnFocus
						value={ profileContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => this.props.setAttributes( { profileContent: value } ) }
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
	category: 'common',
	keywords: [
		__( 'author' ),
		__( 'profile' ),
		__( 'atomic' ),
	],
	// Setup the block attributes
	attributes: {
		profileName: {
			type: 'string',
			selector: '.ab-profile-name',
		},
		profileTitle: {
			type: 'string',
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
	},

	// Render the block components
	edit: ABProfileBlock,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape } = props.attributes;

		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>
				  
				{ profileImgURL && (
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
					<h2 
						className='ab-profile-name'
						style={ {
							color: profileTextColor
						} }
					>{ profileName }</h2>
					
					<p 
						className='ab-profile-title'
						style={ {
							color: profileTextColor
						} }
					>{ profileTitle }</p>

					<div className='ab-profile-text'>
						{ profileContent }
					</div>
					
					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		);
	},
} );