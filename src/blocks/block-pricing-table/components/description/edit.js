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
						'ab-pricing-table-description': true,
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