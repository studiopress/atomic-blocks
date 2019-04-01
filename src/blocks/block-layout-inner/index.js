/**
 * BLOCK: Atomic Blocks Columns InnerBlocks
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'atomic-blocks/ab-layout-column', {
	title: __( 'AB Layout Column', 'atomic-blocks' ),
	description: __( 'Add a layout column.', 'atomic-blocks' ),
	icon: 'welcome-widgets-menus',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-layout' ],
	keywords: [
		__( 'column', 'atomic-blocks' ),
		__( 'layout', 'atomic-blocks' ),
		__( 'row', 'atomic-blocks' ),
	],
	attributes: {
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
		textAlign: {
			type: 'string',
		},
		padding: {
			type: 'number',
			default: 0,
		},
	},

	// Render the block components
	edit: props => {
		return <Edit { ...props } />;
	},

	// Save the block markup
	save: props => {
		return <Save { ...props } />;
	},
} );
