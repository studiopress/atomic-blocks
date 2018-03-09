/**
 * BLOCK: Atomic Blocks Testimonial
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Testimonial from './components/testimonial';
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
} = wp.blocks;

// Register components
const {
	Button,
	SelectControl,
} = wp.components;

// Register the block
registerBlockType( 'atomic/atomic-testimonial', {
	title: __( 'Testimonial' ),
	description: __( 'Add a user testimonial with a name and title.' ),
	icon: 'format-quote',
	category: 'common',
	keywords: [
		__( 'testimonial' ),
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
			default: 18,
		},
		citeAlign: {
            type: 'string',
            default: 'left-aligned',
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
			{ value: 'left-aligned', label: __( 'Left Aligned' ) },
			{ value: 'right-aligned', label: __( 'Right Aligned' ) },
		];

		// Change Cite Alignment
		const onChangeCiteAlign = value => {
			props.setAttributes( { citeAlign: value } );
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
					{ ...{ onChangeBackgroundColor, onChangeTextColor, setFontRatio, citeAlignOptions, onChangeCiteAlign, ...props} }
				/>
			),
			// Show the block markup in the editor
			<Testimonial { ...props }>
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

				<div class="testimonial-info">
					<div class="testimonial-avatar-wrap">
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
										{ ! props.attributes.imgID ? icons.upload : <img
											class="testimonial-avatar"
											src={ props.attributes.imgURL }
											alt={ props.attributes.imgAlt }
										/>  }
									</Button>
								) }
							>
							</MediaUpload>
						</div>	
					</div>

					<RichText
						tagName="h2"
						placeholder={ __( 'Add name' ) }
						value={ props.attributes.testimonialName }
						className='testimonial-name'
						style={ {
							color: props.attributes.blockTextColor
						} }
						onChange={ ( value ) => props.setAttributes( { testimonialName: value } ) }
					/>
					
					<RichText
						tagName="small"
						placeholder={ __( 'Add title' ) }
						value={ props.attributes.testimonialTitle }
						className='testimonial-title'
						style={ {
							color: props.attributes.blockTextColor
						} }
						onChange={ ( value ) => props.setAttributes( { testimonialTitle: value } ) }
					/>
				</div>
			</Testimonial>
		];
	},

	// Save the attributes and markup
	save: function( props ) {
		// Save the block markup for the front end
		return (
			<Testimonial { ...props }>
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
				
				<div class="testimonial-info">
					{ 	// Check if there is an avatar
						props.attributes.imgURL && (
						<div class="testimonial-avatar-wrap">
							<div class="testimonial-image-wrap">
								<img
									class="testimonial-avatar"
									src={ props.attributes.imgURL }
									alt={ props.attributes.imgAlt }
								/>
							</div>
						</div>
					) }

					{	// Check if there is a testimonial name
						props.attributes.testimonialName && (
						<h2 class="testimonial-name"
							style={ {
								color: props.attributes.blockTextColor
							} }
						>{ props.attributes.testimonialName }</h2>
					) }

					{ 	// Check if there is a testimonial title
						props.attributes.testimonialTitle && (
						<small class="testimonial-title"
							style={ {
								color: props.attributes.blockTextColor
							} }
						>{ props.attributes.testimonialTitle }</small>
					) }
				</div>
			</Testimonial>
		);
	},
} );