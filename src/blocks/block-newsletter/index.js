/**
 * External dependencies
 */
import classnames from 'classnames';
import * as colorClassSlug from './../../components/color-class';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { getColorClassName, RichText } = wp.editor;
const { Fragment, Component } = wp.element;
const { TextControl } = wp.components;

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import CustomButton from './../block-button/components/button';
import NewsletterContainer from './components/newsletter';
import './styles/style.scss';
import './styles/editor.scss';

class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const apiKeyDefined = atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp.api_key_defined;

		const editClassName = classnames( {
			'ab-block-button': true,
		} );

		const editStyles = {
			backgroundColor: attributes.backgroundColor,
		};

		// const getButtonBackgroundClass = colorClassSlug.getColorClass( attributes.buttonBackgroundColor );
		// const getButtonTextClass = colorClassSlug.getColorClass( attributes.buttonTextColor );
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
							className={ editClassName ? editClassName : undefined }
							style={ editStyles }
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
											'has-background': attributes.buttonBackgroundColor || attributes.buttonBackgroundColorCustom,
											'has-text-color': attributes.buttonTextColor || attributes.buttonTextColorCustom,
										}
									) }
									style={ {
										backgroundColor: attributes.buttonBackgroundColor,
										color: attributes.buttonTextColor,
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
		edit: Edit,
		save: () => {
			return null;
		}
	},

);
