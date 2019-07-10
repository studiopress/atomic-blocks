/**
 * BLOCK: Atomic Blocks Profile Box
 */

/**
 * Internal dependencies
 */
import Edit from './components/edit';
import Save from './components/save';
import './styles/style.scss';
import './styles/editor.scss';
import Deprecated from './deprecated/deprecated';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	profileName: {
		type: 'array',
		source: 'children',
		selector: '.ab-profile-name'
	},
	profileTitle: {
		type: 'array',
		source: 'children',
		selector: '.ab-profile-title'
	},
	profileContent: {
		type: 'array',
		selector: '.ab-profile-text',
		source: 'children'
	},
	profileAlignment: {
		type: 'string'
	},
	profileImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img'
	},
	profileImgAlt: {
		type: 'string',
		source: 'attribute',
		selector: 'figure img',
		attribute: 'alt',
		default: ''
	},
	profileImgID: {
		type: 'number'
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
		default: 'square'
	},
	twitter: {
		type: 'url'
	},
	facebook: {
		type: 'url'
	},
	instagram: {
		type: 'url'
	},
	pinterest: {
		type: 'url'
	},
	google: {
		type: 'url'
	},
	youtube: {
		type: 'url'
	},
	github: {
		type: 'url'
	},
	linkedin: {
		type: 'url'
	},
	email: {
		type: 'url'
	},
	website: {
		type: 'url'
	}
};

/**
 * Register the block
 */
registerBlockType( 'atomic-blocks/ab-profile-box', {
	title: __( 'AB Profile Box', 'atomic-blocks' ),
	description: __( 'Add a profile box with bio info and social media links.', 'atomic-blocks' ),
	icon: 'admin-users',
	category: 'atomic-blocks',
	keywords: [
		__( 'author', 'atomic-blocks' ),
		__( 'profile', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],

	/* Setup the block attributes */
	attributes: blockAttributes,

	/* Render the block in the editor. */
	edit: props => {
		return <Edit { ...props } />;
	},

	/* Save the block markup. */
	save: props => {
		return <Save { ...props } />;
	},

	deprecated: Deprecated
});
