/**
 * Component deprecations.
 */

/**
 * Version 1.8.1.
 */
import Save_1_8_1 from './1.8.1/components/save';

export const Author_Profile_1_8_1_attributes = {
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

export const Author_Profile_1_8_1_save = props => {
	return (
		<Save_1_8_1 { ...props } />
	);
};

const Deprecated = [

	/* Version 1.8.1. */
	{
		attributes: Author_Profile_1_8_1_attributes,
		save: Author_Profile_1_8_1_save
	}
];

export default Deprecated;
