/**
 * Inspector Controls
 */

import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				spacerHeight,
				spacerDivider,
				spacerDividerStyle,
				spacerDividerColor,
				spacerDividerHeight,
			},
			setAttributes,
		} = this.props;

		// Button size values
		const spacerStyleOptions = [
			{
				value: 'ab-divider-solid',
				label: __( 'Solid', 'atomic-blocks' ),
			},
			{
				value: 'ab-divider-dashed',
				label: __( 'Dashed', 'atomic-blocks' ),
			},
			{
				value: 'ab-divider-dotted',
				label: __( 'Dotted', 'atomic-blocks' ),
			},
		];

		// Divider color
		const dividerColor = [
			{ color: '#ddd', name: 'white' },
			{ color: '#333', name: 'black' },
			{ color: '#3373dc', name: 'royal blue' },
			{ color: '#22d25f', name: 'green' },
			{ color: '#ffdd57', name: 'yellow' },
			{ color: '#ff3860', name: 'pink' },
			{ color: '#7941b6', name: 'purple' },
		];

		// Update color values
		const onChangeDividerColor = ( value ) =>
			setAttributes( { spacerDividerColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RenderSettingControl id="ab_spacer_spacerHeight">
						<RangeControl
							label={ __( 'Spacer Height', 'atomic-blocks' ) }
							value={ spacerHeight || '' }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									spacerHeight: value,
								} )
							}
							min={ 30 }
							max={ 600 }
						/>
					</RenderSettingControl>
					<RenderSettingControl id="ab_spacer_spacerDivider">
						<ToggleControl
							label={ __( 'Add Divider', 'atomic-blocks' ) }
							checked={ spacerDivider }
							onChange={ () =>
								this.props.setAttributes( {
									spacerDivider: ! spacerDivider,
								} )
							}
						/>
					</RenderSettingControl>
				</PanelBody>
				{ spacerDivider ? (
					<Fragment>
						<PanelBody>
							<RenderSettingControl id="ab_spacer_spacerDividerStyle">
								<SelectControl
									label={ __(
										'Divider Style',
										'atomic-blocks'
									) }
									value={ spacerDividerStyle }
									options={ spacerStyleOptions.map(
										( { value, label } ) => ( {
											value,
											label,
										} )
									) }
									onChange={ ( value ) => {
										this.props.setAttributes( {
											spacerDividerStyle: value,
										} );
									} }
								/>
							</RenderSettingControl>
							<RenderSettingControl id="ab_spacer_spacerDividerHeight">
								<RangeControl
									label={ __(
										'Divider Height',
										'atomic-blocks'
									) }
									value={ spacerDividerHeight || '' }
									onChange={ ( value ) =>
										this.props.setAttributes( {
											spacerDividerHeight: value,
										} )
									}
									min={ 1 }
									max={ 5 }
								/>
							</RenderSettingControl>
						</PanelBody>
						<RenderSettingControl id="ab_spacer_dividerColor">
							<PanelColorSettings
								title={ __( 'Divider Color', 'atomic-blocks' ) }
								initialOpen={ false }
								colorSettings={ [
									{
										colors: dividerColor,
										value: spacerDividerColor,
										onChange: onChangeDividerColor,
										label: __(
											'Divider Color',
											'atomic-blocks'
										),
									},
								] }
							></PanelColorSettings>
						</RenderSettingControl>
					</Fragment>
				) : null }
			</InspectorControls>
		);
	}
}
