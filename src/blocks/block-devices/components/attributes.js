import BackgroundAttributes from '../../../utils/components/background-image/attributes';

const blockAttributes = {
	...BackgroundAttributes,
	deviceImage: {
		type: 'string'
	},
	deviceType: {
		type: 'string',
		default: 'ab-device-phone'
	},
	deviceOrientation: {
		type: 'string'
	},
	deviceShadow: {
		type: 'boolean',
		default: true
	},
	deviceColor: {
		type: 'string'
	},
	deviceMaxWidth: {
		type: 'number',
		default: 350
	},
	deviceBorder: {
		type: 'number'
	},
	deviceBorderRadius: {
		type: 'number'
	},
	deviceAlignment: {
		type: 'string'
	}
};

export default blockAttributes;
