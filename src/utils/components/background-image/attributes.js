/**
 * Background image attributes.
 */

const BackgroundAttributes = {
	backgroundImgURL: {
		type: 'string',
	},
	backgroundDimRatio: {
		type: 'number',
		default: 100,
	},
	backgroundRepeat: {
		type: 'string',
		default: 'no-repeat',
	},
	backgroundSize: {
		type: 'string',
		default: 'cover',
	},
	hasParallax: {
		type: 'boolean',
		default: false,
	},
	focalPoint: {
		type: 'object',
	},
};

export default BackgroundAttributes;
