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
	withColors,
} = wp.editor;

class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				price,
				term,
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
			'ab-pricing-table-price': true,
			[ fontSize.class ]: fontSize.class,
			'has-text-color': textColor.color,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class,
		} );

		// Setup styles
		const editStyles = {
			fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
			backgroundColor: backgroundColor.color,
			color: textColor.color,
		};

		return [
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				<RichText
					tagName="div"
					itemprop="price"
					placeholder={ __( '$49', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ price }
					onChange={ ( value ) => setAttributes( { price: value } ) }
					style={ editStyles }
					className={ editClassName ? editClassName : undefined }
				/>
				<RichText
					tagName="span"
					value={ term }
					placeholder={ __( '/mo', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					onChange={ ( value ) => setAttributes( { term: value } ) }
					className={ classnames(
						'ab-pricing-table-term',
					) }
				/>
			</Fragment>
		];
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Edit );