// Import block dependencies and components
const { __ } = wp.i18n;

const {
	ContrastChecker,
	PanelColorSettings,
} = wp.editor;

const { Fragment } = wp.element;

export default function BackgroundColor( props ) {
    const {
		backgroundColor,
		panelTitle,
        onChangeBackgroundColor = () => {},
	} = props;

    return (
        <Fragment>
			<PanelColorSettings
				title={ panelTitle }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: onChangeBackgroundColor,
						label: panelTitle,
					},
				] }
			>
				<ContrastChecker
					// @todo ContrastChecker
					// { ...{
					// 	textColor: textColor.color,
					// 	backgroundColor: backgroundColor.color,
					// 	fallbackTextColor,
					// 	fallbackBackgroundColor,
					// } }
				/>
			</PanelColorSettings>
        </Fragment>
    );
}
