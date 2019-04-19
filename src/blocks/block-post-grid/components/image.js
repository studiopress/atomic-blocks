/**
 * Post grid featured image
 */

import get from 'lodash/get';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Spinner, Placeholder } = wp.components;

export default class PostGridImage extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			imageSize: ""
		}
	}

	/* Get the image size value when changed in the inspector. */
	componentDidUpdate( prevProps ) {
		const imageSize = this.getImageSize();
		if ( this.props.imgSize !== prevProps.imgSize ) {
			this.setState({ imageSize });
		}
	}

	/* Get the image size value on load. */
	componentDidMount() {
		const unsubscribe = wp.data.subscribe(() => {
			const imageSize = this.getImageSize();
			this.setState({ imageSize });
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
				{ ! this.state.imageSize ?
					<Placeholder
						label={ __( 'Loading Post Grid Image', 'atomic-blocks' ) }
					>
						<Spinner />
					</Placeholder>
				:
					<img
						src={ this.state.imageSize ? this.state.imageSize : this.props.imgSizeLandscape }
						alt={ this.props.imgAlt }
						className={ this.props.imgClass }
					/>
				}
			</Fragment>
		);
	}
}
