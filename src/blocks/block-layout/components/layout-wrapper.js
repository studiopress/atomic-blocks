/**
 * Layout column Wrapper.
 */

/**
 * Internal dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;

/**
 * Create a Layout wrapper Component.
 */
export default class Layout extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

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
