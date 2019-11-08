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
		 * A filter for determing whether or not a setting should be rendered.
		 *
		 * @param Boolean Whether or not the setting control should be rendered. Default true.
		 * @param String The setting control's ID.
		 * @param Object The current user's data.
		 */
		if ( applyFilters( 'ab_should_render_block_setting', true, this.props.id, getCurrentUserData() ) ) {
			return this.props.children;
		}

		return null;
	}
}
