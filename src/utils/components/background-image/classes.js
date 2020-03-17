import { dimRatioToClass } from './shared';

/**
 * Background image classes.
 *
 * @param {Object} attributes
 */
function BackgroundImageClasses( attributes ) {
	return [
		attributes.backgroundDimRatio !== undefined &&
		100 !== attributes.backgroundDimRatio
			? 'ab-has-background-dim'
			: null,
		dimRatioToClass( attributes.backgroundDimRatio ),
		attributes.backgroundImgURL &&
		attributes.backgroundSize &&
		'no-repeat' === attributes.backgroundRepeat
			? 'ab-background-' + attributes.backgroundSize
			: null,
		attributes.backgroundImgURL && attributes.backgroundRepeat
			? 'ab-background-' + attributes.backgroundRepeat
			: null,
		attributes.hasParallax ? 'ab-has-parallax' : null,
	];
}

export default BackgroundImageClasses;
