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

		let backgroundColorClass;

		if (attributes.customBackgroundColor) {
			backgroundColorClass = 'has-custom-background-color';
		} else {
			backgroundColorClass = attributes.backgroundColor ? 'has-' + attributes.backgroundColor + '-background-color' : null;
		}

		let textColorClass;

		if (attributes.customTextColor) {
			textColorClass = 'has-custom-text-color';
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
							padding: attributes.padding ? attributes.padding + 'px' : null,
							textAlign: attributes.textAlign ? attributes.textAlign : null,
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
