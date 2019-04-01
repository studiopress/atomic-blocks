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
			attributes,
		} = this.props;

		const className = classnames( [
			'ab-layout-column-wrap',
			'ab-block-layout-column-gap-' + attributes.columnsGap,
			attributes.layoutClass,
			attributes.responsiveToggle ? 'ab-is-responsive-column' : null,
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
