import { dimRatioToClass } from './shared';

/**
 * Background image classes.
 */
function BackgroundImageClasses( attributes ) {
	return [
		attributes.backgroundDimRatio !== 100 ? 'ab-has-background-dim' : null,
		dimRatioToClass( attributes.backgroundDimRatio ),
		attributes.backgroundImgURL && attributes.backgroundSize && attributes.backgroundRepeat === 'no-repeat' ? 'ab-background-' + attributes.backgroundSize : null,
		attributes.backgroundImgURL && attributes.backgroundRepeat ? 'ab-background-' + attributes.backgroundRepeat : null,
		attributes.hasParallax ? 'ab-has-parallax' : null
	];
}

export default BackgroundImageClasses;
