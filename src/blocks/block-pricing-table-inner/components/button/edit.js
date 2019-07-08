// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';

// Import Button settings
import CustomButton from './../../../block-button/components/button';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;

const {
	RichText,
	withFontSizes,
	withColors,
	InnerBlocks,
	URLInput
} = wp.editor;

const {
	IconButton,
	Dashicon
} = wp.components;

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
				paddingLeft,
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonTarget
			},
			isSelected,
			className,
			setAttributes,
			backgroundColor
		} = this.props;

		// Setup class names
		const editClassName = classnames({
			'ab-pricing-table-button': true
		});

		// Setup styles
		const editStyles = {
			backgroundColor: backgroundColor.color,
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
				<div
					className={ editClassName ? editClassName : undefined }
					style={ editStyles }
				>
					<CustomButton { ...this.props }>
						<RichText
							tagName="span"
							placeholder={ __( 'Button text...', 'atomic-blocks' ) }
							keepPlaceholderOnFocus
							value={ buttonText }
							formattingControls={ [] }
							className={ classnames(
								'ab-button',
								buttonShape,
								buttonSize,
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor
							} }
							onChange={ ( value ) => setAttributes({ buttonText: value }) }
						/>
					</CustomButton>
					{ isSelected && (
						<form
							key="form-link"
							className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
							onSubmit={ event => event.preventDefault() }
							style={ {
								textAlign: buttonAlignment
							} }
						>
							<Dashicon icon={ 'admin-links' } />
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes({ buttonUrl: value }) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply', 'atomic-blocks' ) }
								type="submit"
							/>
						</form>
					) }
				</div>
			</Fragment>
		];
	}
}

export default compose([
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' })
])( Edit );
