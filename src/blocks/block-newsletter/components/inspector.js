/**
 * Newsletter block inspector.
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
// @todo ContrastChecker
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;

// Import padding component
import Padding from './../../../utils/inspector/padding';

// Import background color component
import BackgroundColor from './../../../utils/inspector/background-color';

export default class Inspector extends Component {

	render() {

		const {
			attributes,
			setAttributes,
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

				<BackgroundColor
					panelTitle={ __( 'Background Color Settings', 'atomic-blocks' ) }
					backgroundColor={ attributes.formBackgroundColor }
					onChangeBackgroundColor={ formBackgroundColor => setAttributes( { formBackgroundColor } ) }
				/>

				<PanelColorSettings
					title={ __( 'Button Color Settings', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.buttonBackgroundColor,
							onChange: ( value ) => { setAttributes( { buttonBackgroundColor: value } ) },
							label: __( 'Background Color', 'atomic-blocks' )
						},
						{
							value: attributes.buttonTextColor,
							onChange: ( value ) => { setAttributes( { buttonTextColor: value } ) },
							label: __( 'Text Color', 'atomic-blocks' )
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>

		)
	}
}
