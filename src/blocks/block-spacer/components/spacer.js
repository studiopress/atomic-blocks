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
		const { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight } = this.props.attributes;

		return (
			<div
				style={ {
					color: spacerDividerColor
				} }
				className={ classnames(
					this.props.className,
					'ab-block-spacer',
					spacerDividerStyle,
					{ 'ab-spacer-divider': spacerDivider },
					'ab-divider-size-' + spacerDividerHeight,
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
