/**
 * BLOCK: Atomic Blocks Device Mockup
 */

/**
 * Internal dependencies
 */
import Edit from './components/edit';
import Save from './components/save';
import './styles/style.scss';
import './styles/editor.scss';
import BackgroundAttributes from './../../utils/components/background-image/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	...BackgroundAttributes,
	deviceType: {
		type: 'string',
		default: 'ab-phone-mockup'
	},
	deviceOrientation: {
		type: 'string'
	},
	deviceShadow: {
		type: 'boolean',
		default: true
	},
	deviceAlignment: {
		type: 'string'
	},
};

/**
 * Register the block
 */
registerBlockType( 'atomic-blocks/ab-devices', {
	title: __( 'AB Device Mockup', 'atomic-blocks' ),
	description: __( 'Add a mobile or tablet image mockup.', 'atomic-blocks' ),
	icon: 'tablet',
	category: 'atomic-blocks',
	keywords: [
		__( 'phone', 'atomic-blocks' ),
		__( 'tablet', 'atomic-blocks' ),
		__( 'mockup', 'atomic-blocks' )
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
});
