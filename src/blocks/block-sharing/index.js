/**
 * BLOCK: Atomic Blocks Sharing
 */

// Import
import Edit from './components/edit';
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'atomic-blocks/ab-sharing', {
	title: __( 'AB Sharing', 'atomic-blocks' ),
	description: __( 'Add sharing buttons to your posts and pages.', 'atomic-blocks' ),
	icon: 'admin-links',
	category: 'atomic-blocks',
	keywords: [
		__( 'sharing', 'atomic-blocks' ),
		__( 'social', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],

	// Render the block components
	edit: props => {
		return <Edit { ...props } />;
	},

	// Render via PHP
	save() {
		return null;
	}
});
