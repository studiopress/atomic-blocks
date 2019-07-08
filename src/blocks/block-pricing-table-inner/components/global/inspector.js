/**
 * Inspector Controls
 * Font size, color, background color
 * This is used for multiple pricing table components using the same inspector settings
 */

 // Import Inspector settings
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
	PanelColorSettings,
	RangeControl
} = wp.editor;

const {
	withFallbackStyles,
	PanelBody
} = wp.components;

// Apply fallback styles
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined
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
				paddingLeft
			},
			isSelected,
			setAttributes,
			fallbackFontSize,
			fontSize,
			setFontSize,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Settings', 'atomic-blocks' ) }>
				<FontSizePicker
					fallbackFontSize={ fallbackFontSize }
					value={ fontSize.size }
					onChange={ setFontSize }
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
					},
					{
						value: textColor.color,
						onChange: setTextColor,
						label: __( 'Text Color', 'atomic-blocks' )
					}
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: textColor.color,
						backgroundColor: backgroundColor.color,
						fallbackTextColor,
						fallbackBackgroundColor
					} }
					fontSize={ fontSize.size }
				/>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}

export default compose([
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' })
])( Inspector );
