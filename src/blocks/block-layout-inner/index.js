/**
 * BLOCK: Atomic Blocks Columns InnerBlocks
 */

// Import block dependencies and components
import classnames from 'classnames';
import Edit from './components/edit';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
} = wp.editor;

// Register the block
registerBlockType( 'atomic-blocks/ab-layout-column', {
	title: __( 'AB Layout Column', 'atomic-blocks' ),
	description: __( 'Add a layout column.', 'atomic-blocks' ),
	icon: 'welcome-widgets-menus',
	category: 'atomic-blocks',
	parent: [ 'atomic-blocks/ab-layout' ],
	keywords: [
		__( 'layout', 'atomic-blocks' ),
		__( 'column', 'atomic-blocks' ),
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
		alignment: {
			type: 'string',
		},
		padding: {
			type: 'number',
		},
	},

	// Render the block components
	edit: props => {
		return <Edit { ...props } />;
	},

	// Save the attributes and markup
	save: function( props ) {

		const backgroundColorClass = 'has-' + props.attributes.backgroundColor + '-background-color';
		const textColorClass = 'has-' + props.attributes.textColor + '-color';

		// Save the block markup for the front end
		return (
			<div
				className={ classnames(
					props.attributes.alignment ? 'ab-block-layout-column-' + props.attributes.alignment : 'ab-block-layout-column-center',
					'ab-block-layout-column',
					backgroundColorClass,
					textColorClass,
				) }
			>
				<div
					className="ab-block-layout-column-inside"
					style={ {
						backgroundColor: props.attributes.backgroundColor ? null : props.attributes.customBackgroundColor,
						color: props.attributes.textColor ? null : props.attributes.customTextColor,
						padding: props.attributes.padding ? props.attributes.padding + '%' : null,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
