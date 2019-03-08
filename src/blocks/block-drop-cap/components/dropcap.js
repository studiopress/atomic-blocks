/**
 * Dropcap Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a drop cap wrapper Component
 */
export default class DropCap extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { dropCapAlignment, dropCapTextColor, dropCapFontSize, dropCapStyle } = this.props.attributes;

		return (
			<div
				style={ {
					color: dropCapTextColor,
					textAlign: dropCapAlignment,
				} }
				className={ classnames(
					this.props.className,
					dropCapStyle,
					'lsx-font-size-' + dropCapFontSize,
					'lsx-block-drop-cap',
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
