import get from 'lodash/get';

const { __ } = wp.i18n;
const { Fragment } = wp.element;

export default function PostGridImage( props ) {

	const {
        imgAlt,
		imgClass,
		imgID,
		imgSize,
		imgSizeLandscape,
		imgSizeSquare,
	} = props;

	const getSizeURL = get(
		/* getMedia accepts an image id and returns an object with all the image data. */
		wp.data.select( 'core' ).getMedia( imgID ), [
			'media_details',
			'sizes',
			imgSize, /* Get the image slug from the inspector. */
			'source_url' /* Return the url of the image size. */
		],
	);

    return (
        <Fragment>
            <img
				src={ getSizeURL ? getSizeURL : imgSizeLandscape }
				alt={ imgAlt }
				className={ imgClass }
			/>
        </Fragment>
    );
}
