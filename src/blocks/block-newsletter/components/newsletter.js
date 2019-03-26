/**
 * Newsletter Wrapper
 */

// Setup the block
const { Component } = wp.element;

const {
	getColorClassName,
} = wp.editor;

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

		// Retreive the getColorClassName
		const backgroundColorClass = getColorClassName( 'background-color', attributes.backgroundColor );
		const textColorClass = getColorClassName( 'color', attributes.textColor );

		return (
			<div
				style={ {
					backgroundColor: backgroundColorClass ? undefined : attributes.customBackgroundColor,
					padding: attributes.containerPadding ? attributes.containerPadding : undefined,
					color: textColorClass ? undefined : attributes.customTextColor,
				} }
				className={ classnames( [
					this.props.className,
				], {
					'ab-block-newsletter': true,
					'has-background': attributes.backgroundColor || attributes.customBackgroundColor,
					[ backgroundColorClass ]: backgroundColorClass,
					[ textColorClass ]: textColorClass,
				} )
				}
			>
				{ this.props.children }
			</div>
		);
	}
}
