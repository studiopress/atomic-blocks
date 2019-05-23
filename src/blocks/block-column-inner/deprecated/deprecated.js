/**
 * Column component deprecations.
 */

import Save_1_7_1 from './1.7.1/components/save';

export const Column_Inner_1_7_1_attributes = {
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
	},
	marginSync: {
		type: 'boolean',
		default: false,
	},
	marginUnit: {
		type: 'string',
		default: 'px',
	},
	margin: {
		type: 'number',
		default: 0,
	},
	marginTop: {
		type: 'number',
		default: 0,
	},
	marginBottom: {
		type: 'number',
		default: 0,
	},
	paddingSync: {
		type: 'boolean',
		default: false,
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
	padding: {
		type: 'number',
		default: 0,
	},
	paddingTop: {
		type: 'number',
		default: 0,
	},
	paddingRight: {
		type: 'number',
		default: 0,
	},
	paddingBottom: {
		type: 'number',
		default: 0,
	},
	paddingLeft: {
		type: 'number',
		default: 0,
	},
	columnVerticalAlignment: {
		type: 'string',
	},
};

export const Column_Inner_1_7_1_save = props => {
	return (
		<Save_1_7_1 { ...props } />
	);
}

const deprecated = [
	// Version 1.7.1
	{
		attributes: Column_Inner_1_7_1_attributes,
		save: Column_Inner_1_7_1_save,
	},
];

export default deprecated;
