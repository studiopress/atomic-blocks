/**
 * Inspector Controls
 * Font size, color, background color
 * This is used for multiple pricing table components using the same inspector settings
 */

// Import Inspector settings
import Button from './../../../../utils/inspector/button';
import ButtonSettings from './../../../../utils/inspector/button';
import Padding from './../../../../utils/components/padding';

// Import block dependencies and components
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;

const {
	InspectorControls,
	FontSizePicker,
	withFontSizes,
	withColors,
	ContrastChecker,
	PanelColorSettings
} = wp.editor;

const {
	withFallbackStyles,
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl
} = wp.components;

// Apply fallback styles
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor
	};
});

/**
 * Create an Inspector Controls wrapper Component
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonTarget
			},
			isSelected,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody
				title={ __( 'Button Settings', 'atomic-blocks' ) }
			>
				<ButtonSettings

					// Open in new window
					buttonTarget={ buttonTarget }
					onChangeButtonTarget={ value =>
						setAttributes({ buttonTarget: ! buttonTarget })
					}

					// Button Size
					buttonSize={ buttonSize }
					onChangeButtonSize={ buttonSize => setAttributes({ buttonSize }) }

					// Button Shape
					buttonShape={ buttonShape }
					onChangeButtonShape={ buttonShape => setAttributes({ buttonShape }) }

					// Button color
					buttonBackgroundColor={ buttonBackgroundColor }
					onChangeButtonColor={ buttonBackgroundColor => setAttributes({ buttonBackgroundColor }) }

					// Button text color
					buttonTextColor={ buttonTextColor }
					onChangeButtonTextColor={ buttonTextColor => setAttributes({ buttonTextColor }) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Padding Settings', 'atomic-blocks' ) }
				initialOpen={ false }
			>
				<Padding

					// Top padding
					paddingEnableTop={ true }
					paddingTop={ paddingTop }
					paddingTopMin="0"
					paddingTopMax="100"
					onChangePaddingTop={ paddingTop => setAttributes({ paddingTop }) }

					// Right padding
					paddingEnableRight={ true }
					paddingRight={ paddingRight }
					paddingRightMin="0"
					paddingRightMax="100"
					onChangePaddingRight={ paddingRight => setAttributes({ paddingRight }) }

					// Bottom padding
					paddingEnableBottom={ true }
					paddingBottom={ paddingBottom }
					paddingBottomMin="0"
					paddingBottomMax="100"
					onChangePaddingBottom={ paddingBottom => setAttributes({ paddingBottom }) }

					// Left padding
					paddingEnableLeft={ true }
					paddingLeft={ paddingLeft }
					paddingLeftMin="0"
					paddingLeftMax="100"
					onChangePaddingLeft={ paddingLeft => setAttributes({ paddingLeft }) }
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color Settings', 'atomic-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor.color,
						onChange: setBackgroundColor,
						label: __( 'Background Color', 'atomic-blocks' )
					}
				] }
			>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}

export default compose([
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor' )
])( Inspector );
