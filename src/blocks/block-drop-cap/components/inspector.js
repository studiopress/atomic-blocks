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

		return (
		<InspectorControls key="inspector">

			<RangeControl
				label={ __( 'Drop Cap Size' ) }
				value={ this.props.attributes.dropCapFontSize }
				onChange={ this.props.setFontRatio }
				min={ 1 }
				max={ 6 }
				step={ 1 }
			/>

			<SelectControl
				label={ __( 'Drop Cap Style' ) }
				description={ __( 'Choose the style of the drop cap in your paragraph.' ) }
				options={ this.props.dropCapOptions }
				value={ this.props.attributes.dropCapStyle }
				onChange={ ( value ) => this.props.setAttributes( { dropCapStyle: value } ) }
			/>

		</InspectorControls>
		);
	}
}
