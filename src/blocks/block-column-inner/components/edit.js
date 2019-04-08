/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Column from './column';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component } = wp.element;
const { Toolbar } = wp.components;
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

		const toolbarControls = [
			{
				icon: 'arrow-up-alt2',
				title: __( 'Vertical Align Top', 'atomic-blocks' ),
				isActive: attributes.verticalAlignment === 'top',
				onClick: () => setAttributes( { verticalAlignment: 'top' } ),
			},
			{
				icon: 'minus',
				title: __( 'Vertical Align Middle', 'atomic-blocks' ),
				isActive: attributes.verticalAlignment === 'center',
				onClick: () => setAttributes( { verticalAlignment: 'center' } ),
			},
			{
				icon: 'arrow-down-alt2',
				title: __( 'Vertical Align Bottom', 'atomic-blocks' ),
				isActive: attributes.verticalAlignment === 'bottom',
				onClick: () => setAttributes( { verticalAlignment: 'bottom' } ),
			},
		];

		return [
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( value ) => {
						setAttributes( { textAlign: value } );
					} }
				/>
				<Toolbar controls={ toolbarControls } />
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

// function abCustomClassName( className, name, attributes ) {
// 	if ( 'atomic-blocks/ab-columns' === name ) {
// 		return classnames(
// 			className,
// 			attributes.verticalAlignment ? 'ab-is-vertically-aligned-' + attributes.verticalAlignment : null
// 		);
// 	}
// 	return className;
// }

// wp.hooks.addFilter(
// 	"blocks.getBlockDefaultClassName",
// 	"atomicblocks/ab-column-block-class-name",
// 	abCustomClassName
// );
