/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { BlockControls, RichText } = wp.editor;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import CustomButton from './../block-button/components/button';
import NewsletterContainer from './components/newsletter';
import './styles/style.scss';
import './styles/editor.scss';

registerBlockType(
	'atomic-blocks/newsletter',
	{
		title: __( 'Email newsletter', 'atomic-blocks' ),
		description: __( 'Add an email newsletter sign-up form.', 'atomic-blocks' ),
		category: 'atomic-blocks',
		icon: 'email-alt',
		keywords: [
			__( 'Mailchimp', 'atomic-blocks' ),
			__( 'Subscribe', 'atomic-blocks' ),
		],
		edit: props => {

			const {
				attributes,
				isSelected,
				setAttributes
			} = props;

			const apiKeyDefined = atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp.api_key_defined;

			const editClassName = classnames( {
				'ab-block-button': true,
			} );

			const editStyles = {
				backgroundColor: attributes.backgroundColor,
			};

			return [
				<Inspector { ...{ setAttributes, ...props } }/>,
				<NewsletterContainer { ...props }>
					{ attributes.newsletterTitleToggle && (
						<RichText
							placeholder={ __( 'Add a title', 'atomic-blocks' ) }
							tagName="h2"
							className="ab-newsletter-title"
							keepPlaceholderOnFocus
							formattingControls={ [] }
							value={ attributes.newsletterTitle }
							onChange={ ( value ) => setAttributes( { newsletterTitle: value } ) }
						/>
					) }
					{ attributes.newsletterTextToggle && (
						<RichText
							placeholder={ __( 'Add some text to describe your form', 'atomic-blocks' ) }
							tagName="div"
							className="ab-newsletter-text"
							multiline="p"
							keepPlaceholderOnFocus
							formattingControls={ [] }
							value={ attributes.newsletterText }
							onChange={ ( value ) => setAttributes( { newsletterText: value } ) }
						/>
					) }
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
								onChange={ ( value ) => setAttributes( { emailInputLabel: value } ) }
							/>

							<TextControl
								name="ab-newsletter-email-address"
							/>

							<div
								className={ editClassName ? editClassName : undefined }
								style={ editStyles }
							>
								<CustomButton { ...props }>
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
										) }
										style={ {
											color: attributes.buttonTextColor,
											backgroundColor: attributes.buttonBackgroundColor,
										} }
										onChange={ (value) => setAttributes( { buttonText: value } ) }
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
		},
		save: () => {
			return null;
		}
	},

);
