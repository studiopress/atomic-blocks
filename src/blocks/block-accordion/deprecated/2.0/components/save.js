// Import block dependencies and components
import Accordion_2_0 from './accordion';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
	RichText,
	InnerBlocks
} = wp.editor;

export default class Save_2_0 extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		return (

			<Accordion_2_0 { ...this.props }>
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
			</Accordion_2_0>
		);
	}
}
