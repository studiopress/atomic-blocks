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
		//const { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight } = this.props.attributes;

		const { attributes: { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerWidth, spacerDividerHeight }, isSelected, className, setAttributes } = this.props;

		// Button size values
		const spacerStyleOptions = [
			{ value: 'lsx-divider-solid', label: __( 'Solid' ) },
			{ value: 'lsx-divider-dashed', label: __( 'Dashed' ) },
			{ value: 'lsx-divider-dotted', label: __( 'Dotted' ) },
		];

		// Divider color
		const dividerColor = [
			{ color: '#F7941D', name: 'yellow' },
			{ color: '#C4771B', name: 'dark yellow' },
			{ color: '#418AD0', name: 'blue' },
			{ color: '#27639D', name: 'dark blue' },
			{ color: '#6BA913', name: 'green' },
			{ color: '#3f640b', name: 'dark green' },
			{ color: '#000000', name: 'black' },
			{ color: '#ffffff', name: 'white' },
		];

		// Update color values
		const onChangeDividerColor = value => setAttributes( { spacerDividerColor: value } );

		const onChangeDividerWidth = value => setAttributes( { spacerDividerWidth: value } );

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

					<RangeControl
						label={ __( 'Divider Width' ) }
						value={ spacerDividerWidth || '' }
						onChange={ ( value ) => this.props.setAttributes( { spacerDividerWidth: value } ) }
						min={ 1 }
						max={ 60 }
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
