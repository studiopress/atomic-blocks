/**
 * Button Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class Spacer extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerWidth, spacerDividerHeight } = this.props.attributes;

		return (
			<div
				style={ {
					color: spacerDividerColor,
					width: spacerDividerWidth + '%',
				} }
				className={ classnames(
					this.props.className,
					'lsx-block-spacer',
					spacerDividerStyle,
					{ 'lsx-spacer-divider': spacerDivider },
					'lsx-divider-size-' + spacerDividerHeight,
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
