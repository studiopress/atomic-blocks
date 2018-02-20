/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
} = wp.blocks;

// Import Inspector components
const {
  Toolbar,
  Button,
  PanelBody,
  PanelRow,
  PanelColor,
  FormToggle,
} = wp.components;

// Import Inspector controls
const { 
	RangeControl, 
	SelectControl 
} = InspectorControls;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
		<InspectorControls key="inspector">

			<RangeControl
				label={ __( 'Font Size' ) }
				value={ this.props.attributes.fontSize }
				onChange={ this.props.setFontRatio }
				min={ 1 }
				max={ 6 }
				step={ 1 }
			/>

			<SelectControl
				label={ __( 'Cite Alignment' ) }
				description={ __( 'Left or right align the cite name and title.' ) }
				options={ this.props.citeAlignOptions }
				value={ this.props.attributes.citeAlign }
				onChange={ this.props.onChangeCiteAlign }
			/>
			
			<PanelColor 
				title={ __( 'Background Color' ) }
				colorValue={ this.props.attributes.blockBackgroundColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ this.props.attributes.blockBackgroundColor }
					onChange={ this.props.onChangeBackgroundColor }
				/>
			</PanelColor>

			<PanelColor 
				title={ __( 'Text Color' ) }
				colorValue={ this.props.attributes.blockTextColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ this.props.attributes.blockTextColor }
					onChange={ this.props.onChangeTextColor }
				/>
			</PanelColor>

		</InspectorControls>
		);
	}
}
