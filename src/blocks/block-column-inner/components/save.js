/**
 * Internal dependencies.
 */
import Column from './column';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;

export default class Save extends Component {
	render() {
		const { attributes } = this.props;

		return (
			<Column
				{ ...this.props }
				/* Pass through the color attributes to the Column component */
				backgroundColorValue={
					attributes.backgroundColor
						? null
						: attributes.customBackgroundColor
				}
				textColorValue={
					attributes.textColor ? null : attributes.customTextColor
				}
			>
				<InnerBlocks.Content />
			</Column>
		);
	}
}
