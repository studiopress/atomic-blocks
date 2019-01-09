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
		const { attributes: { columns }  } = this.props;

		return (
			<div
				className={ classnames(
					this.props.className,
					'ab-pricing-columns-' + columns,
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
