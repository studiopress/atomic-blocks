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
	ColorPalette
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	RangeControl,
	SelectControl,
	PanelBody
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
		const { dropCapFontSize, dropCapStyle } = this.props.attributes;

		// Drop cap style options
		const dropCapOptions = [
			{ value: 'ab-drop-cap-letter', label: __( 'Letter' ) },
			{ value: 'ab-drop-cap-square', label: __( 'Square' ) },
			{ value: 'ab-drop-cap-border', label: __( 'Border' ) }
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Drop Cap Size' ) }
					value={ dropCapFontSize }
					onChange={ ( value ) => this.props.setAttributes({ dropCapFontSize: value }) }
					min={ 1 }
					max={ 6 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Drop Cap Style' ) }
					description={ __( 'Choose the style of the drop cap in your paragraph.' ) }
					options={ dropCapOptions }
					value={ dropCapStyle }
					onChange={ ( value ) => this.props.setAttributes({ dropCapStyle: value }) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
