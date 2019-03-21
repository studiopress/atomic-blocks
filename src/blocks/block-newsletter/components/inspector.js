/**
 * Newsletter block inspector.
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
// @todo ContrastChecker
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, SelectControl, TextControl } = wp.components;

// Import padding component
import Padding from './../../../utils/inspector/padding';

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

				</PanelBody>

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

				<PanelBody
					title={ __( 'Padding Settings', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<Padding
						// Top padding
						paddingEnableTop={ true }
						paddingTop={ attributes.paddingTop }
						paddingTopMin="0"
						paddingTopMax="100"
						onChangePaddingTop={ paddingTop => setAttributes( { paddingTop } ) }
						// Right padding
						paddingEnableRight={ true }
						paddingRight={ attributes.paddingRight }
						paddingRightMin="0"
						paddingRightMax="100"
						onChangePaddingRight={ paddingRight => setAttributes( { paddingRight } ) }
						// Bottom padding
						paddingEnableBottom={ true }
						paddingBottom={ attributes.paddingBottom }
						paddingBottomMin="0"
						paddingBottomMax="100"
						onChangePaddingBottom={ paddingBottom => setAttributes( { paddingBottom } ) }
						// Left padding
						paddingEnableLeft={ true }
						paddingLeft={ attributes.paddingLeft }
						paddingLeftMin="0"
						paddingLeftMax="100"
						onChangePaddingLeft={ paddingLeft => setAttributes( { paddingLeft } ) }
					/>
				</PanelBody>

			</InspectorControls>

		)
	}
}
