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
} = wp.editor;

const { PanelBody,
	SelectControl,
	TextControl,
	withFallbackStyles
} = wp.components;

/**
 * Internal dependencies.
 */
import Padding from './../../../utils/inspector/padding';
import BackgroundColor from './../../../utils/inspector/background-color';
import ButtonSettings from './../../../utils/inspector/button';

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

class Inspector extends Component {

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
			buttonTextColor,
			setButtonBackgroundColor,
			setButtonTextColor,
		} = this.props;

		let mailingListProviders = {
			'mailchimp': {
				label: 'Mailchimp',
				value: 'mailchimp',
				lists: [],
			},
		};

		atomic_blocks_newsletter_block_vars.mailingListProviders.mailchimp.lists.map( ( item ) =>
			mailingListProviders.mailchimp.lists.push( { label: item.name, value: item.id } )
		);

		return (
			<InspectorControls>

				<PanelBody
					title={ __( 'Newsletter Settings', 'atomic-blocks' ) }
				>
					<SelectControl
						label={ __( 'Mailing List', 'atomic-blocks' ) }
						help={ __( 'The list people will be subscribed to.', 'atomic-blocks' ) }
						options={ mailingListProviders.mailchimp.lists }
						value={ attributes.mailingList }
						onChange={ ( value ) => setAttributes( { mailingList: value } ) }
					/>

					<TextControl
						type="string"
						label={ __( 'Success Message', 'atomic-blocks' ) }
						help={ __( 'The message shown when people successfully subscribe.', 'atomic-blocks' ) }
						value={ attributes.successMessage }
						onChange={ ( value ) => setAttributes( { successMessage: value } ) }
					/>
				</PanelBody>

				<BackgroundColor
					/* Block background color settings. */
					title={ __( 'Block Color Settings', 'atomic-blocks' ) }
					initialOpen={ false }
					/* Background color. */
					backgroundTitle={ __( 'Newsletter Background Color', 'atomic-blocks' ) }
					backgroundColor={ backgroundColor.color }
					fallbackBackgroundColor={ fallbackBackgroundColor }
					onChangeBackgroundColor={ setBackgroundColor }
					/* Text color. */
					colorTitle={ __( 'Newsletter Text Color', 'atomic-blocks' ) }
					textColor={ textColor.color }
					fallbackTextColor={ fallbackTextColor }
					onChangeTextColor={ setTextColor }
				>
				</BackgroundColor>

				<PanelBody
					title={ __( 'Padding Settings', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<Padding
						// Enable padding on all sides
						paddingEnable={ true }
						padding={ attributes.containerPadding }
						paddingMin="0"
						paddingMax="100"
						onChangePadding={ containerPadding => setAttributes( { containerPadding } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Button Settings', 'atomic-blocks' ) }
					initialOpen={ false }
					className={ "ab-nested-panel" }
				>
					<ButtonSettings
						enableButtonTarget={ false }
						buttonSize={ attributes.buttonSize }
						onChangeButtonSize={ buttonSize => setAttributes( { buttonSize } ) }
						buttonShape={ attributes.buttonShape }
						onChangeButtonShape={ buttonShape => setAttributes( { buttonShape } ) }
						enableButtonBackgroundColor={ false }
						enableButtonTextColor={ false }
					/>

					<BackgroundColor
						/* Button color settings. */
						title={ __( 'Button Color', 'atomic-blocks' ) }
						initialOpen={ false }
						/* Button background color. */
						backgroundTitle={ __( 'Button Background Color', 'atomic-blocks' ) }
						backgroundColor={ buttonBackgroundColor.color }
						fallbackBackgroundColor={ fallbackBackgroundColor }
						onChangeBackgroundColor={ setButtonBackgroundColor }
						/* Text color. */
						colorTitle={ __( 'Button Text Color', 'atomic-blocks' ) }
						textColor={ buttonTextColor.color }
						fallbackTextColor={ fallbackTextColor }
						onChangeTextColor={ setButtonTextColor }
					>
					</BackgroundColor>
				</PanelBody>
			</InspectorControls>
		)
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
] )( Inspector );
