/**
 * External dependencies.
 */
import classnames from 'classnames';
import Columns from './columns';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save extends Component {

	render() {

		const {
			columnsGap,
			layoutClass,
		} = this.props.attributes;

		const className = classnames( [
			'ab-layout-column-wrap',
			'ab-block-layout-column-gap-' + columnsGap,
			layoutClass,
		])

		return (
			<Columns { ...this.props }>
				<div
					className={ className ? className : undefined }
				>
					<InnerBlocks.Content />
				</div>
			</Columns>
		);
	}
}
