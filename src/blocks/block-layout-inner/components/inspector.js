/**
 * External dependencies.
 */
import Margin from './../../../utils/components/margin';
import Padding from './../../../utils/components/padding';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const {
	InspectorControls,
	PanelColorSettings,
	withColors,
	ContrastChecker,
} = wp.editor;
const {
	PanelBody,
	withFallbackStyles,
} = wp.components;

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Create an Inspector Controls wrapper Component.
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor,
			textColor,
			fallbackTextColor,
			setTextColor,
			attributes,
			setAttributes,
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody
					title={ __( 'Margin and Padding', 'atomic-blocks' ) }
					initialOpen={ false }
				>
				<Margin
					// Top margin
					marginEnableTop={ true }
					marginTop={ attributes.marginTop }
					marginTopMin="0"
					marginTopMax="200"
					onChangeMarginTop={ marginTop => setAttributes( { marginTop } ) }
					// Bottom margin
					marginEnableBottom={ true }
					marginBottom={ attributes.marginBottom }
					marginBottomMin="0"
					marginBottomMax="200"
					onChangeMarginBottom={ marginBottom => setAttributes( { marginBottom } ) }
				/>

				<hr />

				<Padding
					// Padding Top
					paddingEnableTop={ true }
					paddingTop={ attributes.paddingTop }
					paddingTopMin="0"
					paddingTopMax="100"
					onChangePaddingTop={ paddingTop => setAttributes( { paddingTop } ) }
					// Padding Right
					paddingEnableRight={ true }
					paddingRight={ attributes.paddingRight }
					paddingRightMin="0"
					paddingRightMax="100"
					onChangePaddingRight={ paddingRight => setAttributes( { paddingRight } ) }
					// Padding Bottom
					paddingEnableBottom={ true }
					paddingBottom={ attributes.paddingBottom }
					paddingBottomMin="0"
					paddingBottomMax="100"
					onChangePaddingBottom={ paddingBottom => setAttributes( { paddingBottom } ) }
					// Padding Left
					paddingEnableLeft={ true }
					paddingLeft={ attributes.paddingLeft }
					paddingLeftMin="0"
					paddingLeftMax="100"
					onChangePaddingLeft={ paddingLeft => setAttributes( { paddingLeft } ) }
				/>
			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color', 'atomic-blocks' ) }
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
					}
			 	] }
			>
				<ContrastChecker
					{ ...{
						textColor: textColor.color,
						backgroundColor: backgroundColor.color,
						fallbackTextColor,
						fallbackBackgroundColor,
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}

export default compose( [
	applyFallbackStyles,
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
	),
] )( Inspector );
