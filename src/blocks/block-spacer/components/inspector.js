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
		const { spacerHeight } = this.props.attributes;

		return (
		<InspectorControls key="inspector">

			<RangeControl
				label={ __( 'Spacer Height' ) }
				value={ spacerHeight || '' }
				onChange={ ( value ) => this.props.setAttributes( { spacerHeight: value } ) }
				min={ 50 }
				max={ 600 }
			/>

		</InspectorControls>
		);
	}
}
