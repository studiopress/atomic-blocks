/**
 * Internal dependencies
 */
import Testimonial from './testimonial';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;

export default class Save extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			testimonialName,
			testimonialTitle,
			testimonialContent,
			testimonialAlignment,
			testimonialImgURL,
			testimonialTextColor
		} = this.props.attributes;

		return (

			<Testimonial { ...this.props }>
				<RichText.Content
					tagName="div"
					className="ab-testimonial-text"
					style={ {
						textAlign: testimonialAlignment
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
								color: testimonialTextColor ? testimonialTextColor : '#32373c'
							} }
							value={ testimonialName }
						/>
					) }

					{ testimonialTitle && (
						<RichText.Content
							tagName="small"
							className="ab-testimonial-title"
							style={ {
								color: testimonialTextColor ? testimonialTextColor : '#32373c'
							} }
							value={ testimonialTitle }
						/>
					) }
				</div>
			</Testimonial>
		);
	}
}
