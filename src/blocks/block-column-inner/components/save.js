/**
 * External dependencies.
 */
import Column from './column';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save extends Component {

	render() {

		const {
			attributes,
		} = this.props;

		// need to pass through the color attribute here so that the save function gets that instead
		// of the live backgroundColor.color value.

		return (
			<Column
				{ ...this.props }
				bgcolor={ attributes.customBackgroundColor }
			>
				<InnerBlocks.Content />
			</Column>
		);
	}
}
