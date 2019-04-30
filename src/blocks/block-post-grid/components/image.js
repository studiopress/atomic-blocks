/**
 * Post grid featured image.
 */

import get from 'lodash/get';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Placeholder, Dashicon } = wp.components;

export default class PostGridImage extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			imageUrl: '',
			changeSize: '',
		}
	}

	/* Get the image size value when changed in the inspector. */
	componentDidUpdate( prevProps ) {
		/* Get the selected image size and fallback image size. */
		const imageUrl = this.getImageSize();
		const fullImageUrl = this.getFullImageSize();

		/* If the image size is changed, set the new image size. */
		if ( this.props.imgSize !== prevProps.imgSize ) {
			this.setState({
				imageUrl: imageUrl ? imageUrl : fullImageUrl,
				changeSize: true,
			});
		}
	}

	/* Get the image size value on load. */
	componentDidMount() {
		const unsubscribe = wp.data.subscribe(() => {
			/* Get the selected image size and fallback image size. */
			const imageUrl = this.getImageSize();

			if ( imageUrl ) {
				this.setState({
					imageUrl
				});
			}
		});
	}

	/* Get the image size value. */
	getImageSize() {
		return (
			get(
				/* getMedia accepts an image id and returns an object with all the image data. */
				wp.data.select( 'core' ).getMedia( this.props.imgID ), [
					'media_details',
					'sizes',
					this.props.imgSize, /* Get the image slug from the inspector. */
					'source_url' /* Return the url of the image size. */
				],
				/* A default image url can be passed here. */
			)
		);
	}

	/* Get the full image size value as a placeholder. */
	getFullImageSize() {
		return (
			get(
				/* getMedia accepts an image id and returns an object with all the image data. */
				wp.data.select( 'core' ).getMedia( this.props.imgID ), [
					'media_details',
					'sizes',
					'full', /* Get the full image size. */
					'source_url' /* Return the url of the full image size. */
				],
			)
		);
	}

	render() {
		return (
			<Fragment>
				<div
					className={ classnames(
						'ab-block-post-grid-image',
					) }
				>
					<a href={ this.props.imgLink } target="_blank" rel="bookmark">
						<img
							src={ this.state.imageUrl ? this.state.imageUrl : this.props.imgSizeLandscape }
							alt={ this.props.imgAlt }
							className={ this.props.imgClass }
						/>
					</a>

					{	/* If we don't have the selected image size, show a warning */
						( ! this.getImageSize() && this.state.changeSize && this.props.imgSize != 'selectimage' ) &&
						<Fragment>
							<div className={ 'ab-post-grid-no-image-icon' }>
								<Dashicon
									icon={ 'warning' }
								/>
							</div>

							<Placeholder
								className={ 'ab-post-grid-no-image-placeholder' }
							>
								<Dashicon icon={ 'info' } />
								<div class="components-placeholder__label">{ __( 'There is no image generated for the selected image size, so a fallback image size is being used. Learn more.', 'atomic-blocks' ) }</div>
							</Placeholder>
						</Fragment>
					}
				</div>
			</Fragment>
		);
	}
}
