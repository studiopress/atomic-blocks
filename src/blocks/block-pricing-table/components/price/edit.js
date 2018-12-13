// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component, Fragment } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
  	withFontSizes,
} = wp.editor;

// Compose
const { compose } = wp.compose;

class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				price,
				fontSize,
				customFontSize
			},
			isSelected,
			className,
			setAttributes,
			setFontSize,
			fallbackFontSize
		} = this.props;

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
					className={ classnames( {
						'ab-pricing-table-price': true,
						[ fontSize.class ]: fontSize.class,
					} ) }
					style={ {
						fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
					} }
				/>
			</Fragment>
		];
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
] )( Edit );