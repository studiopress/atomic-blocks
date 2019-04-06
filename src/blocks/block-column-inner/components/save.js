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

		return (
			<Column { ...this.props }>
				<InnerBlocks.Content />
			</Column>
		);
	}
}
