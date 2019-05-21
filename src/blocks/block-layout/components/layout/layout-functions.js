/**
 * Layout block functions
 */

import layoutArray from './layout-array';

import sectionArray from './layout-section-array';

const { applyFilters } = wp.hooks;

/**
 * Retrieves the list of Sections.
 *
 * @returns {array} Array of section objects.
 */
export const atomic_blocks_sections = () => {
	return applyFilters( 'atomic_blocks_layout_sections', sectionArray );
}

/**
 * Retrieves the list of Layouts.
 *
 * @returns {array} Array of layout objects.
 */
export const atomic_blocks_layouts = () => {
	return applyFilters( 'atomic_blocks_layout_layouts', layoutArray );
}
