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

		// Cite Alignment Options
		const citeAlignOptions = [
			{ value: 'left-aligned', label: __( 'Left Aligned' ) },
			{ value: 'right-aligned', label: __( 'Right Aligned' ) },
		];

		// Setup the attributes
		const { attributes: { testimonialName, testimonialTitle, testimonialContent, testimonialAlignment, testimonialImgURL, testimonialImgID, testimonialBackgroundColor, testimonialTextColor, testimonialFontSize, testimonialCiteAlign }, isSelected, className, setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ testimonialFontSize }
					onChange={ ( value ) => this.props.setAttributes( { testimonialFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Cite Alignment' ) }
					description={ __( 'Left or right align the cite name and title.' ) }
					options={ citeAlignOptions }
					value={ testimonialCiteAlign }
					onChange={ ( value ) => this.props.setAttributes( { testimonialCiteAlign: value } ) }
				/>
				
				<PanelColor 
					title={ __( 'Background Color' ) }
					colorValue={ testimonialBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Background Color' ) }
						value={ testimonialBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { testimonialBackgroundColor: value } ) }
					/>
				</PanelColor>

				<PanelColor 
					title={ __( 'Text Color' ) }
					colorValue={ testimonialTextColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Text Color' ) }
						value={ testimonialTextColor }
						onChange={ ( value ) => this.props.setAttributes( { testimonialTextColor: value } ) }
					/>
				</PanelColor>
			</PanelBody>
		</InspectorControls>
		);
	}
}
