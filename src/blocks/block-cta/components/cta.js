/**
 * CTA Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a CallToAction wrapper Component
 */
export default class CallToAction extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonShadowColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonTarget,
				ctaTitle,
				ctaText,
				ctaTitleFontSize,
				ctaTextFontSize,
				ctaWidth,
				ctaBackgroundColor,
				ctaTextColor,
                //V2 Attributes
                blockPadding,
                blockMargin,
			}
		} = this.props;

		return (
			<div
				style={ {
					backgroundColor: ctaBackgroundColor,
					textAlign: buttonAlignment,
					boxShadow: '2px 2px 0 0 ' + buttonShadowColor,
					borderColor: buttonBackgroundColor,
                    padding: blockPadding,
					margin: blockMargin,
				} }
				className={ classnames(
					this.props.className,
					`align${ctaWidth}`,
					'lsx-block-cta',
					'lsx-font-size-' + ctaTextFontSize,
				) }
			>{ this.props.children }</div>
		);
	}
}
