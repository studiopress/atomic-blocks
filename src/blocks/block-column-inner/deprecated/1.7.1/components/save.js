/**
 * Internal dependencies.
 */
import Column_1_7_1 from './column';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save_1_7_1 extends Component {

	render() {

		const { attributes } = this.props;

		return (
			<Column_1_7_1
				{ ...this.props }

				/* Pass through the color attributes to the Column component */
				backgroundColorValue={ attributes.backgroundColor ? null : attributes.customBackgroundColor }
				textColorValue={ attributes.textColor ? null : attributes.customTextColor }
			>
				<InnerBlocks.Content />
			</Column_1_7_1>
		);
	}
}
