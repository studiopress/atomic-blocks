/**
 * Newsletter block inspector.
 */

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;

const {
	InspectorControls,
	withColors,
	ContrastChecker,
	PanelColorSettings
} = wp.editor;

const { PanelBody,
	SelectControl,
	TextControl,
	FormToggle,
	withFallbackStyles
} = wp.components;

/**
 * Internal dependencies.
 */
import Padding from './../../../utils/components/padding';
import Margin from './../../../utils/components/margin';
import ButtonSettings from './../../../utils/inspector/button';

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor, buttonBackgroundColor, buttonTextColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackButtonBackgroundColor: buttonBackgroundColor || ! computedStyles ? undefined : computedStyles.buttonBackgroundColor,
		fallbackButtonTextColor: buttonTextColor || ! computedStyles ? undefined : computedStyles.buttonTextColor
	};
});

class Inspector extends Component {

	doubleOptInChange( event ) {
		if ( this.props.doubleOptIn ) {
			this.props.doubleOptIn( event.target.checked );
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor,
			textColor,
			fallbackTextColor,
			setTextColor,
			buttonBackgroundColor,
			fallbackButtonBackgroundColor,
			buttonTextColor,
			fallbackButtonTextColor,
			setButtonBackgroundColor,
			setButtonTextColor
		} = this.props;

		let mailingListProviders = {
			'mailchimp': {
				label: 'Mailchimp',
				value: 'mailchimp',
				lists: [
					{
						label: __( 'Select a list', 'atomic-blocks' ),
						value: ''
					}
				]
			}
		};

		atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp.lists.map( ( item ) =>
			mailingListProviders.mailchimp.lists.push({ label: item.name, value: item.id })
		);

		return (
			<InspectorControls>

				<PanelBody
					title={ __( 'Newsletter', 'atomic-blocks' ) }
					initialOpen={ attributes.mailingList ? false : true }
				>
					<SelectControl
						label={ __( 'Mailing List', 'atomic-blocks' ) }
						help={ __( 'The list people will be subscribed to.', 'atomic-blocks' ) }
						options={ mailingListProviders.mailchimp.lists }
						value={ attributes.mailingList }
						onChange={ ( value ) => setAttributes({ mailingList: value }) }
					/>

					<TextControl
						type="string"
						label={ __( 'Success Message', 'atomic-blocks' ) }
						help={ __( 'The message shown when people successfully subscribe.', 'atomic-blocks' ) }
						value={ attributes.successMessage }
						onChange={ ( value ) => setAttributes({ successMessage: value }) }
					/>

					<div className="ab-newsletter-double-opt-in-setting-wrapper">
						<FormToggle
							id={ 'double-opt-in-toggle-' + this.props.instanceId }
							className="ab-newsletter-double-opt-in-toggle"
							checked={ attributes.doubleOptIn }
							onChange={ ( event ) => setAttributes({ doubleOptIn: event.target.checked }) }
						/>
						<label
							className="ab-newsletter-double-opt-in-setting-label"
							htmlFor={ 'double-opt-in-toggle-' + this.props.instanceId }
						>
							{ __( 'Enable Double Opt-In', 'atomic-blocks' ) }
						</label>
						<p className="description">
							{ __( 'Send contacts an opt-in confirmation email when they subscribe to your list.', 'atomic-blocks' ) }
						</p>
					</div>

				</PanelBody>

				<PanelBody
					title={ __( 'General', 'atomic-blocks' ) }
					initialOpen={ attributes.mailingList ? true : false }
				>
					<Padding

						// Enable padding on all sides
						paddingEnable={ true }
						paddingTitle={ __( 'Block Padding', 'atomic-blocks' ) }
						paddingHelp={ __( 'Adjust the padding applied to the inside of the block.', 'atomic-blocks' ) }
						padding={ attributes.containerPadding }
						paddingMin="0"
						paddingMax="100"
						onChangePadding={ containerPadding => setAttributes({ containerPadding }) }
					/>

					<Margin

						// Enable margin top setting
						marginEnableTop={ true }
						marginTopLabel={ __( 'Block Margin Top', 'atomic-blocks' ) }
						marginTop={ attributes.containerMarginTop }
						marginTopMin="0"
						marginTopMax="200"
						onChangeMarginTop={ containerMarginTop => setAttributes({ containerMarginTop }) }

						// Enable margin bottom setting
						marginEnableBottom={ true }
						marginBottomLabel={ __( 'Block Margin Bottom', 'atomic-blocks' ) }
						marginBottom={ attributes.containerMarginBottom }
						marginBottomMin="0"
						marginBottomMax="200"
						onChangeMarginBottom={ containerMarginBottom => setAttributes({ containerMarginBottom }) }
					/>

					<ButtonSettings
						enableButtonTarget={ false }
						buttonSize={ attributes.buttonSize }
						onChangeButtonSize={ buttonSize => setAttributes({ buttonSize }) }
						buttonShape={ attributes.buttonShape }
						onChangeButtonShape={ buttonShape => setAttributes({ buttonShape }) }
						enableButtonBackgroundColor={ false }
						enableButtonTextColor={ false }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Block Background Color', 'atomic-blocks' )
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Block Text Color', 'atomic-blocks' )
						},
						{
							value: buttonBackgroundColor.color,
							onChange: setButtonBackgroundColor,
							label: __( 'Button Background Color', 'atomic-blocks' )
						},
						{
							value: buttonTextColor.color,
							onChange: setButtonTextColor,
							label: __( 'Button Text Color', 'atomic-blocks' )
						}
					] }
				>
					{ /* Compare block background and block text color */ }
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackTextColor,
							fallbackBackgroundColor
						} }
					/>
					{ /* Compare button background and button text color */ }
					<ContrastChecker
						{ ...{
							textColor: buttonTextColor.color,
							backgroundColor: buttonBackgroundColor.color,
							fallbackButtonTextColor,
							fallbackButtonBackgroundColor
						} }
					/>
					{ /* Compare block background button background color */ }
					<ContrastChecker
						{ ...{
							textColor: buttonBackgroundColor.color,
							backgroundColor: backgroundColor.color,
							fallbackButtonBackgroundColor,
							fallbackBackgroundColor
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}

export default compose([
	applyFallbackStyles,
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
		{ buttonBackgroundColor: 'background-color' },
		{ buttonTextColor: 'color' },
	)
])( Inspector );
