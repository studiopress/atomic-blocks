/**
 * BLOCK: Atomic Blocks Layout
 */

/**
 * Import dependencies.
 */
import Edit from './components/edit';
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
	description: __( 'Add a pre-defined section or layout to posts and pages.', 'atomic-blocks' ),
	icon: 'layout',
	category: 'atomic-blocks',
	keywords: [
		__( 'layout', 'atomic-blocks' ),
		__( 'column', 'atomic-blocks' ),
		__( 'row', 'atomic-blocks' ),
	],
	attributes: {
		uniqueID: {
			type: 'string',
			default: '',
		},
		align: {
			type: 'string',
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
	save: () => {
		return null;
	}
} );
