/**
 * Container wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class Container_1_4_23 extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { attributes: { containerBackgroundColor, containerAlignment, containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerWidth, containerMaxWidth }  } = this.props;

		const className = classnames([
			this.props.className,
			'ab-block-container'
		], {
			[ 'align' + containerWidth ]: containerWidth
		});

		return (
			<div
				style={ {
					backgroundColor: containerBackgroundColor,
					textAlign: containerAlignment,
					paddingLeft: `${containerPaddingLeft}%`,
					paddingRight: `${containerPaddingRight}%`,
					paddingBottom: `${containerPaddingBottom}%`,
					paddingTop: `${containerPaddingTop}%`,
					marginTop: `${containerMarginTop}%`,
					marginBottom: `${containerMarginBottom}%`
				} }
				className={ className ? className : undefined }
			>{ this.props.children }</div>
		);
	}
}
