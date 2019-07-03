/**
 * BLOCK: Atomic Blocks Advanced Columns InnerBlocks.
 */

/**
 * Internal dependencies.
 */
import Edit from './components/edit';
import Save from './components/save';
import deprecated from './deprecated/deprecated';
import './styles/style.scss';
import './styles/editor.scss';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register advanced columns block.
 */
registerBlockType( 'atomic-blocks/ab-column', {
	title: __( 'AB Advanced Column', 'atomic-blocks' ),
	description: __( 'Add a pre-defined column layout.', 'atomic-blocks' ),
	icon: 'editor-table',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-columns' ],
	keywords: [
		__( 'column', 'atomic-blocks' ),
		__( 'layout', 'atomic-blocks' ),
		__( 'row', 'atomic-blocks' )
	],
	attributes: {
		backgroundColor: {
			type: 'string'
		},
		customBackgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		customTextColor: {
			type: 'string'
		},
		textAlign: {
			type: 'string'
		},
		marginSync: {
			type: 'boolean',
			default: false
		},
		marginUnit: {
			type: 'string',
			default: 'px'
		},
		margin: {
			type: 'number',
			default: 0
		},
		marginTop: {
			type: 'number',
			default: 0
		},
		marginBottom: {
			type: 'number',
			default: 0
		},
		paddingSync: {
			type: 'boolean',
			default: false
		},
		paddingUnit: {
			type: 'string',
			default: 'px'
		},
		padding: {
			type: 'number',
			default: 0
		},
		paddingTop: {
			type: 'number',
			default: 0
		},
		paddingRight: {
			type: 'number',
			default: 0
		},
		paddingBottom: {
			type: 'number',
			default: 0
		},
		paddingLeft: {
			type: 'number',
			default: 0
		},
		columnVerticalAlignment: {
			type: 'string'
		}
	},

	/* Render the block in the editor. */
	edit: props => {
		return <Edit { ...props } />;
	},

	/* Save the block markup. */
	save: props => {
		return <Save { ...props } />;
	},

	deprecated: deprecated
});

/* Add the vertical column alignment class to the block wrapper. */
const withClientIdClassName = wp.compose.createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
		const blockName = props.block.name;

		if ( props.attributes.columnVerticalAlignment && 'atomic-blocks/ab-column' === blockName ) {
            return <BlockListBlock { ...props } className={ 'ab-is-vertically-aligned-' + props.attributes.columnVerticalAlignment } />;
        } else {
            return <BlockListBlock { ...props } />;
        }
	};
}, 'withClientIdClassName' );

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'atomic-blocks/add-vertical-align-class',
	withClientIdClassName
);
