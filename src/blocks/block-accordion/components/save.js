// Import block dependencies and components
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
	RichText,
	InnerBlocks
} = wp.editor;

export default class Save extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		return (

			<Accordion { ...this.props }>
				<details open={ this.props.attributes.accordionOpen }>
					<summary className="ab-accordion-title">
						<RichText.Content
							value={ this.props.attributes.accordionTitle }
						/>
					</summary>
					<div className="ab-accordion-text">
						<InnerBlocks.Content />
					</div>
				</details>
			</Accordion>
		);
	}
}
