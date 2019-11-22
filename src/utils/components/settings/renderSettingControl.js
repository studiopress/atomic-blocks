const { Component } = wp.element;
const { applyFilters } = wp.hooks;

import getCurrentUserData from './../data-providers/currentUserData';

/**
 * A wrapper that contains user data for making decisions when rendering block setting controls.
 */
export default class RenderSettingControl extends Component {
	constructor( props ) {
		super( props );
	}

	render() {

		/**
		 * Let the temporary hacks begin.
		 * Get the block name this setting is associated with.
		 */
		let fallback = false;

		if ( typeof this.props.children === 'undefined' || typeof this.props.children.props === 'undefined' || typeof this.props.children.props.name === 'undefined' ) {
			fallback = true;
		}

		let blockName = fallback ? this.props.children._owner.memoizedProps.name : this.props.children.props.name;

		/**
		 * A filter for determining whether or not a setting should be rendered.
		 *
		 * @param {boolean} Whether or not the setting control should be rendered. Default true.
		 * @param {string} The block name.
		 * @param {string} The setting control's ID.
		 * @param {object} The current user's data.
		 */
		if ( applyFilters( 'ab_should_render_block_setting', true, blockName, this.props.id, getCurrentUserData() ) ) {
			return this.props.children;
		}

		return null;
	}
}
