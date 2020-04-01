/**
 * External dependencies.
 */
import classnames from 'classnames';
import Columns from './column-wrap';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;

export default class Save extends Component {
	render() {
		const { attributes } = this.props;

		const className = classnames( [
			'ab-layout-column-wrap',
			'ab-block-layout-column-gap-' + attributes.columnsGap,
			attributes.responsiveToggle ? 'ab-is-responsive-column' : null,
		] );

		return (
			<Columns
				{ ...this.props }
				/* Pass through the color attributes to the Columns component */
				backgroundColorValue={
					attributes.backgroundColor
						? null
						: attributes.customBackgroundColor
				}
				textColorValue={
					attributes.textColor ? null : attributes.customTextColor
				}
			>
				<div
					className={ className ? className : undefined }
					style={ {
						maxWidth: attributes.columnMaxWidth
							? attributes.columnMaxWidth
							: null,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</Columns>
		);
	}
}
