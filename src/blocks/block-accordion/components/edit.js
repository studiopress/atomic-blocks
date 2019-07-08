/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	InnerBlocks
} = wp.editor;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		return [

			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ this.props.attributes.accordionAlignment }
					onChange={ ( value ) => this.props.setAttributes({ accordionAlignment: value }) }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...this.props }
			/>,

			// Show the button markup in the editor
			<Accordion { ...this.props }>
				<RichText
					tagName="p"
					placeholder={ __( 'Accordion Title', 'atomic-blocks' ) }
					value={ this.props.attributes.accordionTitle }
					className="ab-accordion-title"
					onChange={ ( value ) => this.props.setAttributes({ accordionTitle: value }) }
				/>

				<div className="ab-accordion-text">
					<InnerBlocks />
				</div>
			</Accordion>
		];
	}
}
