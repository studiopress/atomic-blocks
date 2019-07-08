// Import block dependencies and components
import classnames from 'classnames';
import Inspector from '../global/inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;

const {
	RichText,
	withFontSizes,
	withColors
} = wp.editor;

class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				subtitle,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft
			},
			isSelected,
			className,
			setAttributes,
			fallbackFontSize,
			fontSize,
			backgroundColor,
			textColor
		} = this.props;

		// Setup class names
		const editClassName = classnames({
			'ab-pricing-table-subtitle': true,
			[ fontSize.class ]: fontSize.class,
			'has-text-color': textColor.color,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class
		});

		// Setup styles
		const editStyles = {
			fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined
		};

		return [
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				<RichText
					tagName="div"
					placeholder={ __( 'Price Subtitle', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ subtitle }
					onChange={ ( value ) => setAttributes({ subtitle: value }) }
					style={ editStyles }
					className={ editClassName ? editClassName : undefined }
				/>
			</Fragment>
		];
	}
}

export default compose([
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' })
])( Edit );
