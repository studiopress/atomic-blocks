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
			attributes,
			backgroundColor,
			textColor,
		} = this.props;

		// Retreive the getColorClassName
		const backgroundColorClass = getColorClassName( 'background-color', attributes.backgroundColor );
		const textColorClass = getColorClassName( 'color', attributes.textColor );

		return (
			<div
				style={ {
					backgroundColor: backgroundColor.color,
					padding: attributes.containerPadding ? attributes.containerPadding : undefined,
					color: textColor.color,
				} }
				className={ classnames( [
					this.props.className,
				], {
					'ab-block-newsletter': true,
					'ab-form-styles': true,
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
