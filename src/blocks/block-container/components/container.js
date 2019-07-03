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

		const styles = {
			backgroundColor: containerBackgroundColor ? containerBackgroundColor : undefined,
			textAlign: containerAlignment ? containerAlignment : undefined,
			paddingLeft: containerPaddingLeft ? `${containerPaddingLeft}%` : undefined,
			paddingRight: containerPaddingRight ? `${containerPaddingRight}%` : undefined,
			paddingBottom: containerPaddingBottom ? `${containerPaddingBottom}%` : undefined,
			paddingTop: containerPaddingTop ? `${containerPaddingTop}%` : undefined,
			marginTop: containerMarginTop ? `${containerMarginTop}%` : undefined,
			marginBottom: containerMarginBottom ? `${containerMarginBottom}%` : undefined
		};

		const className = classnames([
			this.props.className,
			'ab-block-container'
		], {
			[ 'align' + containerWidth ]: containerWidth
		});

		return (
			<div
				style={ styles }
				className={ className ? className : undefined }
			>{ this.props.children }</div>
		);
	}
}
