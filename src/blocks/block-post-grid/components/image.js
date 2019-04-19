import get from 'lodash/get';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;

export default class PostGridImage extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			imageSize: ""
		}
	}

	/* Get the image size value when changed in the inspector. */
	componentDidUpdate( prevProps ) {
		const imageSize = get(
			/* getMedia accepts an image id and returns an object with all the image data. */
			wp.data.select( 'core' ).getMedia( this.props.imgID ), [
				'media_details',
				'sizes',
				this.props.imgSize, /* Get the image slug from the inspector. */
				'source_url' /* Return the url of the image size. */
			],
		);

		if ( this.props.imgSize !== prevProps.imgSize ) {
			this.setState({ imageSize });
		}
	}

	/* Get the image size value on load. */
	componentDidMount() {
		const unsubscribe = wp.data.subscribe(() => {
			const imageSize = get(
				/* getMedia accepts an image id and returns an object with all the image data. */
				wp.data.select( 'core' ).getMedia( this.props.imgID ), [
					'media_details',
					'sizes',
					this.props.imgSize, /* Get the image slug from the inspector. */
					'source_url' /* Return the url of the image size. */
				],
			);

			this.setState({ imageSize });
		});
	}

	render() {

		return (
			<Fragment>
				<img
					src={ this.state.imageSize ? this.state.imageSize : this.props.imgSizeLandscape }
					alt={ this.props.imgAlt }
					className={ this.props.imgClass }
				/>
			</Fragment>
		);
	}
}
