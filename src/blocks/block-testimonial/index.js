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

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ABTestimonialBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				testimonialName,
				testimonialTitle,
				testimonialContent,
				testimonialAlignment,
				testimonialImgURL,
				testimonialImgID,
				testimonialBackgroundColor,
				testimonialTextColor,
				testimonialFontSize,
				testimonialCiteAlign
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				testimonialImgID: img.id,
				testimonialImgURL: img.url,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ testimonialAlignment }
					onChange={ ( value ) => setAttributes( { testimonialAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<Testimonial { ...this.props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add testimonial text...', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ testimonialContent }
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'ab-testimonial-text'
					) }
					style={ {
						textAlign: testimonialAlignment,
					} }
					onChange={ ( value ) => setAttributes( { testimonialContent: value } ) }
				/>

				<div className="ab-testimonial-info">
					<div className="ab-testimonial-avatar-wrap">
						<div className="ab-testimonial-image-wrap">
							<MediaUpload
								buttonProps={ {
									className: 'change-image'
								} }
								onSelect={ ( img ) => setAttributes(
									{
										testimonialImgID: img.id,
										testimonialImgURL: img.url,
									}
								) }
								allowed={ ALLOWED_MEDIA_TYPES }
								type="image"
								value={ testimonialImgID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! testimonialImgID ? icons.upload : <img
											className="ab-testimonial-avatar"
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
						placeholder={ __( 'Add name', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ testimonialName }
						className='ab-testimonial-name'
						style={ {
							color: testimonialTextColor
						} }
						onChange={ ( value ) => this.props.setAttributes( { testimonialName: value } ) }
					/>

					<RichText
						tagName="small"
						placeholder={ __( 'Add title', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
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
	title: __( 'AB Testimonial', 'atomic-blocks' ),
	description: __( 'Add a user testimonial with a name and title.', 'atomic-blocks' ),
	icon: 'format-quote',
	category: 'atomic-blocks',
	keywords: [
		__( 'testimonial', 'atomic-blocks' ),
		__( 'quote', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
	],
	attributes: {
		testimonialName: {
			type: 'array',
			selector: '.ab-testimonial-name',
			source: 'children',
		},
		testimonialTitle: {
			type: 'array',
			selector: '.ab-testimonial-title',
			source: 'children',
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
		const {
			testimonialName,
			testimonialTitle,
			testimonialContent,
			testimonialAlignment,
			testimonialImgURL,
			testimonialImgID,
			testimonialBackgroundColor,
			testimonialTextColor,
			testimonialFontSize,
			testimonialCiteAlign
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Testimonial { ...props }>
				<RichText.Content
					tagName="div"
					className="ab-testimonial-text"
					style={ {
						textAlign: testimonialAlignment,
					} }
					value={ testimonialContent }
				/>

				<div className="ab-testimonial-info">
					{ testimonialImgURL && (
						<div className="ab-testimonial-avatar-wrap">
							<div className="ab-testimonial-image-wrap">
								<img
									className="ab-testimonial-avatar"
									src={ testimonialImgURL }
									alt="avatar"
								/>
							</div>
						</div>
					) }

					{ testimonialName && (
						<RichText.Content
							tagName="h2"
							className="ab-testimonial-name"
							style={ {
								color: testimonialTextColor
							} }
							value={ testimonialName }
						/>
					) }

					{ testimonialTitle && (
						<RichText.Content
							tagName="small"
							className="ab-testimonial-title"
							style={ {
								color: testimonialTextColor
							} }
							value={ testimonialTitle }
						/>
					) }
				</div>
			</Testimonial>
		);
	},
} );
