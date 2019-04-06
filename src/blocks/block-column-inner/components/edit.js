/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Column from './column';

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
				<Column { ...this.props }>
					<InnerBlocks
						templateLock={ false }
						templateInsertUpdatesSelection={ false }
					/>
				</Column>
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
