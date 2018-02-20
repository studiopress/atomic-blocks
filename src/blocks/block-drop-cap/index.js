/**
 * BLOCK: Atomic Blocks Drop Cap
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import DropCap from './components/testimonial';
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
		testimonialName: {
			type: 'string',
			selector: '.testimonial-name',
		},
		testimonialTitle: {
			type: 'string',
			selector: '.testimonial-title',
		},
		content: {
			type: 'array',
			selector: '.testimonial-text',
			source: 'children',
		},
		alignment: {
			type: 'string',
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
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
		citeAlign: {
            type: 'string',
            default: 'left-aligned',
        },
	},

	edit: function( props ) {
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

		// Populate the mobile image
		const onSelectImage = img => {
			props.setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		// Change the font size
		const setFontRatio = ( ratio ) => props.setAttributes( { fontSize: ratio } );

		// Cite Alignment Options
		const citeAlignOptions = [
			{ value: 'style-one', label: __( 'Letter Only' ) },
			{ value: 'style2-two', label: __( 'Square' ) },
			{ value: 'style3-three', label: __( 'Round' ) },
		];

		// Change Cite Alignment
		const onChangeCiteAlign = value => {
			props.setAttributes( { citeAlign: value } );
		};

		// Upload avatar button
		const MediaUploadAvatar = ( props ) => (
			<div class="testimonial-image-wrap">
				<MediaUpload
					buttonProps={ {
						className: 'change-image'
					} }
					onSelect={ onSelectImage }
					type="image"
					value={ props.attributes.imgID }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ icons.upload }
						</Button>
					) }
				>
				</MediaUpload>
				
				{ props.children }
			</div>
		);

		return [
			// Show the alignment toolbar on focus
			!! props.focus && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ props.attributes.alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			!! props.focus && (
				<Inspector
					{ ...{ onChangeBackgroundColor, onChangeTextColor, setFontRatio, citeAlignOptions, onChangeCiteAlign, ...props} }
				/>
			),
			// Show the block markup in the editor
			<DropCap { ...props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add testimonial text...' ) }
					value={ props.attributes.content }
					className={ classnames(
						fontSize.fontRatioToClass( props.attributes.fontSize ),
						'testimonial-text'
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
					'testimonial-text',
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