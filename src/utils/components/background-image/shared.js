export const IMAGE_BACKGROUND_TYPE = 'image';
export const VIDEO_BACKGROUND_TYPE = 'video';

export function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		{};
}

export function dimRatioToClass( ratio ) {
	return ( 100 > ratio ) ? 'ab-has-background-dim-' + ( 10 * Math.round( ratio / 10 ) ) : null;
}
