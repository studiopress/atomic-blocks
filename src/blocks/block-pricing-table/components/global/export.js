// Retreive the fontSizeClass
		export const fontSizeClass = getFontSizeClass( fontSize );

		// Retreive the getColorClassName
		export const textClass = getColorClassName( 'color', textColor );
		export const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		// If there is no fontSizeClass, use customFontSize
		export const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

  export default {
		fontSizeClass,
		textClass,
		backgroundClass,
		styles
  }