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
			imageLoaded: false,
			setImageUrlSubscription: false
		};
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.imgSize !== prevProps.imgSize ) {
			this.setImageUrl();
		}
	}

	componentDidMount() {

		/**
		 * Set the image URL on load and when state changes.
		 */
		this.setState({
			setImageUrlSubscription: wp.data.subscribe( () => {
				this.setImageUrl();
			})
		});
	}

	componentWillUnmount() {

		/**
		 * Cancel the image URL subscription.
		 */
		this.state.setImageUrlSubscription();
	}

	setImageUrl() {
		let imageUrl = this.getImageUrl();

		if ( ! imageUrl ) {
			imageUrl = this.getFullImageSize();
		}

		if ( imageUrl ) {
			this.setState({
				imageUrl,
				imageLoaded: true
			});
		}
	}

	getImageUrl() {
		return (
			get(

				/* getMedia accepts an image id and returns an object with all the image data. */
				wp.data.select( 'core' ).getMedia( this.props.imgID ),
				[
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
						( ! this.getImageUrl() && this.state.imageLoaded && 'selectimage' !== this.props.imgSize ) &&
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
								<div className="components-placeholder__label">
									{ __( 'There is no image generated for the selected image size, so a fallback image size is being used.', 'atomic-blocks' ) }
								</div>
								<div className="ab-post-grid-image-help"><a target="_blank" rel="noreferrer noopener" aria-label={ __( 'Learn more about image sizes (opens in a new tab)', 'atomic-blocks' ) } href="https://github.com/studiopress/atomic-blocks/wiki/Post-Grid-Block#featured-image-sizes">{ __( 'Learn more ', 'atomic-blocks' ) }<span>&rarr;</span></a></div>
							</Placeholder>
						</Fragment>
					}
				</div>
			</Fragment>
		);
	}
}
