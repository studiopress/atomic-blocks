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
				description,
			},
			isSelected,
			className,
			setAttributes,
			fallbackFontSize,
			fontSize,
			backgroundColor,
			textColor,
		} = this.props;

		return [
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				<RichText
					tagName="ul"
					multiline="li"
					itemprop="description"
					placeholder={ __( 'Add a product description', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ description }
					onChange={ ( value ) => setAttributes( { description: value } ) }
					className={ classnames( {
						'ab-pricing-table-price': true,
						[ fontSize.class ]: fontSize.class,
						'has-text-color': textColor.color,
						'has-background': backgroundColor.color,
						[ backgroundColor.class ]: backgroundColor.class,
						[ textColor.class ]: textColor.class,
					} ) }
					style={ {
						fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					} }
				/>
			</Fragment>
		];
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Edit );