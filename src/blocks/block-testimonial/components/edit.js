/**
 * Internal dependencies
 */
import classnames from 'classnames';
import Inspector from './inspector';
import Testimonial from './testimonial';
import icons from './../../../utils/components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	MediaUpload,
} = wp.blockEditor;
const { Button, Dashicon } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default class Edit extends Component {
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
				testimonialTextColor,
			},
			setAttributes,
		} = this.props;

		const onRemoveImage = () => {
			setAttributes( {
				testimonialImgURL: null,
				testimonialImgID: null,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ testimonialAlignment }
					onChange={ ( value ) =>
						setAttributes( { testimonialAlignment: value } )
					}
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector key={ 'ab-testimonial-inspector-' + this.props.clientId } { ...{ setAttributes, ...this.props } } />,

			// Show the block markup in the editor
			<Testimonial key={ 'ab-testimonial-editor-' + this.props.clientId } { ...this.props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __(
						'Add testimonial text...',
						'atomic-blocks'
					) }
					keepPlaceholderOnFocus
					value={ testimonialContent }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/strikethrough',
						'core/link',
					] }
					className={ classnames( 'ab-testimonial-text' ) }
					style={ {
						textAlign: testimonialAlignment,
					} }
					onChange={ ( value ) =>
						setAttributes( { testimonialContent: value } )
					}
				/>

				<div className="ab-testimonial-info">
					<div className="ab-testimonial-avatar-wrap">
						<div className="ab-testimonial-image-wrap">
							<MediaUpload
								buttonProps={ {
									className: 'change-image',
								} }
								onSelect={ ( img ) =>
									setAttributes( {
										testimonialImgID: img.id,
										testimonialImgURL: img.url,
									} )
								}
								allowed={ ALLOWED_MEDIA_TYPES }
								type="image"
								value={ testimonialImgID }
								render={ ( { open } ) => (
									<Fragment>
										<Button
											className={
												testimonialImgID
													? 'ab-change-image'
													: 'ab-add-image'
											}
											onClick={ open }
										>
											{ ! testimonialImgID ? (
												icons.upload
											) : (
												<img
													className="ab-testimonial-avatar"
													src={ testimonialImgURL }
													alt="avatar"
												/>
											) }
										</Button>
										{ testimonialImgID && (
											<Button
												className="ab-remove-image"
												onClick={ onRemoveImage }
											>
												<Dashicon icon={ 'dismiss' } />
											</Button>
										) }
									</Fragment>
								) }
							></MediaUpload>
						</div>
					</div>

					<RichText
						tagName="h2"
						placeholder={ __( 'Add name', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ testimonialName }
						className="ab-testimonial-name"
						style={ {
							color: testimonialTextColor,
						} }
						onChange={ ( value ) =>
							this.props.setAttributes( {
								testimonialName: value,
							} )
						}
					/>

					<RichText
						tagName="small"
						placeholder={ __( 'Add title', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ testimonialTitle }
						className="ab-testimonial-title"
						style={ {
							color: testimonialTextColor,
						} }
						onChange={ ( value ) =>
							this.props.setAttributes( {
								testimonialTitle: value,
							} )
						}
					/>
				</div>
			</Testimonial>,
		];
	}
}
