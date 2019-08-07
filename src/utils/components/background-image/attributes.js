/**
 * Background Image attributes
 */
const BackgroundAttributes = {
	backgroundImgURL: {
		type: 'string',
	},
	backgroundDimRatio: {
		type: 'number',
		default: 100,
	},
	hasParallax: {
		type: 'boolean',
		default: false,
	},
	focalPoint: {
		type: 'object',
	}
};

export default BackgroundAttributes;
