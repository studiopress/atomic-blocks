/**
 * BLOCK: Atomic Blocks Layout
 */

/**
 * Import dependencies.
 */
import Edit from './components/edit';
import LayoutsProvider from './components/layouts-provider';
import './styles/style.scss';
import './styles/editor.scss';

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
		__( 'section', 'atomic-blocks' )
	],

	/* Render the block components. */
	edit: props => {
		return <LayoutsProvider><Edit { ...props } /></LayoutsProvider>;
	},

	/* Save the block markup. */
	save: () => {
		return null;
	}
});

/**
 * Add a AB Layout button to the toolbar.
 */
document.addEventListener( 'DOMContentLoaded', appendImportButton );

/**
 * Build the layout inserter button.
 */
function appendImportButton() {
	let toolbar = document.querySelector( '.edit-post-header-toolbar' );
	if ( ! toolbar ) {
		return;
	}
	let buttonDiv = document.createElement( 'div' );
	let html = '<div class="ab-toolbar-insert-layout">';
	html += `<button id="abLayoutInsertButton" class="components-button components-icon-button" aria-label="${ __( 'Insert Layout', 'atomic-blocks' ) }"><i class="dashicons dashicons-layout ab-toolbar-insert-layout-button"></i> ${ __( 'Layouts', 'atomic-blocks' ) }</button>`;
	html += '</div>';
	buttonDiv.innerHTML = html;
	toolbar.appendChild( buttonDiv );
	document.getElementById( 'abLayoutInsertButton' ).addEventListener( 'click', abInsertLayout );
}

/**
 * Add the AB Layout block on click.
 */
function abInsertLayout() {
	let block = wp.blocks.createBlock( 'atomic-blocks/ab-layouts' );
	wp.data.dispatch( 'core/editor' ).insertBlocks( block );
}
