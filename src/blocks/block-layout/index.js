/**
 * BLOCK: Atomic Blocks Layout
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';
import marginAttributes from '../../utils/components/margin/margin';

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'atomic-blocks/ab-layout', {
	title: __( 'AB Layout', 'atomic-blocks' ),
	description: __( 'Add a pre-defined layout.', 'atomic-blocks' ),
	icon: 'welcome-widgets-menus',
	category: 'atomic-blocks',
	keywords: [
		__( 'layout', 'atomic-blocks' ),
		__( 'column', 'atomic-blocks' ),
		__( 'row', 'atomic-blocks' ),
	],
	attributes: {
		columns: {
			type: 'number',
		},
		layout: {
			type: 'string',
		},
		columnsGap: {
			type: 'number',
			default: 2,
		},
		align: {
			type: 'string',
		},
		layoutClass: {
			type: 'string',
		},
		responsiveToggle: {
			type: 'boolean',
			default: true,
		},
		...marginAttributes,
	},

	// Add alignment to block wrapper
	getEditWrapperProps( { align } ) {
		if ( 'left' === align || 'right' === align || 'full' === align || 'wide' === align ) {
			return { 'data-align': align };
		}
	},

	// Render the Edit component
	edit: props => {
		return <Edit { ...props } />;
	},

	// Render the Save component
	save: props => {
		return <Save { ...props } />;
	},
} );
