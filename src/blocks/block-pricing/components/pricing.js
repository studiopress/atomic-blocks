/**
 * Pricing Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import * as fontSize from './../../../utils/helper';

/**
 * Create a Pricing wrapper Component
 */
export default class Pricing extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { attributes: { testimonialAlignment, testimonialImgURL, testimonialBackgroundColor, testimonialTextColor, testimonialFontSize, testimonialCiteAlign }  } = this.props;

		return (
			<div
				className={ classnames(
					this.props.className,
					'ab-block-pricing-tables'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
