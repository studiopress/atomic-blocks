/**
 * Layout column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Columns wrapper Component
 */
export default class Columns extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { attributes } = this.props;

		const className = classnames( [
			this.props.className,
			'ab-layout-columns-' + attributes.columns,
			attributes.layout,
		], {
			[ 'align' + attributes.align ]: attributes.align,
		} )

		return (
			<div
				className={ className ? className : undefined }
				style={ {
					marginTop: attributes.marginTop ? attributes.marginTop : null,
					marginBottom: attributes.marginBottom ? attributes.marginBottom : null,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}
