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
		attributes: {
			buttonAlignment: {
				type: 'string',
				default: 'left',
			},
			buttonClass: {
				type: 'string',
				default: 'ab-button'
			},
			buttonText: {
				type: 'string',
				default: __( 'Subscribe', 'atomic-blocks' )
			},
			buttonBackgroundColor: {
				type: 'string',
				default: '#3373dc'
			},
			buttonShape: {
				type: 'string',
				default: 'ab-button-shape-rounded',
			},
			buttonSize: {
				type: 'string',
				default: 'ab-button-size-medium'
			},
			buttonTextColor: {
				type: 'string',
				default: '#fff',
			},
			emailInputLabel: {
				type: 'string',
				default: __( 'Your Email Address', 'atomic-blocks' ),
			},
			mailingList: {
				type: 'string',
			},
			mailingListProvider: {
				type: 'string',
				default: 'mailchimp',
			}
		},
		edit: props => {

			console.log(props);

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
				paddingTop: attributes.paddingTop ? attributes.paddingTop + 'px' : undefined,
				paddingRight: attributes.paddingRight ? attributes.paddingRight + 'px' : undefined,
				paddingBottom: attributes.paddingBottom ? attributes.paddingBottom + 'px' : undefined,
				paddingLeft: attributes.paddingLeft ? attributes.paddingLeft + 'px' : undefined,
			};



			return [
				<Inspector { ...{ setAttributes, ...props } }/>,
				! apiKeyDefined && (
					<div className="atomic-blocks-newsletter-notice">
						{ __( 'You must define your newsletter provider API keys to use this block.', 'atomic-blocks' ) }
					</div>
				),
				apiKeyDefined && isSelected && (
					<RichText
						tagName="span"
						keepPlaceholderOnFocus
						formattingControls={ [] }
						value={ attributes.emailInputLabel }
						onChange={ ( value ) => setAttributes( { emailInputLabel: value } ) }
					/>
				),
				apiKeyDefined && (
					<Fragment>
						<TextControl
							name="atomic-blocks-newsletter-email-address"
							label={ ! isSelected && ( attributes.emailInputLabel ) }
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
				)
			];
		},
		save: () => {
			return null;
		}
	},

);
