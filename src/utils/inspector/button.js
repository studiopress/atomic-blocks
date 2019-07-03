const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
	SelectControl,
	ToggleControl
} = wp.components;
const {
	PanelColorSettings
} = wp.editor;

export default function ButtonSettings( props ) {
	const {
		enableButtonBackgroundColor,
		buttonBackgroundColor,
		onChangeButtonColor = () => {},
		enableButtonTextColor,
		buttonTextColor,
		onChangeButtonTextColor = () => {},
		enableButtonSize,
		buttonSize,
		onChangeButtonSize = () => {},
		enableButtonShape,
		buttonShape,
		onChangeButtonShape = () => {},
		enableButtonTarget,
		buttonTarget,
		onChangeButtonTarget = () => {}
	} = props;

	// Button size values
	const buttonSizeOptions = [
		{ value: 'ab-button-size-small', label: __( 'Small', 'atomic-blocks' ) },
		{ value: 'ab-button-size-medium', label: __( 'Medium', 'atomic-blocks' ) },
		{ value: 'ab-button-size-large', label: __( 'Large', 'atomic-blocks' ) },
		{ value: 'ab-button-size-extralarge', label: __( 'Extra Large', 'atomic-blocks' ) }
	];

	// Button shape
	const buttonShapeOptions = [
		{ value: 'ab-button-shape-square', label: __( 'Square', 'atomic-blocks' ) },
		{ value: 'ab-button-shape-rounded', label: __( 'Rounded Square', 'atomic-blocks' ) },
		{ value: 'ab-button-shape-circular', label: __( 'Circular', 'atomic-blocks' ) }
	];

	return (
		<Fragment>
			{ false != enableButtonTarget && (
				<ToggleControl
					label={ __( 'Open link in new window', 'atomic-blocks' ) }
					checked={ buttonTarget }
					onChange={ onChangeButtonTarget }
				/>
			) }
			{ false != enableButtonSize && (
				<SelectControl
					selected={ buttonSize }
					label={ __( 'Button Size', 'atomic-blocks' ) }
					value={ buttonSize }
					options={ buttonSizeOptions.map( ({ value, label }) => ({
						value: value,
						label: label
					}) ) }
					onChange={ onChangeButtonSize }
				/>
			) }
			{ false != enableButtonShape && (
				<SelectControl
					label={ __( 'Button Shape', 'atomic-blocks' ) }
					value={ buttonShape }
					options={ buttonShapeOptions.map( ({ value, label }) => ({
						value: value,
						label: label
					}) ) }
					onChange={ onChangeButtonShape }
				/>
			) }
			{ false != enableButtonBackgroundColor && (
				<PanelColorSettings
					title={ __( 'Button Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonBackgroundColor,
						onChange: onChangeButtonColor,
						label: __( 'Button Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			) }
			{ false != enableButtonTextColor && (
				<PanelColorSettings
					title={ __( 'Button Text Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonTextColor,
						onChange: onChangeButtonTextColor,
						label: __( 'Button Text Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			) }
		</Fragment>
	);
}
