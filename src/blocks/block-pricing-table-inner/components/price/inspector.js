/**
 * Inspector Controls
 * Font size, color, background color
 * This is used for multiple pricing table components using the same inspector settings
 */

// Import Inspector settings
import Padding from './../../../../utils/inspector/padding';

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
} = wp.editor;

const {
	withFallbackStyles,
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} = wp.components;

// Apply fallback styles
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

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
				showTerm,
				showCurrency,
				term,
				currency,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
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
			fallbackTextColor,
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Settings', 'atomic-blocks' ) }>
				<FontSizePicker
					fallbackFontSize={ fallbackFontSize }
					value={ fontSize.size }
					onChange={ setFontSize }
				/>
				<ToggleControl
					label={ __( 'Show currency symbol', 'atomic-blocks' ) }
					checked={ showCurrency }
					onChange={ () => this.props.setAttributes( { showCurrency: ! showCurrency } ) }
				/>
				{ showCurrency && (
					<TextControl
						label={ __( 'Currency Symbol', 'atomic-blocks' ) }
						type="text"
						value={ currency }
						onChange={ ( value ) => this.props.setAttributes( { currency: value } ) }
					/>
				) }
				<ToggleControl
					label={ __( 'Show pricing duration', 'atomic-blocks' ) }
					checked={ showTerm }
					onChange={ () => this.props.setAttributes( { showTerm: ! showTerm } ) }
				/>
				{ showTerm && (
					<TextControl
						label={ __( 'Pricing Duration', 'atomic-blocks' ) }
						type="text"
						value={ term }
						onChange={ ( value ) => this.props.setAttributes( { term: value } ) }
					/>
				) }
			</PanelBody>
			<PanelBody
				title={ __( 'Padding', 'atomic-blocks' ) }
				initialOpen={ false }
			>
				<Padding
					paddingEnableTop={ true }
					paddingTop={ paddingTop }
					paddingTopMin="1"
					paddingTopMax="10"
					paddingEnableRight={ true }
					paddingRight={ paddingRight }
					paddingRightMin="1"
					paddingRightMax="10"
					paddingEnableBottom={ true }
					paddingBottom={ paddingBottom }
					paddingBottomMin="1"
					paddingBottomMax="10"
					paddingEnableLeft={ true }
					paddingLeft={ paddingLeft }
					paddingLeftMin="1"
					paddingLeftMax="10"
					onChangePadTop={ value =>
						setAttributes( {
							paddingTop: value === undefined ? 0 : value
						} )
					}
					onChangePadRight={ value =>
						setAttributes( {
							paddingRight: value === undefined ? 0 : value
						} )
					}
					onChangePadBottom={ value =>
						setAttributes( {
							paddingBottom: value === undefined ? 0 : value
						} )
					}
					onChangePadLeft={ value =>
						setAttributes({
							paddingLeft: value === undefined ? 0 : value
						} )
					}
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color Settings', 'atomic-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor.color,
						onChange: setBackgroundColor,
						label: __( 'Background Color', 'atomic-blocks' ),
					},
					{
						value: textColor.color,
						onChange: setTextColor,
						label: __( 'Text Color', 'atomic-blocks' ),
					},
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: textColor.color,
						backgroundColor: backgroundColor.color,
						fallbackTextColor,
						fallbackBackgroundColor,
					} }
					fontSize={ fontSize.size }
				/>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}

export default compose( [
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Inspector );