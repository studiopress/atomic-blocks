/**
 * BLOCK: Atomic Blocks Layout
 */

/**
 * Components and dependencies.
 */
import Edit from './components/edit';
import Save from './components/save';
import './styles/style.scss';
import './styles/editor.scss';
//import marginAttributes from '../../utils/components/margin/margin';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Layout block
 */
registerBlockType( 'atomic-blocks/ab-layouts', {
	title: __( 'AB Layouts', 'atomic-blocks' ),
	description: __( 'Add a pre-defined section or layout.', 'atomic-blocks' ),
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
		uniqueID: {
			type: 'string',
			default: '',
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
	},

	/* Add alignment to block wrapper. */
	getEditWrapperProps( { align } ) {
		if ( 'left' === align || 'right' === align || 'full' === align || 'wide' === align ) {
			return { 'data-align': align };
		}
	},

	/* Render the block components. */
	edit: props => {
		return <Edit { ...props } />;
	},

	/* Save the block markup. */
	save: props => {
		return <Save { ...props } />;
	},
} );
