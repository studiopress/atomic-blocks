/**
 * BLOCK: Atomic Blocks Testimonial
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Testimonial from './components/testimonial';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n; 

// Extend component
const { Component } = wp.element;

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

class ABTestimonialBlock extends Component {
	
	render() {

		// Setup the attributes
		const { attributes: { testimonialName, testimonialTitle, testimonialContent, testimonialAlignment, testimonialImgURL, testimonialImgID, testimonialBackgroundColor, testimonialTextColor, testimonialFontSize, testimonialCiteAlign }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ testimonialAlignment }
						onChange={ ( value ) => this.props.setAttributes( { testimonialAlignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the block markup in the editor
			<Testimonial { ...this.props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add testimonial text...' ) }
					value={ testimonialContent }
					isSelected={ isSelected }
					keepPlaceholderOnFocus
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'ab-testimonial-text'
					) }
					style={ {
						textAlign: testimonialAlignment,
					} }
					onChange={ ( value ) => this.props.setAttributes( { testimonialContent: value } ) }
				/>

				<div class="ab-testimonial-info">
					<div class="ab-testimonial-avatar-wrap">
						<div class="ab-testimonial-image-wrap">
							<MediaUpload
								buttonProps={ {
									className: 'change-image'
								} }
								onSelect={ ( img ) => this.props.setAttributes( 
									{
										testimonialImgID: img.id,
										testimonialImgURL: img.url,
									}
								) }
								type="image"
								value={ testimonialImgID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! testimonialImgID ? icons.upload : <img
											class="ab-testimonial-avatar"
											src={ testimonialImgURL }
											alt="avatar"
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
						value={ testimonialName }
						className='ab-testimonial-name'
						style={ {
							color: testimonialTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { testimonialName: value } ) }
					/>
					
					<RichText
						tagName="small"
						placeholder={ __( 'Add title' ) }
						value={ testimonialTitle }
						className='ab-testimonial-title'
						style={ {
							color: testimonialTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { testimonialTitle: value } ) }
					/>
				</div>
			</Testimonial>	
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-testimonial', {
	title: __( 'AB Testimonial' ),
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
			selector: '.ab-testimonial-name',
		},
		testimonialTitle: {
			type: 'string',
			selector: '.ab-testimonial-title',
		},
		testimonialContent: {
			type: 'array',
			selector: '.ab-testimonial-text',
			source: 'children',
		},
		testimonialAlignment: {
			type: 'string',
		},
		testimonialImgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		testimonialImgID: {
			type: 'number',
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
			default: 18,
		},
		testimonialCiteAlign: {
            type: 'string',
            default: 'left-aligned',
        },
	},

	// Render the block components
	edit: ABTestimonialBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { testimonialName, testimonialTitle, testimonialContent, testimonialAlignment, testimonialImgURL, testimonialImgID, testimonialBackgroundColor, testimonialTextColor, testimonialFontSize, testimonialCiteAlign } = props.attributes;

		// Save the block markup for the front end
		return (
			<Testimonial { ...props }>
				<div
				className={ classnames(
					'ab-testimonial-text',
				) }
				style={ {
					textAlign: testimonialAlignment,
				} }
				>
					{ testimonialContent }
				</div>
				
				<div class="ab-testimonial-info">
					{ 	// Check if there is an avatar
						testimonialImgURL && (
						<div class="ab-testimonial-avatar-wrap">
							<div class="ab-testimonial-image-wrap">
								<img
									class="ab-testimonial-avatar"
									src={ testimonialImgURL }
									alt="avatar"
								/>
							</div>
						</div>
					) }

					{	// Check if there is a testimonial name
						testimonialName && (
						<h2 class="ab-testimonial-name"
							style={ {
								color: testimonialTextColor
							} }
						>{ testimonialName }</h2>
					) }

					{ 	// Check if there is a testimonial title
						testimonialTitle && (
						<small class="ab-testimonial-title"
							style={ {
								color: testimonialTextColor
							} }
						>{ testimonialTitle }</small>
					) }
				</div>
			</Testimonial>
		);
	},
} );