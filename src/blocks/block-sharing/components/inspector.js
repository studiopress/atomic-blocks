/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls
} = wp.editor;

// Import Inspector components
const {
	PanelBody,
	SelectControl,
	ToggleControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Button style values
		const buttonStyleOptions = [
			{ value: 'ab-share-icon-text', label: __( 'Icon and Text', 'atomic-blocks' ) },
			{ value: 'ab-share-icon-only', label: __( 'Icon Only', 'atomic-blocks' ) },
			{ value: 'ab-share-text-only', label: __( 'Text Only', 'atomic-blocks' ) }
		];

		// Button shape values
		const buttonShapeOptions = [
			{ value: 'ab-share-shape-square', label: __( 'Square', 'atomic-blocks' ) },
			{ value: 'ab-share-shape-rounded', label: __( 'Rounded Square', 'atomic-blocks' ) },
			{ value: 'ab-share-shape-circular', label: __( 'Circular', 'atomic-blocks' ) }
		];

		// Button size values
		const shareButtonSizeOptions = [
			{ value: 'ab-share-size-small', label: __( 'Small', 'atomic-blocks' ) },
			{ value: 'ab-share-size-medium', label: __( 'Medium', 'atomic-blocks' ) },
			{ value: 'ab-share-size-large', label: __( 'Large', 'atomic-blocks' ) }
		];

		// Button color values
		const shareButtonColorOptions = [
			{ value: 'ab-share-color-standard', label: __( 'Standard', 'atomic-blocks' ) },
			{ value: 'ab-share-color-social', label: __( 'Social Colors', 'atomic-blocks' ) }
		];

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<p>{ __( 'Enable or disable the sharing links you want to output.' ) }</p>

					<ToggleControl
						label={ __( 'Twitter', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.twitter }
						onChange={ () => this.props.setAttributes({ twitter: ! this.props.attributes.twitter }) }
					/>
					<ToggleControl
						label={ __( 'Facebook', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.facebook }
						onChange={ () => this.props.setAttributes({ facebook: ! this.props.attributes.facebook }) }
					/>
					<ToggleControl
						label={ __( 'Pinterest', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.pinterest }
						onChange={ () => this.props.setAttributes({ pinterest: ! this.props.attributes.pinterest }) }
					/>
					<ToggleControl
						label={ __( 'LinkedIn', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.linkedin }
						onChange={ () => this.props.setAttributes({ linkedin: ! this.props.attributes.linkedin }) }
					/>
					<ToggleControl
						label={ __( 'Reddit', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.reddit }
						onChange={ () => this.props.setAttributes({ reddit: ! this.props.attributes.reddit }) }
					/>
					<ToggleControl
						label={ __( 'Email', 'atomic-blocks' ) }
						checked={ !! this.props.attributes.email }
						onChange={ () => this.props.setAttributes({ email: ! this.props.attributes.email }) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sharing Button Options', 'atomic-blocks' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Button Style', 'atomic-blocks' ) }
						value={ this.props.attributes.shareButtonStyle }
						options={ buttonStyleOptions.map( ({ value, label }) => ({
							value: value,
							label: label
						}) ) }
						onChange={ ( value ) => {
							this.props.setAttributes({ shareButtonStyle: value });
						} }
					/>

					<SelectControl
						label={ __( 'Button Shape', 'atomic-blocks' ) }
						value={ this.props.attributes.shareButtonShape }
						options={ buttonShapeOptions.map( ({ value, label }) => ({
							value: value,
							label: label
						}) ) }
						onChange={ ( value ) => {
							this.props.setAttributes({ shareButtonShape: value });
						} }
					/>

					<SelectControl
						label={ __( 'Button Size', 'atomic-blocks' ) }
						value={ this.props.attributes.shareButtonSize }
						options={ shareButtonSizeOptions.map( ({ value, label }) => ({
							value: value,
							label: label
						}) ) }
						onChange={ ( value ) => {
							this.props.setAttributes({ shareButtonSize: value });
						} }
					/>

					<SelectControl
						label={ __( 'Button Color', 'atomic-blocks' ) }
						value={ this.props.attributes.shareButtonColor }
						options={ shareButtonColorOptions.map( ({ value, label }) => ({
							value: value,
							label: label
						}) ) }
						onChange={ ( value ) => {
							this.props.setAttributes({ shareButtonColor: value });
						} }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
