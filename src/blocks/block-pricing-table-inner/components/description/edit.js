// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;

const { RichText, withFontSizes, withColors } = wp.blockEditor;

class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const {
			attributes: {
				features,
				borderStyle,
				borderColor,
				borderWidth,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
			},
			isSelected,
			className,
			setAttributes,
			fallbackFontSize,
			fontSize,
			backgroundColor,
			textColor,
		} = this.props;

		// Setup class names
		const editClassName = classnames( {
			'ab-pricing-table-features': true,
			[ fontSize.class ]: fontSize.class,
			'has-text-color': textColor.color,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class,
			[ borderStyle ]: borderStyle,
			[ 'ab-list-border-width-' + borderWidth ]: borderWidth,
		} );

		// Setup styles
		const editStyles = {
			fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			borderColor: borderColor ? borderColor : undefined,
			paddingTop: paddingTop ? paddingTop + 'px' : undefined,
			paddingRight: paddingRight ? paddingRight + 'px' : undefined,
			paddingBottom: paddingBottom ? paddingBottom + 'px' : undefined,
			paddingLeft: paddingLeft ? paddingLeft + 'px' : undefined,
		};

		return [
			<Fragment key={ 'ab-pricing-table-inner-component-description-' + this.props.clientId }>
				<Inspector { ...this.props } />
				<RichText
					tagName="ul"
					multiline="li"
					itemProp="description"
					placeholder={ __(
						'Add a product feature',
						'atomic-blocks'
					) }
					keepPlaceholderOnFocus
					value={ features }
					onChange={ ( value ) =>
						setAttributes( { features: value } )
					}
					style={ editStyles }
					className={ editClassName ? editClassName : undefined }
				/>
			</Fragment>,
		];
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Edit );
