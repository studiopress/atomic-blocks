/**
 * Background Image attributes
 */
const BackgroundAttributes = {
	backgroundColor: {
		type: 'string'
	},
	backgroundImgURL: {
		type: 'string',
	},
	backgroundImgID: {
		type: 'number'
	},
	backgroundImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	backgroundDimRatio: {
		type: 'number',
		default: 50
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
