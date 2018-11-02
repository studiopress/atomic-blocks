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
  PanelColorSettings,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
	ToggleControl,
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

		// Setup the attributes
		const { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight } = this.props.attributes;

		// Button size values
		const spacerStyleOptions = [
			{ value: 'ab-divider-solid', label: __( 'Solid' ) },
			{ value: 'ab-divider-dashed', label: __( 'Dashed' ) },
			{ value: 'ab-divider-dotted', label: __( 'Dotted' ) },
		];

		// Divider color
		const dividerColor = [
			{ color: '#ddd', name: 'white' },
			{ color: '#333', name: 'black' },
			{ color: '#3373dc', name: 'royal blue' },
			{ color: '#22d25f', name: 'green' },
			{ color: '#ffdd57', name: 'yellow' },
			{ color: '#ff3860', name: 'pink' },
			{ color: '#7941b6', name: 'purple' },
		];

		// Update color values
		const onChangeDividerColor = value => setAttributes( { spacerDividerColor: value } );

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Spacer Height' ) }
					value={ spacerHeight || '' }
					onChange={ ( value ) => this.props.setAttributes( { spacerHeight: value } ) }
					min={ 50 }
					max={ 600 }
				/>

				<ToggleControl
					label={ __( 'Add Divider' ) }
					checked={ spacerDivider }
					onChange={ () => this.props.setAttributes( { spacerDivider: ! spacerDivider } ) }
				/>

				{ spacerDivider ?
				<PanelBody>
					<SelectControl
						label={ __( 'Divider Style' ) }
						value={ spacerDividerStyle }
						options={ spacerStyleOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { spacerDividerStyle: value } ) } }
					/>

					<RangeControl
						label={ __( 'Divider Height' ) }
						value={ spacerDividerHeight || '' }
						onChange={ ( value ) => this.props.setAttributes( { spacerDividerHeight: value } ) }
						min={ 1 }
						max={ 5 }
					/>

					<PanelColorSettings
						title={ __( 'Divider Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							colors: dividerColor,
							value: spacerDividerColor,
							onChange: onChangeDividerColor,
							label: __( 'Divider Color' )
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>
				: null }
			</PanelBody>
		</InspectorControls>
		);
	}
}
