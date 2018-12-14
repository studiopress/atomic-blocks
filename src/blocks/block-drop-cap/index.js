/**
 * BLOCK: LSX Blocks Drop Cap
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import DropCap from './components/dropcap';
import icons from './components/icons';

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
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
} = wp.editor;

// Register components
const {
	Button,
	SelectControl,
} = wp.components;

class LSXDropCapBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ dropCapAlignment }
					onChange={ ( value ) => this.props.setAttributes( { dropCapAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...this.props }
			/>,
			// Show the block markup in the editor
			<DropCap { ...this.props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add paragraph text...', 'lsx-blocks' ) }
					keepPlaceholderOnFocus
					value={ dropCapContent }
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'lsx-drop-cap-text',
						'lsx-font-size-' + dropCapFontSize,
					) }
					onChange={ ( value ) => this.props.setAttributes( { dropCapContent: value } ) }
				/>
			</DropCap>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-drop-cap', {
	title: __( 'LSX Drop Cap', 'lsx-blocks' ),
	description: __( 'Add a styled drop cap to the beginning of your paragraph.', 'lsx-blocks' ),
	icon: 'format-quote',
	category: 'lsx-blocks',
	keywords: [
		__( 'drop cap', 'lsx-blocks' ),
		__( 'quote', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	attributes: {
		dropCapContent: {
			type: 'array',
			selector: '.lsx-drop-cap-text',
			source: 'children',
		},
		dropCapAlignment: {
			type: 'string',
		},
		dropCapBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		dropCapTextColor: {
			type: 'string',
			default: '#32373c'
		},
		dropCapFontSize: {
			type: 'number',
			default: 3,
		},
		dropCapStyle: {
            type: 'string',
            default: 'drop-cap-letter',
        },
	},

	// Render the block components
	edit: LSXDropCapBlock,

	// Save the attributes and markup
	save: function( props ) {

		const { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle } = props.attributes;

		// Save the block markup for the front end
		return (
			<DropCap { ...props }>
				{	// Check if there is text and output
					dropCapContent && (
					<RichText.Content
						tagName="div"
						className="lsx-drop-cap-text"
						value={ dropCapContent }
					/>
				) }
			</DropCap>
		);
	},
} );
