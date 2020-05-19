/**
 * BLOCK: Atomic Blocks Button
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Spacer from './components/spacer';
import Resizable from 're-resizable';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

class ABSpacerBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: { spacerHeight, spacerDividerColor },
			className,
			setAttributes,
			toggleSelection,
		} = this.props;

		return [
			// Show the block controls on focus
			<Inspector key={ 'ab-spacer-inspector-' + this.props.clientId } { ...this.props } />,

			// Show the button markup in the editor
			<Spacer key={ 'ab-spacer-editor-' + this.props.clientId } { ...this.props }>
				<Resizable
					className={ classnames( className, 'ab-spacer-handle' ) }
					style={ {
						color: spacerDividerColor,
					} }
					size={ {
						width: '100%',
						height: spacerHeight,
					} }
					minWidth={ '100%' }
					maxWidth={ '100%' }
					minHeight={ '100%' }
					handleClasses={ {
						bottomLeft: 'ab-spacer-control__resize-handle',
					} }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: true,
						topLeft: false,
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( {
							spacerHeight: parseInt(
								spacerHeight + delta.height,
								10
							),
						} );
						toggleSelection( true );
					} }
				></Resizable>
			</Spacer>,
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-spacer', {
	title: __( 'Spacer', 'atomic-blocks' ),
	description: __(
		'Add a spacer and divider between your blocks.',
		'atomic-blocks'
	),
	icon: 'image-flip-vertical',
	category: 'atomic-blocks',
	keywords: [
		__( 'spacer', 'atomic-blocks' ),
		__( 'divider', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
	],
	attributes: {
		spacerHeight: {
			type: 'number',
			default: 30,
		},
		spacerDivider: {
			type: 'boolean',
			default: false,
		},
		spacerDividerStyle: {
			type: 'string',
			default: 'ab-divider-solid',
		},
		spacerDividerColor: {
			type: 'string',
			default: '#ddd',
		},
		spacerDividerHeight: {
			type: 'number',
			default: 1,
		},
	},

	ab_settings_data: {
		ab_spacer_spacerHeight: {
			title: __( 'Spacer Height', 'atomic-blocks' ),
		},
		ab_spacer_spacerDivider: {
			title: __( 'Add Divider', 'atomic-blocks' ),
		},
		ab_spacer_spacerDividerStyle: {
			title: __( 'Divider Style', 'atomic-blocks' ),
		},
		ab_spacer_spacerDividerHeight: {
			title: __( 'Divider Height', 'atomic-blocks' ),
		},
		ab_spacer_dividerColor: {
			title: __( 'Divider Color', 'atomic-blocks' ),
		},
	},

	// Render the block components
	edit: ABSpacerBlock,

	// Save the attributes and markup
	save( props ) {
		// Setup the attributes
		const { spacerHeight } = props.attributes;

		// Save the block markup for the front end
		return (
			<Spacer { ...props }>
				<hr
					style={ {
						height: spacerHeight ? spacerHeight + 'px' : undefined,
					} }
				></hr>
			</Spacer>
		);
	},
} );
