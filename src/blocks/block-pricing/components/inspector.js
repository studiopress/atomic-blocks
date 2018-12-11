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
		const { attributes: { columns }, isSelected, className, setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ ( nextColumns ) => {
						setAttributes( {
							columns: nextColumns,
						} );
					} }
					min={ 1 }
					max={ 4 }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
