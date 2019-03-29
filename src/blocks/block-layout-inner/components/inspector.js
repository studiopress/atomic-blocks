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
	RangeControl,
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
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Layout Column Padding', 'atomic-blocks' ) }
					value={ attributes.padding }
					onChange={ ( value ) => this.props.setAttributes( { padding: value } ) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Layout Column Background Color', 'atomic-blocks' ) }
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
