/**
 * Internal dependencies
 */
import Device from './device';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Save extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			/* Save the block markup for the front end */
			<Device { ...this.props }></Device>
		);
	}
}
