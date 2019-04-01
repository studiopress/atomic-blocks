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
			default: 0,
		},
	},

	// Render the block components
	edit: props => {
		return <Edit { ...props } />;
	},

	// Save the attributes and markup
	save: function( props ) {

		let backgroundColorClass;

		if (props.attributes.customBackgroundColor) {
			backgroundColorClass = 'has-custom-background-color';
		} else {
			backgroundColorClass = props.attributes.backgroundColor ? 'has-' + props.attributes.backgroundColor + '-background-color' : null;
		}

		let textColorClass;

		if (props.attributes.customTextColor) {
			textColorClass = 'has-custom-text-color';
		} else {
			textColorClass = props.attributes.textColor ? 'has-' + props.attributes.textColor + '-color' : null;
		}

		// Save the block markup for the front end
		return (
			<div
				className={ classnames(
					props.attributes.alignment ? 'ab-block-layout-column-' + props.attributes.alignment : 'ab-block-layout-column-center',
					'ab-block-layout-column',
				) }
			>
				<div
					className={ classnames(
						'ab-block-layout-column-inside',
						backgroundColorClass,
						textColorClass,
					) }
					style={ {
						backgroundColor: props.attributes.backgroundColor ? null : props.attributes.customBackgroundColor,
						color: props.attributes.textColor ? null : props.attributes.customTextColor,
						padding: props.attributes.padding && props.attributes.padding > 1 ? props.attributes.padding + 'px' : null,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
