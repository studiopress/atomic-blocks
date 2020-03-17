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
export default class CallToAction_1_4_21 extends Component {
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
			},
		} = this.props;

		return (
			<div
				style={ {
					backgroundColor: ctaBackgroundColor,
					textAlign: buttonAlignment,
				} }
				className={ classnames(
					this.props.className,
					`align${ ctaWidth }`,
					'ab-block-cta',
					'ab-font-size-' + ctaTextFontSize
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
