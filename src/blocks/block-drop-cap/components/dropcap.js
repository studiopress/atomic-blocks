/**
 * Testimonial Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Testimonial wrapper Component
 */
export default class DropCap extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div
				style={ {
					color: this.props.attributes.blockTextColor
				} }
				className={ classnames(
					this.props.className,
					this.props.attributes.dropCapStyle,
					'block-drop-cap',
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
