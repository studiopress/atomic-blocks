/**
 * BLOCK: Atomic Blocks Post and Page Grid
 */

// Import block dependencies and components
import edit from './components/edit';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Register block controls
const { registerBlockType } = wp.blocks;

// Register alignments
const validAlignments = [ 'center', 'wide', 'full' ];

// Register the block
registerBlockType( 'atomic-blocks/ab-post-grid', {
	title: __( 'Post and Page Grid', 'atomic-blocks' ),
	description: __(
		'Add a grid or list of customizable posts or pages.',
		'atomic-blocks'
	),
	icon: 'grid-view',
	category: 'atomic-blocks',
	keywords: [
		__( 'post', 'atomic-blocks' ),
		__( 'page', 'atomic-blocks' ),
		__( 'grid', 'atomic-blocks' ),
	],

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},

	edit,

	ab_settings_data: {
		ab_postgrid_postType: {
			title: __( 'Content Type', 'atomic-blocks' ),
		},
		ab_postgrid_queryControls: {
			title: __( 'Query Controls', 'atomic-blocks' ),
		},
		ab_postgrid_offset: {
			title: __( 'Post Offset', 'atomic-blocks' ),
		},
		ab_postgrid_columns: {
			title: __( 'Columns', 'atomic-blocks' ),
		},
		ab_postgrid_displaySectionTitle: {
			title: __( 'Display Section Title', 'atomic-blocks' ),
		},
		ab_postgrid_sectionTitle: {
			title: __( 'Section Title', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostImage: {
			title: __( 'Display Featured Image', 'atomic-blocks' ),
		},
		ab_postgrid_imageSizeValue: {
			title: __( 'Image Size', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostTitle: {
			title: __( 'Display Post Title', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostAuthor: {
			title: __( 'Display Post Author', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostDate: {
			title: __( 'Display Post Date', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostExcerpt: {
			title: __( 'Display Post Excerpt', 'atomic-blocks' ),
		},
		ab_postgrid_excerptLength: {
			title: __( 'Excerpt Length', 'atomic-blocks' ),
		},
		ab_postgrid_displayPostLink: {
			title: __( 'Display Continue Reading Link', 'atomic-blocks' ),
		},
		ab_postgrid_readMoreText: {
			title: __( 'Read More Text', 'atomic-blocks' ),
		},
		ab_postgrid_sectionTag: {
			title: __( 'Post Grid Section Tag', 'atomic-blocks' ),
		},
		ab_postgrid_sectionTitleTag: {
			title: __( 'Section Title Heading Tag', 'atomic-blocks' ),
		},
		ab_postgrid_postTitleTag: {
			title: __( 'Post Title Heading Tag', 'atomic-blocks' ),
		},
	},

	// Render via PHP
	save() {
		return null;
	},
} );
