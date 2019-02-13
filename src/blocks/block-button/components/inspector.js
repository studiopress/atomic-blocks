/**
 * Inspector Controls
 */

// Import Inspector settings
import ButtonSettings from './../../../utils/inspector/button';

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
		const {
			buttonText,
			buttonUrl,
			buttonAlignment,
			buttonBackgroundColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonTarget
		} = this.props.attributes;
		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ButtonSettings
					// Open in new window
					buttonTarget={ buttonTarget }
					onChangeButtonTarget={ value =>
						setAttributes( { buttonTarget: ! buttonTarget } )
					}
					// Button Size
					buttonSize={ buttonSize }
					onChangeButtonSize={ buttonSize => setAttributes( { buttonSize } ) }
					// Button Shape
					buttonShape={ buttonShape }
					onChangeButtonShape={ buttonShape => setAttributes( { buttonShape } ) }
					// Button color
					buttonBackgroundColor={ buttonBackgroundColor }
					onChangeButtonColor={ buttonBackgroundColor => setAttributes( { buttonBackgroundColor } ) }
					// Button text color
					buttonTextColor={ buttonTextColor }
					onChangeButtonTextColor={ buttonTextColor => setAttributes( { buttonTextColor } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
