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

		/* Setup the margin styles */
		let marginValue;

		if ( attributes.marginSync ) {
			marginValue = {
				marginTop: attributes.margin > 0 ? attributes.margin : null,
				marginBottom: attributes.margin > 0 ? attributes.margin : null
			}
		} else {
			marginValue = {
				marginTop: attributes.marginTop > 0 ? attributes.marginTop : null,
				marginBottom: attributes.marginBottom > 0 ? attributes.marginBottom : null,
			}
		}

		/* Setup the padding styles */
		let paddingValue;

		if ( attributes.paddingSync ) {
			paddingValue = {
				padding: attributes.padding > 0 ? attributes.padding : null,
			}
		} else {
			paddingValue = {
				paddingTop: attributes.paddingTop > 0 ? attributes.paddingTop : null,
				paddingRight: attributes.paddingRight > 0 ? attributes.paddingRight : null,
				paddingBottom: attributes.paddingBottom > 0 ? attributes.paddingBottom : null,
				paddingLeft: attributes.paddingLeft > 0 ? attributes.paddingLeft : null,
			}
		}

		return (
			<div
				className={ className ? className : undefined }
				style={ Object.assign( marginValue, paddingValue ) }
			>
				{ this.props.children }
			</div>
		);
	}
}
