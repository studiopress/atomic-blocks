/**
 * Layout column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Layout wrapper Component
 */
export default class Layout extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				align,
				layout,
			}
		} = this.props;

		const className = classnames( [
			this.props.className,
			'ab-layout-columns-' + columns,
			layout,
		], {
			[ 'align' + align ]: align,
		} )

		return (
			<div
				className={ className ? className : undefined }
			>
				{ this.props.children }
			</div>
		);
	}
}
