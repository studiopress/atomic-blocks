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
					backgroundColor: attributes.formBackgroundColor ? attributes.formBackgroundColor : undefined,
					padding: attributes.padding ? attributes.padding : undefined,
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
