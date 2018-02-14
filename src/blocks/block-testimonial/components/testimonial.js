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
export default class Testimonial extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div 
				style={ {
					backgroundColor: this.props.attributes.blockBackgroundColor,
					color: this.props.attributes.blockTextColor
				} }
				className={ classnames(
					this.props.className,
					this.props.attributes.citeAlign,
					{ 'has-avatar': this.props.attributes.imgURL },
					'block-testimonial'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
