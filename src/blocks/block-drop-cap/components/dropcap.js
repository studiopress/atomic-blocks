/**
 * Testimonial Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a drop cap wrapper Component
 */
export default class DropCap extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div
				style={ {
					color: this.props.attributes.dropCapTextColor,
					textAlign: this.props.attributes.dropCapAlignment,
				} }
				className={ classnames(
					this.props.className,
					this.props.attributes.dropCapStyle,
					'ab-font-size-' + this.props.attributes.dropCapFontSize,
					'ab-block-drop-cap',
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
