/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	getColorClassName,
	withColors,
} = wp.editor;
const {
	Component,
	Fragment,
} = wp.element;
const {
	withFallbackStyles
} = wp.components;

/* Apply fallback styles. */
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		/* Setup the background color class. */
		let backgroundColorClass;

		if (attributes.customBackgroundColor) {
			backgroundColorClass = 'ab-has-custom-background-color';
		} else {
			backgroundColorClass = attributes.backgroundColor ? 'has-' + attributes.backgroundColor + '-background-color' : null;
		}

		/* Setup the text color class. */
		let textColorClass;

		if (attributes.customTextColor) {
			textColorClass = 'ab-has-custom-text-color';
		} else {
			textColorClass = attributes.textColor ? 'has-' + attributes.textColor + '-color' : null;
		}

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( value ) => {
						setAttributes( { textAlign: value } );
					} }
				/>
			</BlockControls>,
			<Inspector { ...{ setAttributes, ...this.props } }/>,
			<Fragment>
				<div
					className={ classnames(
						this.props.className,
						'ab-block-layout-column',
					) }
				>
					<div
						className={ classnames(
							'ab-block-layout-column-inside',
							backgroundColorClass,
							textColorClass,
						) }
						style={ {
							backgroundColor: backgroundColor.color,
							color: textColor.color,
							textAlign: attributes.textAlign ? attributes.textAlign : null,
							marginTop: attributes.marginTop > 0 ? attributes.marginTop : null,
							marginBottom: attributes.marginBottom > 0 ? attributes.marginBottom : null,
							paddingTop: attributes.paddingTop > 0 ? attributes.paddingTop : null,
							paddingRight: attributes.paddingRight > 0 ? attributes.paddingRight : null,
							paddingBottom: attributes.paddingBottom > 0 ? attributes.paddingBottom : null,
							paddingLeft: attributes.paddingLeft > 0 ? attributes.paddingLeft : null,
						} }
					>
						<InnerBlocks
							templateLock={ false }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyFallbackStyles,
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
	),
] )( Edit );
