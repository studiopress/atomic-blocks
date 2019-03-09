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
				columnsGap,
				align,
				layoutClass,
			}
		} = this.props;

		const className = classnames( [
			this.props.className,
			'ab-layout-columns-' + columns,
			layoutClass,
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
