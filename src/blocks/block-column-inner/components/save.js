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

		/* Setup the background color class. */
		let backgroundColorClass;

		if (attributes.customBackgroundColor) {
			backgroundColorClass = 'ab-has-custom-background-color';
		} else {
			backgroundColorClass = attributes.backgroundColor ? 'has-' + attributes.backgroundColor + '-background-color' : null;
		}

		/* Setup the text color class. */
		let textColorClass;

		if (attributes.customTextColor) {
			textColorClass = 'ab-has-custom-text-color';
		} else {
			textColorClass = attributes.textColor ? 'has-' + attributes.textColor + '-color' : null;
		}

		return (
			<div
				className={ classnames(
					this.props.className,
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
						textAlign: attributes.textAlign ? attributes.textAlign : null,
						marginTop: attributes.marginTop > 0 ? attributes.marginTop : null,
						marginBottom: attributes.marginBottom > 0 ? attributes.marginBottom : null,
						paddingTop: attributes.paddingTop > 0 ? attributes.paddingTop : null,
						paddingRight: attributes.paddingRight > 0 ? attributes.paddingRight : null,
						paddingBottom: attributes.paddingBottom > 0 ? attributes.paddingBottom : null,
						paddingLeft: attributes.paddingLeft > 0 ? attributes.paddingLeft : null,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
