/**
 * Newsletter block inspector.
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
// @todo ContrastChecker
const {
	InspectorControls,
	PanelColorSettings,
	withColors,
	ContrastChecker
} = wp.editor;

const { PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	withFallbackStyles
} = wp.components;

/* Import padding component. */
import Padding from './../../../utils/inspector/padding';

/* Import color component. */
import BackgroundColor from './../../../utils/inspector/background-color';

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
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

					<ToggleControl
                        label={ __( 'Display Newsletter Title', 'atomic-blocks' ) }
                        checked={ attributes.newsletterTitleToggle }
						onChange={ () => this.props.setAttributes( { newsletterTitleToggle: ! attributes.newsletterTitleToggle } ) }
                    />

					<ToggleControl
                        label={ __( 'Display Newsletter Text', 'atomic-blocks' ) }
                        checked={ attributes.newsletterTextToggle }
						onChange={ () => this.props.setAttributes( { newsletterTextToggle: ! attributes.newsletterTextToggle } ) }
                    />
				</PanelBody>

				<PanelBody
					title={ __( 'Padding Settings', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<Padding
						// Enable padding on all sides
						paddingEnable={ true }
						padding={ attributes.padding }
						paddingMin="0"
						paddingMax="100"
						onChangePadding={ padding => setAttributes( { padding } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Color Settings', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<BackgroundColor
						/* Block background color settings. */
						title={ __( 'Block Background Color', 'atomic-blocks' ) }
						initialOpen={ false }
						/* Background color. */
						backgroundTitle={ __( 'Background Color', 'atomic-blocks' ) }
						backgroundColor={ backgroundColor.color }
						fallbackBackgroundColor={ fallbackBackgroundColor }
						onChangeBackgroundColor={ setBackgroundColor }
						/* Text color. */
						colorTitle={ __( 'Text Color', 'atomic-blocks' ) }
						textColor={ textColor.color }
						fallbackTextColor={ fallbackTextColor }
						onChangeTextColor={ setTextColor }
					>
					</BackgroundColor>

					<BackgroundColor
						/* Button color settings. */
						title={ __( 'Button Color', 'atomic-blocks' ) }
						initialOpen={ false }
						/* Button background color. */
						backgroundTitle={ __( 'Button Background Color', 'atomic-blocks' ) }
						backgroundColor={ attributes.buttonBackgroundColor }
						fallbackBackgroundColor={ fallbackBackgroundColor }
						onChangeBackgroundColor={ buttonBackgroundColor => setAttributes( { buttonBackgroundColor } ) }
						/* Text color. */
						colorTitle={ __( 'Button Text Color', 'atomic-blocks' ) }
						textColor={ attributes.buttonTextColor }
						fallbackTextColor={ fallbackTextColor }
						onChangeTextColor={ buttonTextColor => setAttributes( { buttonTextColor } ) }
					>
					</BackgroundColor>
				</PanelBody>
			</InspectorControls>

		)
	}
}

export default compose( [
	applyFallbackStyles,
	withColors( 'backgroundColor', {
		textColor: 'color',
	} ),
] )( Inspector );
