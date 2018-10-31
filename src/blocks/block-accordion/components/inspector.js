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
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
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
		const { accordionTitle, accordionText, accordionFontSize, accordionOpen } = this.props.attributes;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ accordionFontSize }
					onChange={ ( value ) => this.props.setAttributes( { accordionFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<ToggleControl
					label={ __( 'Open by default' ) }
					checked={ accordionOpen }
					onChange={ () => this.props.setAttributes( { accordionOpen: ! accordionOpen } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
