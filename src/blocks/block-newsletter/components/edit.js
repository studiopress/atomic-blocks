/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import NewsletterContainer from './newsletter';
import CustomButton from './../../block-button/components/button';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose, withInstanceId } = wp.compose;
const { getColorClassName, RichText, withColors } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { TextControl, withFallbackStyles } = wp.components;

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const {
		backgroundColor,
		textColor,
		buttonBackgroundColor,
	} = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode
		? getComputedStyle( editableNode )
		: null;
	return {
		fallbackBackgroundColor:
			backgroundColor || ! computedStyles
				? undefined
				: computedStyles.backgroundColor,
		fallbackTextColor:
			textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackButtonBackgroundColor:
			buttonBackgroundColor || ! computedStyles
				? undefined
				: computedStyles.buttonBackgroundColor,
	};
} );

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.props.setAttributes( { instanceId: this.props.instanceId } );
	}

	render() {
		const {
			attributes,
			isSelected,
			setAttributes,
			buttonBackgroundColor,
			buttonTextColor,
		} = this.props;

		const apiKeyDefined =
			atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp
				.api_key_defined;

		/* Setup button background color class */
		let buttonBackgroundColorClass;

		if ( attributes.customButtonBackgroundColor ) {
			buttonBackgroundColorClass = 'ab-has-custom-background-color';
		} else {
			buttonBackgroundColorClass = attributes.buttonBackgroundColor
				? 'has-' +
				  attributes.buttonBackgroundColor +
				  '-background-color'
				: null;
		}

		/* Setup button text color class */
		let buttonTextColorClass;

		if ( attributes.customButtonTextColor ) {
			buttonTextColorClass = 'ab-has-custom-text-color';
		} else {
			buttonTextColorClass = attributes.buttonTextColor
				? 'has-' + attributes.buttonTextColor + '-color'
				: null;
		}

		return [
			<Inspector key={ 'ab-newsletter-inspector-' + this.props.clientId } { ...{ setAttributes, ...this.props } } />,
			<NewsletterContainer key={ 'ab-newsletter-container-' + this.props.clientId } { ...this.props }>
				{ ! apiKeyDefined && (
					<Fragment>
						<div className="ab-newsletter-notice">
							{ __(
								'You must define your newsletter provider API keys to use this block.',
								'atomic-blocks'
							) }
							<p>
								<a
									href={
										atomic_blocks_newsletter_block_vars.plugin_settings_page_url
									}
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __(
										'Configure your settings',
										'atomic-blocks'
									) }
								</a>
							</p>
						</div>
					</Fragment>
				) }
				{ apiKeyDefined && (
					<Fragment>
						<RichText
							tagName="span"
							className="ab-block-newsletter-label"
							keepPlaceholderOnFocus
							allowedFormats={ [] }
							value={ attributes.emailInputLabel }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									emailInputLabel: value,
								} )
							}
						/>

						<TextControl name="ab-newsletter-email-address" />

						<div className={ classnames( 'ab-block-button' ) }>
							<CustomButton { ...this.props }>
								<RichText
									tagName="span"
									placeholder={ __(
										'Button text...',
										'atomic-blocks'
									) }
									keepPlaceholderOnFocus
									value={ attributes.buttonText }
									allowedFormats={ [] }
									className={ classnames(
										'ab-button',
										attributes.buttonClass,
										attributes.buttonShape,
										attributes.buttonSize,
										buttonBackgroundColorClass,
										buttonTextColorClass,
										{
											'has-background':
												attributes.buttonBackgroundColor ||
												attributes.customButtonBackgroundColor,
											'has-text-color':
												attributes.buttonTextColor ||
												attributes.customButtonTextColor,
										}
									) }
									style={ {
										backgroundColor:
											buttonBackgroundColor.color,
										color: buttonTextColor.color,
									} }
									onChange={ ( value ) =>
										this.props.setAttributes( {
											buttonText: value,
										} )
									}
								/>
							</CustomButton>
							{ isSelected && (
								<form
									key="form-link"
									className={ `blocks-button__inline-link ab-button-${ attributes.buttonAlignment }` }
									onSubmit={ ( event ) =>
										event.preventDefault()
									}
									style={ {
										textAlign: attributes.buttonAlignment,
									} }
								></form>
							) }
						</div>
					</Fragment>
				) }
			</NewsletterContainer>,
		];
	}
}

export default compose( [
	applyFallbackStyles,
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
		{ buttonBackgroundColor: 'background-color' },
		{ buttonTextColor: 'color' }
	),
] )( withInstanceId( Edit ) );
