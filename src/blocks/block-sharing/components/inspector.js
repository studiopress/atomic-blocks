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
		const {
			twitter,
			facebook,
			google,
			linkedin,
			pinterest,
			email,
			reddit,
			shareAlignment,
		} = this.props.attributes;

		// // Button size values
		// const buttonSizeOptions = [
		// 	{ value: 'ab-button-size-small', label: __( 'Small' ) },
		// 	{ value: 'ab-button-size-medium', label: __( 'Medium' ) },
		// 	{ value: 'ab-button-size-large', label: __( 'Large' ) },
		// 	{ value: 'ab-button-size-extralarge', label: __( 'Extra Large' ) },
		// ];

		// // Button shape
		// const buttonShapeOptions = [
		// 	{ value: 'ab-button-shape-square', label: __( 'Square' ) },
		// 	{ value: 'ab-button-shape-rounded', label: __( 'Rounded Square' ) },
		// 	{ value: 'ab-button-shape-circular', label: __( 'Circular' ) },
		// ];

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<p>{ __( 'Enable or disable the sharing links you want to output.' ) }</p>

					<ToggleControl
						label={ __( 'Twitter' ) }
						checked={ !! twitter }
						onChange={ () => this.props.setAttributes( { twitter: ! twitter } ) }
					/>
					<ToggleControl
						label={ __( 'Facebook' ) }
						checked={ !! facebook }
						onChange={ () => this.props.setAttributes( { facebook: ! facebook } ) }
					/>
					<ToggleControl
						label={ __( 'Google' ) }
						checked={ !! google }
						onChange={ () => this.props.setAttributes( { google: ! google } ) }
					/>
					<ToggleControl
						label={ __( 'Pinterest' ) }
						checked={ !! pinterest }
						onChange={ () => this.props.setAttributes( { pinterest: ! pinterest } ) }
					/>
					<ToggleControl
						label={ __( 'LinkedIn' ) }
						checked={ !! linkedin }
						onChange={ () => this.props.setAttributes( { linkedin: ! linkedin } ) }
					/>
					<ToggleControl
						label={ __( 'Reddit' ) }
						checked={ !! reddit }
						onChange={ () => this.props.setAttributes( { reddit: ! reddit } ) }
					/>
					<ToggleControl
						label={ __( 'Email' ) }
						checked={ !! email }
						onChange={ () => this.props.setAttributes( { email: ! email } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
