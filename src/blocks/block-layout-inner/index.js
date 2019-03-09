/**
 * BLOCK: Atomic Blocks Layout InnerBlocks
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	Fragment,
} = wp.element;

const ALLOWED_BLOCKS = [
	'atomic-blocks/ab-layout-column-description',
	'atomic-blocks/ab-layout-column-price',
	'atomic-blocks/ab-layout-column-subtitle',
	'atomic-blocks/ab-layout-column-title',
	'atomic-blocks/ab-layout-column-button',
	'core/paragraph',
	'core/image',
];

class ABLayoutColumnBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: {
			borderWidth,
			borderColor,
			borderRadius,
			backgroundColor,
			padding,
			alignment
		},
			isSelected,
			className,
			setAttributes
		} = this.props;

		const styles = {
			borderWidth: borderWidth ? borderWidth : null,
			borderStyle: borderWidth > 0 ? 'solid' : null,
			borderColor: borderColor ? borderColor : null,
			borderRadius: borderRadius ? borderRadius : null,
			backgroundColor: backgroundColor ? backgroundColor : null,
			padding: padding ? padding + '%' : null,
		};

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( nextAlign ) => {
						setAttributes( { alignment: nextAlign } );
					} }
				/>
			</BlockControls>,
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			<Fragment>
				<div
					className={ classnames(
						alignment ? 'ab-block-layout-column-' + alignment : 'ab-block-layout-column-center',
						'ab-block-layout-column',
					) }
					itemScope
					itemType="http://schema.org/Product"
				>
					<div
						className="ab-block-layout-column-inside"
						style={ styles }
					>
						<InnerBlocks
							template={[

							]}
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

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
		borderWidth: {
			type: 'number',
			default: 2,
		},
		borderColor: {
			type: 'string',
		},
		borderRadius: {
			type: 'number',
			default: 0,
		},
		backgroundColor: {
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
	edit: ABLayoutColumnBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			borderWidth,
			borderColor,
			borderRadius,
			backgroundColor,
			alignment,
			padding,
		} = props.attributes;

		const styles = {
			borderWidth: borderWidth ? borderWidth : null,
			borderStyle: borderWidth > 0 ? 'solid' : null,
			borderColor: borderColor ? borderColor : null,
			borderRadius: borderRadius ? borderRadius : null,
			backgroundColor: backgroundColor ? backgroundColor : null,
			padding: padding ? padding + '%' : null,
		};

		// Save the block markup for the front end
		return (
			<div
				className={ classnames(
					alignment ? 'ab-block-layout-column-' + alignment : 'ab-block-layout-column-center',
					'ab-block-layout-column',
				) }
			>
				<div
					className="ab-block-layout-column-inside"
					style={ styles }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
