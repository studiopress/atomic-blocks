// Import block dependencies and components
const { __ } = wp.i18n;

const {
	ContrastChecker,
	PanelColorSettings,
} = wp.editor;

const { Fragment } = wp.element;

export default function BackgroundColor( props ) {
    const {
		title,
		initialOpen,
		panelClass,
		// Background color props
		backgroundColor,
		onChangeBackgroundColor = () => {},
		fallbackBackgroundColor,
		backgroundTitle,
		// Text color props
		textColor,
		onChangeTextColor = () => {},
		fallbackTextColor,
		colorTitle,
	} = props;

    return (
        <Fragment>
			<PanelColorSettings
				className={ panelClass }
				title={ title }
				initialOpen={ initialOpen }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: onChangeBackgroundColor,
						label: backgroundTitle,
					},
					{
						value: textColor,
						onChange: onChangeTextColor,
						label: colorTitle,
					}
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: textColor,
						backgroundColor: backgroundColor,
						fallbackTextColor,
						fallbackBackgroundColor,
					} }
				/>
			</PanelColorSettings>
        </Fragment>
    );
}
