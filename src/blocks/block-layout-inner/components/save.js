/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save extends Component {

	render() {

		const { attributes } = this.props;

		/* Setup the background color class */
		let backgroundColorClass;

		if (attributes.customBackgroundColor) {
			backgroundColorClass = 'has-custom-background-color';
		} else {
			backgroundColorClass = attributes.backgroundColor ? 'has-' + attributes.backgroundColor + '-background-color' : null;
		}

		/* Setup the text color class */
		let textColorClass;

		if (attributes.customTextColor) {
			textColorClass = 'has-custom-text-color';
		} else {
			textColorClass = attributes.textColor ? 'has-' + attributes.textColor + '-color' : null;
		}

		return (
			<div
				className={ classnames(
					attributes.alignment ? 'ab-block-layout-column-' + attributes.alignment : 'ab-block-layout-column-center',
					'ab-block-layout-column',
				) }
			>
				<div
					className={ classnames(
						'ab-block-layout-column-inside',
						backgroundColorClass,
						textColorClass,
					) }
					style={ {
						backgroundColor: attributes.backgroundColor ? null : attributes.customBackgroundColor,
						color: attributes.textColor ? null : attributes.customTextColor,
						padding: attributes.padding && attributes.padding > 1 ? attributes.padding + 'px' : null,
						textAlign: attributes.textAlign ? attributes.textAlign : null,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
