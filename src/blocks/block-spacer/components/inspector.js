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

					<PanelColor 
						title={ __( 'Divider Color' ) }
						colorValue={ spacerDividerColor }
						initialOpen={ false }
					>
						<ColorPalette 
							label={ __( 'Divider Color' ) }
							value={ spacerDividerColor }
							onChange={ ( value ) => { this.props.setAttributes( { spacerDividerColor: value } ) } }
							colors={['#dddddd', '#333333', '#3373dc', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#444048']}
						/>
					</PanelColor>
				</PanelBody>
				: null }
			</PanelBody>
		</InspectorControls>
		);
	}
}
