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
		const {
			twitter,
			facebook,
			google,
			linkedin,
			pinterest,
			email,
			reddit,
			shareAlignment,
			shareButtonStyle,
			shareButtonShape,
			shareButtonSize,
			shareButtonColor,
		} = this.props.attributes;

		// Button style values
		const buttonStyleOptions = [
			{ value: 'ab-share-icon-text', label: __( 'Icon and Text' ) },
			{ value: 'ab-share-icon-only', label: __( 'Icon Only' ) },
			{ value: 'ab-share-text-only', label: __( 'Text Only' ) },
		];

		// Button shape values
		const buttonShapeOptions = [
			{ value: 'ab-share-shape-square', label: __( 'Square' ) },
			{ value: 'ab-share-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'ab-share-shape-circular', label: __( 'Circular' ) },
		];

		// Button size values
		const shareButtonSizeOptions = [
			{ value: 'ab-share-size-small', label: __( 'Small' ) },
			{ value: 'ab-share-size-medium', label: __( 'Medium' ) },
			{ value: 'ab-share-size-large', label: __( 'Large' ) },
		];

		// Button color values
		const shareButtonColorOptions = [
			{ value: 'ab-share-color-standard', label: __( 'Standard' ) },
			{ value: 'ab-share-color-social', label: __( 'Social Colors' ) },
		];

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

				<PanelBody title={ __( 'Sharing Button Options' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Button Style' ) }
						value={ shareButtonStyle }
						options={ buttonStyleOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { shareButtonStyle: value } ) } }
					/>

					<SelectControl
						label={ __( 'Button Shape' ) }
						value={ shareButtonShape }
						options={ buttonShapeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { shareButtonShape: value } ) } }
					/>

					<SelectControl
						label={ __( 'Button Size' ) }
						value={ shareButtonSize }
						options={ shareButtonSizeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { shareButtonSize: value } ) } }
					/>

					<SelectControl
						label={ __( 'Button Color' ) }
						value={ shareButtonColor }
						options={ shareButtonColorOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { shareButtonColor: value } ) } }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
