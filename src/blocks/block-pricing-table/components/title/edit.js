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
				title,
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
					tagName="div"
					itemprop="name"
					placeholder={ __( 'Price Title', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					className={ classnames( {
						'ab-pricing-table-title': true,
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