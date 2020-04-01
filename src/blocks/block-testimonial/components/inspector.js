/**
 * Inspector Controls
 */

import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		// Cite Alignment Options
		const citeAlignOptions = [
			{
				value: 'left-aligned',
				label: __( 'Left Aligned', 'atomic-blocks' ),
			},
			{
				value: 'right-aligned',
				label: __( 'Right Aligned', 'atomic-blocks' ),
			},
		];

		// Setup the attributes
		const {
			attributes: {
				testimonialBackgroundColor,
				testimonialTextColor,
				testimonialFontSize,
				testimonialCiteAlign,
			},
			setAttributes,
		} = this.props;

		// Update color values
		const onChangeBackgroundColor = ( value ) =>
			setAttributes( { testimonialBackgroundColor: value } );
		const onChangeTextColor = ( value ) =>
			setAttributes( { testimonialTextColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RenderSettingControl id="ab_testimonial_testimonialFontSize">
						<RangeControl
							label={ __( 'Font Size', 'atomic-blocks' ) }
							value={ testimonialFontSize }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									testimonialFontSize: value,
								} )
							}
							min={ 14 }
							max={ 24 }
							step={ 1 }
						/>
					</RenderSettingControl>
					<RenderSettingControl id="ab_testimonial_testimonialCiteAlign">
						<SelectControl
							label={ __( 'Cite Alignment', 'atomic-blocks' ) }
							description={ __(
								'Left or right align the cite name and title.',
								'atomic-blocks'
							) }
							options={ citeAlignOptions }
							value={ testimonialCiteAlign }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									testimonialCiteAlign: value,
								} )
							}
						/>
					</RenderSettingControl>
				</PanelBody>
				<RenderSettingControl id="ab_testimonial_testimonialBackgroundColor">
					<PanelColorSettings
						title={ __( 'Background Color', 'atomic-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: testimonialBackgroundColor,
								onChange: onChangeBackgroundColor,
								label: __(
									'Background Color',
									'atomic-blocks'
								),
							},
						] }
					></PanelColorSettings>
				</RenderSettingControl>

				<RenderSettingControl id="ab_testimonial_testimonialTextColor">
					<PanelColorSettings
						title={ __( 'Text Color', 'atomic-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: testimonialTextColor,
								onChange: onChangeTextColor,
								label: __( 'Text Color', 'atomic-blocks' ),
							},
						] }
					></PanelColorSettings>
				</RenderSettingControl>
			</InspectorControls>
		);
	}
}
