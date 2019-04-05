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
					marginTop: attributes.marginTop > 0 ? attributes.marginTop : null,
					marginBottom: attributes.marginBottom > 0 ? attributes.marginBottom : null,
					paddingTop: attributes.paddingTop > 0 ? attributes.paddingTop : null,
					paddingRight: attributes.paddingRight > 0 ? attributes.paddingRight : null,
					paddingBottom: attributes.paddingBottom > 0 ? attributes.paddingBottom : null,
					paddingLeft: attributes.paddingLeft > 0 ? attributes.paddingLeft : null,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}
