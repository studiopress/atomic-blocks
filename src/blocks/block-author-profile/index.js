/**
 * BLOCK: Atomic Blocks Author Profile
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import ProfileBox from './components/profile';
import SocialIcons from './components/social';
import AvatarColumn from './components/avatar';
import icons from './components/icons';
import * as fontSize from './../../utils/helper';

// Import styles
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n; 

// Register components
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
	SelectControl,
} = wp.blocks;

// Register Inspector components
const {
	Button,
} = wp.components;

// Register the block
registerBlockType( 'atomic/atomic-profile-box', {
	title: __( 'Profile Box' ),
	description: __( 'Add a user profile box with bio text and social media links.' ),
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
			selector: '.profile-name',
		},
		profileTitle: {
			type: 'string',
			selector: '.profile-title',
		},
		content: {
			type: 'array',
			selector: '.profile-text',
			source: 'children',
		},
		alignment: {
			type: 'string',
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
		blockBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		blockTextColor: {
			type: 'string',
			default: '#32373c'
		},
		blockLinkColor: {
			type: 'string',
			default: '#392f43'
		},
		fontSize: {
			type: 'number',
			default: 18
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
		avatarShape: {
            type: 'string',
            default: 'square',
        },
	},

	edit: function( props ) {
		// Populate the image when selected
		const onSelectImage = img => {
			props.setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		// Change the background image opacity 
		const setFontRatio = ( ratio ) => props.setAttributes( { fontSize: ratio } );

		// Font size class
		const fontSizeClass = classnames(
			fontSize.fontRatioToClass( props.attributes.fontSize ),
		);

		// Avatar shape options
		const avatarShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round', label: __( 'Round' ) },
		];

		// Change message dismiss value
		const onChangeAvatarShape = value => {
			props.setAttributes( { avatarShape: value } );
		};

		// Build the avatar upload button
		const MediaUploadAvatar = ( props ) => (
			<div class="profile-image-square">
				<MediaUpload
					buttonProps={ {
						className: 'change-image'
					} }
					onSelect={ onSelectImage }
					type="image"
					value={ props.attributes.imgID }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ icons.upload }
						</Button>
					) }
				>
				</MediaUpload>

				{ props.children }
			</div>
		);

		return [
			// Show the block alignment controls on focus
			!! props.focus && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ props.attributes.alignment }
						onChange={ ( value ) => props.setAttributes( { alignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			!! props.focus && (
				<Inspector
					{ ...{ setFontRatio, avatarShapeOptions, onChangeAvatarShape, ...props} }
				/>
			),
			// Show the block markup in the editor
			<ProfileBox { ...props }>
				<AvatarColumn { ...props }>
					{ 	// Output the image or the image upload button
						! props.attributes.imgID ? ( [
							<MediaUploadAvatar { ...props } /> 
						] ) : ( [
							<MediaUploadAvatar { ...props }> 
								<img
									class="profile-avatar"
									src={ props.attributes.imgURL }
									alt={ props.attributes.imgAlt }
								/>
							</MediaUploadAvatar> 
						] )
					}
				</AvatarColumn>				

				<div 
					className={ classnames(
						fontSizeClass,
						'column profile-info'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add name' ) }
						value={ props.attributes.profileName }
						className='profile-name'
						style={ {
							color: props.attributes.blockTextColor
						} }
						onChange={ ( value ) => props.setAttributes( { profileName: value } ) }
					/>
					
					<RichText
						tagName="p"
						placeholder={ __( 'Add title' ) }
						value={ props.attributes.profileTitle }
						className='profile-title'
						style={ {
							color: props.attributes.blockTextColor
						} }
						onChange={ ( value ) => props.setAttributes( { profileTitle: value } ) }
					/>

					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Add profile text...' ) }
						value={ props.attributes.content }
						className='profile-text'
						onChange={ ( value ) => props.setAttributes( { content: value } ) }
					/>

					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		];
	},

	// Save the attributes and markup
	save: function( props ) {
		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>
				  
				{ props.attributes.imgURL && (
					<AvatarColumn { ...props }>
						<div class="profile-image-square">
							<img
								class="profile-avatar"
								src={ props.attributes.imgURL }
								alt={ props.attributes.imgAlt }
							/>
						</div>
					</AvatarColumn>
				) }

				<div 
					className={ classnames(
						fontSize.fontRatioToClass( props.attributes.fontSize ),
						'column profile-info'
					) }
				>
					{ props.attributes.profileName && (
						<h2 
							className='profile-name'
							style={ {
								color: props.attributes.blockTextColor
							} }
						>{ props.attributes.profileName }</h2>
					) }
					
					{ props.attributes.profileTitle && (
						<p 
							className='profile-title'
							style={ {
								color: props.attributes.blockTextColor
							} }
						>{ props.attributes.profileTitle }</p>
					) }

					{ props.attributes.content && (
						<div className='profile-text'>
							{ props.attributes.content }
						</div>
					) }
					
					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		);
	},
} );