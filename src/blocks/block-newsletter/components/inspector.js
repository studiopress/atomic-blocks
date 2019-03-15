/**
 * Newsletter block inspector.
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
// @todo ContrastChecker
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, SelectControl } = wp.components;

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

		console.log(mailingListProviders);

		return (
			<InspectorControls>

				<PanelBody
					title={ __( 'Mailing List', 'atomic-blocks' ) }
				>
					<SelectControl
						label={ __( 'Mailing List', 'atomic-blocks' ) }
						help={ __( 'The list people will be subscribed to.' ) }
						options={ mailingListProviders.mailchimp.lists }
						value={ attributes.mailingList }
						onChange={ ( value ) => setAttributes( { mailingList: value } ) }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Button Color Settings', 'atomic-blocks' ) }
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
