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
			attributes: {
				padding,
				alignment,
			},
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		const getTextColorClass       = getColorClassName( 'color', attributes.textColor );
		const getBackgroundColorClass = getColorClassName( 'background-color', attributes.backgroundColor );

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( nextAlign ) => {
						setAttributes( { alignment: nextAlign } );
					} }
				/>
			</BlockControls>,
			<Inspector { ...{ setAttributes, ...this.props } }/>,
			<Fragment>
				<div
					className={ classnames(
						alignment ? 'ab-block-layout-column-' + alignment : 'ab-block-layout-column-center',
						'ab-block-layout-column',
					) }
				>
					<div
						className={ classnames(
							'ab-block-layout-column-inside',
							getTextColorClass,
							getBackgroundColorClass,
						) }
						style={ {
							backgroundColor: backgroundColor.color,
							color: textColor.color,
							padding: padding ? padding + '%' : null,
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
