/**
 * Component deprecations.
 */

/**
 * Version 2.0.
 */
import Save_2_0 from './2.0/components/save';

export const Accordion_2_0_save = props => {
	return (
		<Save_2_0 { ...props } />
	);
};

export const Accordion_2_0_attributes = {
	accordionTitle: {
		type: 'array',
		selector: '.ab-accordion-title',
		source: 'children'
	},
	accordionText: {
		type: 'array',
		selector: '.ab-accordion-text',
		source: 'children'
	},
	accordionAlignment: {
		type: 'string'
	},
	accordionFontSize: {
		type: 'number',
		default: 18
	},
	accordionOpen: {
		type: 'boolean',
		default: false
	}
};

const Deprecated = [

	/* Version 2.0. */
	{
		attributes: Accordion_2_0_attributes,
		save: Accordion_2_0_save
	}
];

export default Deprecated;
