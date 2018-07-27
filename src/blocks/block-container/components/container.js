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
export default class Container extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const { attributes: { containerBackgroundColor, containerAlignment, containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerWidth, containerMaxWidth }  } = this.props;

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
					marginBottom: `${containerMarginBottom}%`,
				} }
				className={ classnames(
					this.props.className,
					`align${containerWidth}`,
					'ab-block-container',
				) }
			>{ this.props.children }</div>
		);
	}
}
