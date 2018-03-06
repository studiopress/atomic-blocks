/**
 * BLOCK: Atomic Blocks Drop Cap
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import DropCap from './components/dropcap';
import icons from './components/icons';
import * as fontSize from './../../utils/helper';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n; 

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	SelectControl,
} = wp.blocks;

// Register components
const {
	Button,
} = wp.components;

// Register the block
registerBlockType( 'atomic/atomic-drop-cap', {
	title: __( 'Drop Cap' ),
	description: __( 'Add a styled drop cap to the beginning of your paragraph.' ),
	icon: 'format-quote',
	category: 'common',
	keywords: [
		__( 'drop cap' ),
		__( 'quote' ),
		__( 'atomic' ),
	],
	attributes: {
		content: {
			type: 'array',
			selector: '.drop-cap-text',
			source: 'children',
		},
		alignment: {
			type: 'string',
		},
		blockBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		blockTextColor: {
			type: 'string',
			default: '#32373c'
		},
		fontSize: {
			type: 'number',
			default: 3,
		},
		dropCapStyle: {
            type: 'string',
            default: 'drop-cap-letter',
        },
	},

	edit: function( props, isSelected ) {
		// Change the text alignment
		const onChangeAlignment = value =>  {
			props.setAttributes( { alignment: value } );
		};

		// Change the background color
		const onChangeBackgroundColor = value => {
			props.setAttributes( { blockBackgroundColor: value } );
		};

		// Change the text color
		const onChangeTextColor = value => {
			props.setAttributes( { blockTextColor: value } );
		};

		// Change the font size
		const setFontRatio = ( ratio ) => props.setAttributes( { fontSize: ratio } );

		// Cite Alignment Options
		const dropCapOptions = [
			{ value: 'drop-cap-letter', label: __( 'Letter' ) },
			{ value: 'drop-cap-square', label: __( 'Square' ) },
			{ value: 'drop-cap-border', label: __( 'Border' ) },
		];

		// Change Cite Alignment
		const onChangeDropCap = value => {
			props.setAttributes( { dropCapStyle: value } );
		};

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ props.attributes.alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...{ onChangeBackgroundColor, onChangeTextColor, setFontRatio, dropCapOptions, onChangeDropCap, ...props} }
				/>
			),
			// Show the block markup in the editor
			<DropCap { ...props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add paragraph text...' ) }
					value={ props.attributes.content }
					className={ classnames(
						fontSize.fontRatioToClass( props.attributes.fontSize ),
						'drop-cap-text',
					) }
					style={ {
						textAlign: props.attributes.alignment,
					} }
					onChange={ ( value ) => props.setAttributes( { content: value } ) }
				/>
			</DropCap>
		];
	},

	// Save the attributes and markup
	save: function( props ) {
		// Save the block markup for the front end
		return (
			<DropCap { ...props }>
				<div
				className={ classnames(
					'drop-cap-text',
					fontSize.fontRatioToClass( props.attributes.fontSize ),
				) }
				style={ {
					textAlign: props.attributes.alignment,
				} }
				>
					{ props.attributes.content }
				</div>
			</DropCap>
		);
	},
} );