/**
 * Newsletter Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class NewsletterContainer extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes
		} = this.props;

		return (
			<div
				style={ {
					paddingTop: attributes.paddingTop ? attributes.paddingTop : undefined,
					paddingRight: attributes.paddingRight ? attributes.paddingRight : undefined,
					paddingBottom: attributes.paddingBottom ? attributes.paddingBottom : undefined,
					paddingLeft: attributes.paddingLeft ? attributes.paddingLeft : undefined,
				} }
				className={ classnames(
					this.props.className,
					'ab-block-newsletter'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
