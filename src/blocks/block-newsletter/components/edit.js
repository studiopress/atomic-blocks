/**
 * External dependencies
 */
import classnames from 'classnames';
import Inspector from './inspector';
import NewsletterContainer from './newsletter';
import CustomButton from './../../block-button/components/button';
const { compose } = wp.compose;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	getColorClassName,
	RichText,
	withColors
} = wp.editor;
const {
	Fragment,
	Component
} = wp.element;
const {
	TextControl,
	withFallbackStyles
} = wp.components;

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor, buttonBackgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackButtonBackgroundColor: buttonBackgroundColor || ! computedStyles ? undefined : computedStyles.buttonBackgroundColor,
	};
} );

class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			isSelected,
			setAttributes,
			buttonBackgroundColor,
			buttonTextColor,
		} = this.props;

		const apiKeyDefined = atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp.api_key_defined;

		const getButtonTextClass       = getColorClassName( 'color', attributes.buttonTextColor );
		const getButtonBackgroundClass = getColorClassName( 'background-color', attributes.buttonBackgroundColor );

		return [
			<Inspector { ...{ setAttributes, ...this.props } }/>,
			<NewsletterContainer { ...this.props }>
				{ ! apiKeyDefined && (
					<Fragment>
						<div className="ab-newsletter-notice">
							{ __( 'You must define your newsletter provider API keys to use this block.', 'atomic-blocks' ) }
							<p><a href={ atomic_blocks_newsletter_block_vars.plugin_settings_page_url }>{ __( 'Configure your settings', 'atomic-blocks' ) }</a></p>
						</div>
					</Fragment>
				) }
				{ apiKeyDefined && (
					<Fragment>
						<RichText
							tagName="span"
							className="ab-block-newsletter-label"
							keepPlaceholderOnFocus
							formattingControls={ [] }
							value={ attributes.emailInputLabel }
							onChange={ ( value ) => this.props.setAttributes( { emailInputLabel: value } ) }
						/>

						<TextControl
							name="ab-newsletter-email-address"
						/>

						<div
							className={ classnames(
								'ab-block-button',
							) }
						>
							<CustomButton { ...this.props }>
								<RichText
									tagName="span"
									placeholder={ __( 'Button text...', 'atomic-blocks' ) }
									keepPlaceholderOnFocus
									value={ attributes.buttonText }
									formattingControls={ [] }
									className={ classnames(
										'ab-button',
										attributes.buttonClass,
										attributes.buttonShape,
										attributes.buttonSize,
										getButtonBackgroundClass,
										getButtonTextClass,
										{
											'has-background': attributes.buttonBackgroundColor || attributes.customButtonBackgroundColor,
											'has-text-color': attributes.buttonTextColor || attributes.customButtonTextColor,
										}
									) }
									style={ {
										backgroundColor: buttonBackgroundColor.color,
										color: buttonTextColor.color,
									} }
									onChange={ (value) => this.props.setAttributes( { buttonText: value } ) }
								/>
							</CustomButton>
							{ isSelected && (
								<form
									key="form-link"
									className={ `blocks-button__inline-link ab-button-${attributes.buttonAlignment}`}
									onSubmit={ event => event.preventDefault() }
									style={ {
										textAlign: attributes.buttonAlignment,
									} }
								>
								</form>
							) }
						</div>
					</Fragment>
				) }
			</NewsletterContainer>
		];
	}
}

export default compose( [
	applyFallbackStyles,
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
		{ buttonBackgroundColor: 'background-color' },
		{ buttonTextColor: 'color' },
	),
] )( Edit );
