/**
 * Inspector Controls.
 */

/**
 * Internal dependencies.
 */
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

/**
 * Setup the block.
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Import block dependencies.
 */
const { InspectorControls } = wp.blockEditor;

/**
 * Import Inspector components.
 */
const { PanelBody, RangeControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component.
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RenderSettingControl id="ab_accordion_accordionFontSize">
						<RangeControl
							label={ __( 'Title Font Size', 'atomic-blocks' ) }
							value={ this.props.attributes.accordionFontSize }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									accordionFontSize: value,
								} )
							}
							min={ 14 }
							max={ 24 }
							step={ 1 }
						/>
					</RenderSettingControl>

					<RenderSettingControl id="ab_accordion_accordionOpen">
						<ToggleControl
							label={ __( 'Open by default', 'atomic-blocks' ) }
							checked={ this.props.attributes.accordionOpen }
							onChange={ () =>
								this.props.setAttributes( {
									accordionOpen: ! this.props.attributes
										.accordionOpen,
								} )
							}
						/>
					</RenderSettingControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}
