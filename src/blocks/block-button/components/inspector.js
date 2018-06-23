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
} = wp.editor;

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
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget } = this.props.attributes;

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
						colors={[
							{ color: '#00d1b2', name: 'teal' },
							{ color: '#3373dc', name: 'royal blue' },
							{ color: '#209cef', name: 'sky blue' },
							{ color: '#22d25f', name: 'green' },
							{ color: '#ffdd57', name: 'yellow' },
							{ color: '#ff3860', name: 'pink' },
							{ color: '#7941b6', name: 'purple' },
							{ color: '#392F43', name: 'black' },
						]}
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
						colors={[
							{ color: '#fff', name: 'white' },
							{ color: '#32373c', name: 'black' },
						]}
					/>
				</PanelColor>
			</PanelBody>
		</InspectorControls>
		);
	}
}
