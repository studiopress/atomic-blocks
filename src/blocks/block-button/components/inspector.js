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
	ToggleControl,
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

			<ToggleControl
				label={ __( 'Open link in new window' ) }
				checked={ this.props.attributes.buttonTarget }
				onChange={ () => this.props.setAttributes( { buttonTarget: ! this.props.attributes.buttonTarget } ) }
			/>

			<SelectControl
				label={ __( 'Button Size' ) }
				value={ this.props.attributes.buttonSize }
				options={ this.props.buttonSizeOptions.map( ({ value, label }) => ( {
					value: value,
					label: label,
				} ) ) }
				onChange={ ( value ) => { this.props.setAttributes( { buttonSize: value } ) } }
			/>

			<SelectControl
				label={ __( 'Button Shape' ) }
				value={ this.props.attributes.buttonShape }
				options={ this.props.buttonShapeOptions.map( ({ value, label }) => ( {
					value: value,
					label: label,
				} ) ) }
				onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
			/>
			
			<PanelColor 
				title={ __( 'Button Color' ) }
				colorValue={ this.props.attributes.buttonBackgroundColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Button Color' ) }
					value={ this.props.attributes.buttonBackgroundColor }
					onChange={ ( value ) => { this.props.setAttributes( { buttonBackgroundColor: value } ) } }
					colors={['#00d1b2', '#3373dc', '#209cef', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#444048']}
				/>
			</PanelColor>
			
			<PanelColor 
				title={ __( 'Button Text Color' ) }
				colorValue={ this.props.attributes.buttonTextColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Button Text Color' ) }
					value={ this.props.attributes.buttonTextColor }
					onChange={ ( value ) => { this.props.setAttributes( { buttonTextColor: value } ) } }
					colors={['#32373c', '#fff' ]}
				/>
			</PanelColor>

		</InspectorControls>
		);
	}
}
