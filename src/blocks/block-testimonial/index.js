/**
 * BLOCK: Atomic Blocks Testimonial
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType( 'atomic-blocks/ab-testimonial', {
	title: __( 'AB Testimonial', 'atomic-blocks' ),
	description: __( 'Add a user testimonial with a name and title.', 'atomic-blocks' ),
	icon: 'format-quote',
	category: 'atomic-blocks',
	keywords: [
		__( 'testimonial', 'atomic-blocks' ),
		__( 'quote', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],
	attributes: {
		testimonialName: {
			type: 'array',
			selector: '.ab-testimonial-name',
			source: 'children'
		},
		testimonialTitle: {
			type: 'array',
			selector: '.ab-testimonial-title',
			source: 'children'
		},
		testimonialContent: {
			type: 'array',
			selector: '.ab-testimonial-text',
			source: 'children'
		},
		testimonialAlignment: {
			type: 'string'
		},
		testimonialImgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img'
		},
		testimonialImgID: {
			type: 'number'
		},
		testimonialBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		testimonialTextColor: {
			type: 'string',
			default: '#32373c'
		},
		testimonialFontSize: {
			type: 'number',
			default: 18
		},
		testimonialCiteAlign: {
            type: 'string',
            default: 'left-aligned'
        }
	},

	/* Render the block in the editor. */
	edit: props => {
		return <Edit { ...props } />;
	},

	/* Save the block markup. */
	save: props => {
		return <Save { ...props } />;
	}
});
