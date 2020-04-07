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
export default class CallToAction_1_5_2 extends Component {
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

		const className = classnames(
			[ this.props.className, 'ab-block-cta' ],
			{
				[ 'ab-font-size-' + ctaTextFontSize ]: ctaTextFontSize,
				[ 'align' + ctaWidth ]: ctaWidth,
			}
		);

		const styles = {
			backgroundColor: ctaBackgroundColor
				? ctaBackgroundColor
				: undefined,
			textAlign: buttonAlignment ? buttonAlignment : undefined,
		};

		return (
			<div
				style={ styles }
				className={ className ? className : undefined }
			>
				{ this.props.children }
			</div>
		);
	}
}
