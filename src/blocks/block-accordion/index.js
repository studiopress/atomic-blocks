/**
 * BLOCK: Atomic Blocks Accordion Block
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Accordion from './components/accordion';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

class ABAccordionBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { accordionTitle, accordionText, accordionAlignment, accordionFontSize, accordionOpen }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ accordionAlignment }
					onChange={ ( value ) => this.props.setAttributes( { accordionAlignment: value } ) }
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
					placeholder={ __( 'Accordion Title' ) }
					keepPlaceholderOnFocus
					value={ accordionTitle }
					className="ab-accordion-title"
					onChange={ ( value ) => this.props.setAttributes( { accordionTitle: value } ) }
				/>

				<RichText
					tagName="p"
					placeholder={ __( 'Accordion Text' ) }
					keepPlaceholderOnFocus
					value={ accordionText }
					isSelected={ isSelected }
					className="ab-accordion-text"
					onChange={ ( value ) => this.props.setAttributes( { accordionText: value } ) }
					inlineToolbar
				/>
			</Accordion>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-accordion', {
	title: __( 'AB Accordion' ),
	description: __( 'Add accordion block with a title and text.' ),
	icon: 'editor-ul',
	category: 'atomic-blocks',
	keywords: [
		__( 'accordion' ),
		__( 'list' ),
		__( 'atomic' ),
	],
	attributes: {
		accordionTitle: {
			type: 'array',
			selector: '.ab-accordion-title',
			source: 'children',
		},
		accordionText: {
			type: 'array',
			selector: '.ab-accordion-text',
			source: 'children',
		},
		accordionAlignment: {
			type: 'string',
		},
		accordionFontSize: {
			type: 'number',
			default: 18
		},
		accordionOpen: {
			type: 'boolean',
			default: false
		},
	},

	// Render the block components
	edit: ABAccordionBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { accordionTitle, accordionText, accordionAlignment, accordionFontSize, accordionOpen } = props.attributes;

		// Save the block markup for the front end
		return (
			<Accordion { ...props }>
				<details open={accordionOpen}>
					<summary class="ab-accordion-title">
						<RichText.Content 
							value={ accordionTitle }
						/>
					</summary>
					<RichText.Content 
						class="ab-accordion-text"
						tagName="p" 
						value={ accordionText }
					/>
				</details>
			</Accordion>
		);
	},
} );
