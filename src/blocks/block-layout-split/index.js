/**
 * BLOCK: Atomic Blocks Profile Box
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import ProfileBox from './components/profile';
import SocialIcons from './components/social';
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
	MediaPlaceholder,
	InnerBlocks,
} = wp.editor;

// Register Inspector components
const {
	Button,
	Toolbar,
	IconButton,
} = wp.components;

const blockAttributes = {
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
		default: 'top',
	},
	layoutToggle: {
		type: 'boolean',
		defaut: true,
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

class ABLayoutSplit extends Component {
	
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
				profileAvatarShape,
				layoutToggle
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

		const onRemoveImage = () => {
			setAttributes({
				profileImgID: null,
				profileImgURL: null,
			});
		}

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ profileImgID }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit image' ) }
								icon="format-image"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>

				{ profileImgURL && (
				<Toolbar>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Remove image' ) }
						icon="no"
						onClick={ onRemoveImage }
					/>
				</Toolbar>
				) }
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<ProfileBox { ...this.props }>
				<div class="ab-layout-split-column ab-layout-split-image">
					{ profileImgID && <img
						class="profile-avatar"
						src={ profileImgURL }
						alt="avatar"
					/>  }
					{ ! profileImgURL && (
						<MediaPlaceholder
							className={ classnames(
								'ab-layout-split-media'
							) }
							labels={ {
								title: __( 'test' ),
								name: __( 'an image' ),
							} }
							onSelect={ onSelectImage }
							accept="image/*"
							type="image"
						/>
					) }
				</div>

				<div
					className={ classnames(
						'ab-layout-split-column ab-layout-split-content'
					) }
				>
					<InnerBlocks />
				</div>
			</ProfileBox>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-layout-split', {
	title: __( 'AB Layout - Split' ),
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
	edit: ABLayoutSplit,

	// Save the block markup
	save: function( props ) {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape, layoutToggle } = props.attributes;

		return (
			// Save the block markup for the front end
			<ProfileBox { ...props }>

				{ profileImgURL && !! profileImgURL.length && (
					<div class="ab-layout-split-column ab-layout-split-image">
						<img
							class="ab-profile-avatar"
							src={ profileImgURL }
							alt="avatar"
						/>
					</div>
				) }

				<div
					className={ classnames(
						'ab-layout-split-column ab-layout-split-content'
					) }
				>
					<InnerBlocks.Content />
				</div>
			</ProfileBox>
		);
	},
} );
