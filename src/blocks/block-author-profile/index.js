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
		const { isSelected, className, setAttributes, fontSize } = this.props;
		const { profileName, profileTitle, content, alignment, imgURL, imgID, imgAlt, blockFontSize, blockBackgroundColor, blockTextColor, blockLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, avatarShape } = this.props.attributes;

		// Populate the image when selected
		const onSelectImage = img => {
			this.props.setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		// Set the font ratio
		const setFontRatio = ( ratio ) => this.props.setAttributes( { blockFontSize: ratio } );

		// Avatar shape options
		const avatarShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round', label: __( 'Round' ) },
		];

		// Build the avatar upload button
		const MediaUploadAvatar = ( props ) => (
			<div class="ab-profile-image-square">
				<MediaUpload
					buttonProps={ {
						className: 'change-image'
					} }
					onSelect={ onSelectImage }
					type="image"
					value={ imgID }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ icons.upload }
						</Button>
					) }
				>
				</MediaUpload>

				{ this.props.children }
			</div>
		);

		return [
			// Show the block alignment controls on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( value ) => this.props.setAttributes( { alignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...{ setFontRatio, avatarShapeOptions, ...this.props} }
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
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! imgID ? icons.upload : <img
										class="profile-avatar"
										src={ imgURL }
										alt={ imgAlt }
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
						className='ab-profile-name'
						style={ {
							color: blockTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { profileName: value } ) }
					/>
					
					<RichText
						tagName="p"
						placeholder={ __( 'Add title' ) }
						value={ profileTitle }
						className='ab-profile-title'
						style={ {
							color: blockTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { profileTitle: value } ) }
					/>

					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Add profile text...' ) }
						isSelected={ isSelected }
						keepPlaceholderOnFocus
						value={ content }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						className='ab-profile-text'
						onChange={ ( value ) => this.props.setAttributes( { content: value } ) }
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
		content: {
			type: 'array',
			selector: '.ab-profile-text',
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
		blockFontSize: {
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

	// Render the block components
	edit: ABProfileBlock,

	// Save the attributes and markup
	save: function( props ) {

		const { profileName, profileTitle, content, alignment, imgURL, imgID, imgAlt, blockFontSize, blockBackgroundColor, blockTextColor, blockLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, avatarShape } = props.attributes;

		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>
				  
				{ imgURL && (
					<AvatarColumn { ...props }>
						<div class="ab-profile-image-square">
							<img
								class="profile-avatar"
								src={ imgURL }
								alt={ imgAlt }
							/>
						</div>
					</AvatarColumn>
				) }

				<div 
					className={ classnames(
						'ab-profile-column ab-profile-content-wrap'
					) }
				>
					{ profileName && (
						<h2 
							className='ab-profile-name'
							style={ {
								color: blockTextColor
							} }
						>{ profileName }</h2>
					) }
					
					{ profileTitle && (
						<p 
							className='ab-profile-title'
							style={ {
								color: blockTextColor
							} }
						>{ profileTitle }</p>
					) }

					{ content && (
						<div className='ab-profile-text'>
							{ content }
						</div>
					) }
					
					<SocialIcons { ...props } />
				</div>
			</ProfileBox>
		);
	},
} );