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

		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget, ctaTitle, ctaText, ctaTitleFontSize, ctaTextFontSize, ctaBackgroundColor, ctaTextColor } = this.props.attributes;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'ab-button-size-small', label: __( 'Small' ) },
			{ value: 'ab-button-size-medium', label: __( 'Medium' ) },
			{ value: 'ab-button-size-large', label: __( 'Large' ) },
			{ value: 'ab-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'ab-button-shape-square', label: __( 'Square' ) },
			{ value: 'ab-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'ab-button-shape-circular', label: __( 'Circular' ) },
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Title Font Size' ) }
					value={ ctaTitleFontSize }
					onChange={ ( value ) => this.props.setAttributes( { ctaTitleFontSize: value } ) }
					min={ 24 }
					max={ 60 }
					step={ 2 }
				/>

				<RangeControl
					label={ __( 'Text Font Size' ) }
					value={ ctaTextFontSize }
					onChange={ ( value ) => this.props.setAttributes( { ctaTextFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 2 }
				/>

				<PanelColor 
					title={ __( 'Background Color' ) }
					colorValue={ ctaBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Background Color' ) }
						value={ ctaBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { ctaBackgroundColor: value } ) }
					/>
				</PanelColor>

				<PanelColor 
					title={ __( 'Text Color' ) }
					colorValue={ ctaTextColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Text Color' ) }
						value={ ctaTextColor }
						onChange={ ( value ) => this.props.setAttributes( { ctaTextColor: value } ) }
					/>
				</PanelColor>
			</PanelBody>

			<PanelBody title={ __( 'Button Options' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Open link in new window' ) }
					checked={ buttonTarget }
					onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
				/>
			
				<SelectControl
					label={ __( 'Button Size' ) }
					value={ buttonSize }
					options={ buttonSizeOptions.map( ({ value, label }) => ( {
						value: value,
						label: label,
					} ) ) }
					onChange={ ( value ) => { this.props.setAttributes( { buttonSize: value } ) } }
				/>

				<SelectControl
					label={ __( 'Button Shape' ) }
					value={ buttonShape }
					options={ buttonShapeOptions.map( ({ value, label }) => ( {
						value: value,
						label: label,
					} ) ) }
					onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
				/>
				
				<PanelColor 
					title={ __( 'Button Color' ) }
					colorValue={ buttonBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Button Color' ) }
						value={ buttonBackgroundColor }
						onChange={ ( value ) => { this.props.setAttributes( { buttonBackgroundColor: value } ) } }
						colors={['#00d1b2', '#3373dc', '#209cef', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#444048']}
					/>
				</PanelColor>
				
				<PanelColor 
					title={ __( 'Button Text Color' ) }
					colorValue={ buttonTextColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Button Text Color' ) }
						value={ buttonTextColor }
						onChange={ ( value ) => { this.props.setAttributes( { buttonTextColor: value } ) } }
						colors={['#32373c', '#fff' ]}
					/>
				</PanelColor>
			</PanelBody>
		</InspectorControls>
		);
	}
}
