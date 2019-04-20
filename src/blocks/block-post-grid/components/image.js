/**
 * Post grid featured image
 */

import get from 'lodash/get';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Spinner, Placeholder, Dashicon } = wp.components;

export default class PostGridImage extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			imageUrl: '',
			imageStatus: 'loading',
		}
	}

	/* Get the image size value when changed in the inspector. */
	componentDidUpdate( prevProps ) {
		const imageUrl = this.getImageSize();
		/* If the image size is changed, set the new image size. */
		if ( this.props.imgSize !== prevProps.imgSize ) {
			this.setState({
				imageUrl,
			});
		}
	}

	/* Get the image size value on load. */
	componentDidMount() {
		const unsubscribe = wp.data.subscribe(() => {
			const imageUrl = this.getImageSize();

			if ( imageUrl ) {
				this.setState({
					imageUrl,
					imageStatus: 'loaded',
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
			)
		);
	}

	render() {

		return (
			<Fragment>
				{ this.state.imageUrl ?
					<img
						src={ this.state.imageUrl ? this.state.imageUrl : this.props.imgSizeLandscape }
						alt={ this.props.imgAlt }
						className={ this.props.imgClass }
					/>
				:
					<Fragment>
						<Placeholder
							className={ 'ab-post-grid-no-image-placeholder' }
						>
							<Dashicon icon={ 'warning' } />
							<div class="components-placeholder__label">{ __( 'There is no image available for the selected image size.', 'atomic-blocks' ) }</div>
						</Placeholder>
						<Placeholder
							className={ 'ab-post-grid-image-placeholder' }
							label={ __( 'Loading Post Grid Image', 'atomic-blocks' ) }
						>
							<Spinner />
						</Placeholder>
					</Fragment>
				}
			</Fragment>
		);
	}
}
