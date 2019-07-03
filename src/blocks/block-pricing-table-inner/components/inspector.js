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
	PanelColorSettings
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
	ToggleControl
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
		const { attributes: {
			borderWidth,
			borderColor,
			borderRadius,
			backgroundColor,
			padding
		},
			isSelected,
			className,
			setAttributes
		} = this.props;

		const onChangeBorderColor = value => setAttributes({ borderColor: value });
		const onChangeBackgroundColor = value => setAttributes({ backgroundColor: value });

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Pricing Column Padding', 'atomic-blocks' ) }
					value={ padding }
					onChange={ ( value ) => this.props.setAttributes({ padding: value }) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Pricing Column Border', 'atomic-blocks' ) }
					value={ borderWidth }
					onChange={ ( value ) => this.props.setAttributes({ borderWidth: value }) }
					min={ 0 }
					max={ 10 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Pricing Column Border Radius', 'atomic-blocks' ) }
					value={ borderRadius }
					onChange={ ( value ) => this.props.setAttributes({ borderRadius: value }) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
			</PanelBody>
			{ ( 0 < borderWidth ) && (
				<PanelColorSettings
					title={ __( 'Pricing Column Border Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: borderColor,
						onChange: onChangeBorderColor,
						label: __( 'Border Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
				) }
			<PanelColorSettings
				title={ __( 'Pricing Column Background Color', 'atomic-blocks' ) }
				initialOpen={ false }
				colorSettings={ [ {
					value: backgroundColor,
					onChange: onChangeBackgroundColor,
					label: __( 'Background Color', 'atomic-blocks' )
				} ] }
			>
			</PanelColorSettings>
		</InspectorControls>
		);
	}
}
