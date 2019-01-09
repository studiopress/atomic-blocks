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
		const { attributes: {
			featured,
			featuredBorderWidth,
			featuredBorderColor,
		}, isSelected, className, setAttributes } = this.props;

		const onChangeBorderColor = value => setAttributes( { featuredBorderColor: value } );

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ToggleControl
					label={ __( 'Featured Price' ) }
					checked={ featured }
					onChange={ () => this.props.setAttributes( { featured: ! featured } ) }
				/>
				{ featured &&
					<RangeControl
						label={ __( 'Featured Price Border' ) }
						value={ featuredBorderWidth }
						onChange={ ( value ) => this.props.setAttributes( { featuredBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
						step={ 1 }
					/>
				}
				<PanelColorSettings
					title={ __( 'Featured Price Border Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: featuredBorderColor,
						onChange: onChangeBorderColor,
						label: __( 'Border Color' ),
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</InspectorControls>
		);
	}
}
