/**
 * Inspector Controls
 */

import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const {
			attributes: { columns, columnsGap },
		} = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RenderSettingControl id="ab_pricing_columns">
						<RangeControl
							label={ __( 'Pricing Columns', 'atomic-blocks' ) }
							value={ columns }
							onChange={ ( value ) =>
								this.props.setAttributes( { columns: value } )
							}
							min={ 1 }
							max={ 4 }
						/>
					</RenderSettingControl>
					<RenderSettingControl id="ab_pricing_columnsGap">
						<RangeControl
							label={ __(
								'Pricing Columns Gap',
								'atomic-blocks'
							) }
							value={ columnsGap }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									columnsGap: value,
								} )
							}
							min={ 0 }
							max={ 5 }
							step={ 1 }
						/>
					</RenderSettingControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}
