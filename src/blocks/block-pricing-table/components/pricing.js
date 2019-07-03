/**
 * Pricing Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Pricing wrapper Component
 */
export default class Pricing extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				columnsGap,
				align
			}
		} = this.props;

		const className = classnames([
			this.props.className,
			'ab-pricing-columns-' + columns
		], {
			[ 'align' + align ]: align
		});

		return (
			<div
				className={ className ? className : undefined }
			>
				{ this.props.children }
			</div>
		);
	}
}
