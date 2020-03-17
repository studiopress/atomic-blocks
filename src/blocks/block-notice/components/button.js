/**
 * Notice Box Dismiss Button
 */

// Setup the block
const { Component } = wp.element;

/**
 * Create a button wrapper Component
 */
export default class DismissButton extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const {
			attributes: { noticeTitleColor },
		} = this.props;

		return (
			<div
				className="ab-notice-dismiss"
				style={ {
					fill: noticeTitleColor,
					color: noticeTitleColor,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}
