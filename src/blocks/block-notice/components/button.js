/**
 * Notice Box Dismiss Button
 */

// Setup the block
const { Component } = wp.element;

// Register components
const {
	Button
} = wp.components;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Testimonial wrapper Component
 */
export default class DismissButton extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<Button 
				className="block-notice-dismiss" 
				style={ {
					fill: this.props.attributes.blockTitleColor,
					color: this.props.attributes.blockTitleColor,
				} }>
				{ this.props.children }
			</Button>
		);
	}
}
