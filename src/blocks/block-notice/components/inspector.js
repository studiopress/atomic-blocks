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
	RangeControl, 
	SelectControl,
} = wp.components;

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
				min={ 14 }
				max={ 24 }
				step={ 1 }
			/>

			<SelectControl
				label={ __( 'Notice Display' ) }
				description={ __( 'Do you want the message to always show or dismissable?' ) }
				options={ this.props.noticeDismissOptions }
				value={ this.props.attributes.noticeDismiss }
				onChange={ this.props.onChangeNoticeDismiss }
			/>
			
			<PanelColor 
				title={ __( 'Notice Color' ) }
				colorValue={ this.props.attributes.blockBackgroundColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Notice Color' ) }
					value={ this.props.attributes.blockBackgroundColor }
					onChange={ this.props.onChangeBackgroundColor }
					colors={['#00d1b2', '#3373dc', '#209cef', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#392F43']}
				/>
			</PanelColor>

			<PanelColor 
				title={ __( 'Title Color' ) }
				colorValue={ this.props.attributes.blockTitleColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ this.props.attributes.blockTitleColor }
					onChange={ this.props.onChangeTitleColor }
					colors={['#fff', '#32373c' ]}
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
					colors={['#32373c', '#fff' ]}
				/>
			</PanelColor>

		</InspectorControls>
		);
	}
}
