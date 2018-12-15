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

		const backgroundColors = [
			{ color: '#00d1b2', name: 'teal' },
			{ color: '#3373dc', name: 'royal blue' },
			{ color: '#209cef', name: 'sky blue' },
			{ color: '#22d25f', name: 'green' },
		];

		// Setup the attributes
		const { attributes: { columns, testimonialName, testimonialTitle, testimonialContent, testimonialAlignment, testimonialImgURL, testimonialImgID, testimonialBackgroundColor, testimonialTextColor, testimonialFontSize, testimonialCiteAlign }, isSelected, className, setAttributes } = this.props;

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { testimonialBackgroundColor: value } );
		const onChangeTextColor = value => setAttributes( { testimonialTextColor: value } );

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ ( nextColumns ) => {
						setAttributes( {
							columns: nextColumns,
						} );
					} }
					//onChange={ ( value ) => this.props.setAttributes( { columns: value } ) }
					min={ 1 }
					max={ 4 }
				/>

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

				<PanelColorSettings
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: testimonialBackgroundColor,
						colors: backgroundColors,
						onChange: onChangeBackgroundColor,
						label: __( 'Background Color' ),

					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings
					title={ __( 'Text Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: testimonialTextColor,
						onChange: onChangeTextColor,
						label: __( 'Text Color' ),
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</InspectorControls>
		);
	}
}
