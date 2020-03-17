/**
 * Background image styles.
 */

const BackgroundImageStyles = ( attributes ) => {
	const styles = {
		backgroundImage: attributes.backgroundImgURL
			? `url(${ attributes.backgroundImgURL })`
			: undefined,
		backgroundPosition: attributes.focalPoint
			? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y *
					100 }%`
			: undefined,
	};

	return styles;
};

export default BackgroundImageStyles;
