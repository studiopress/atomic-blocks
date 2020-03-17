/**
 * Sharing Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a ShareLinks wrapper Component
 */
export default class ShareLinks extends Component {
	render() {
		return (
			<div
				className={ classnames(
					this.props.className,
					this.props.attributes.shareButtonStyle,
					this.props.attributes.shareButtonShape,
					this.props.attributes.shareButtonSize,
					this.props.attributes.shareButtonColor,
					this.props.attributes.shareAlignment
						? 'ab-align-' + this.props.attributes.shareAlignment
						: undefined,
					'ab-block-sharing'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
