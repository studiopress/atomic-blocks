/**
 * Layout block functions
 */

/**
 * Import section and layout data.
 */
import layoutArray from './layout-array';
import sectionArray from './layout-section-array';

const { applyFilters } = wp.hooks;

/**
 * Returns the filtered list of Sections.
 *
 * @returns {array} Array of section objects.
 */
export const atomic_blocks_sections = () => {
	return applyFilters( 'atomic_blocks_layout_sections', sectionArray );
}

/**
 * Returns the filtered list of Layouts.
 *
 * @returns {array} Array of layout objects.
 */
export const atomic_blocks_layouts = () => {
	return applyFilters( 'atomic_blocks_layout_layouts', layoutArray );
}
