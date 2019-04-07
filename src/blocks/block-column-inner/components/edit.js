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
const { Component } = wp.element;
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	withColors,
} = wp.editor;

class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
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
			<Inspector { ...this.props } key="inspector"/>,
			<Column
				/* Pass through the live color value to the Column component */
				backgroundColorValue={ this.props.backgroundColor.color }
				textColorValue={ this.props.textColor.color }
				{ ...this.props }
				key="column"
			>
				<InnerBlocks
					templateLock={ false }
					templateInsertUpdatesSelection={ false }
				/>
			</Column>
		];
	}
}

export default compose( [
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
	),
] )( Edit );
