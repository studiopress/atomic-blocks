/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const { RangeControl, SelectControl, PanelBody } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const { dropCapFontSize, dropCapStyle } = this.props.attributes;

		// Drop cap style options
		const dropCapOptions = [
			{ value: 'ab-drop-cap-letter', label: __( 'Letter' ) },
			{ value: 'ab-drop-cap-square', label: __( 'Square' ) },
			{ value: 'ab-drop-cap-border', label: __( 'Border' ) },
		];

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RenderSettingControl id="ab_dropcap_dropCapFontSize">
						<RangeControl
							label={ __( 'Drop Cap Size' ) }
							value={ dropCapFontSize }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									dropCapFontSize: value,
								} )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>
					</RenderSettingControl>

					<RenderSettingControl id="ab_dropcap_dropCapStyle">
						<SelectControl
							label={ __( 'Drop Cap Style' ) }
							description={ __(
								'Choose the style of the drop cap in your paragraph.'
							) }
							options={ dropCapOptions }
							value={ dropCapStyle }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									dropCapStyle: value,
								} )
							}
						/>
					</RenderSettingControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}
