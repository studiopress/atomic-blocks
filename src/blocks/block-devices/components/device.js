/**
 * Profile Box Wrapper
 */

/* Setup the block */
const { Component } = wp.element;

/* Import block dependencies and components */
import classnames from 'classnames';

/* Create a profile box wrapper Component */
export default class Device extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		/* Setup the attributes */
		const {
			profileAlignment,
			profileImgURL,
			profileFontSize,
			profileBackgroundColor,
			profileTextColor,
			profileAvatarShape
		} = this.props.attributes;

		return (
			<div
			style={ {
				// backgroundColor: profileBackgroundColor,
				// color: profileTextColor
			} }
			className={ classnames(
				this.props.className,
				// profileAlignment,
				// profileAvatarShape,
				// { 'ab-has-avatar': profileImgURL },
				// 'ab-font-size-' + profileFontSize,
				// 'ab-block-profile',
				'ab-device-mockup',
			) }>
				{ this.props.children }
			</div>
		);
	}
}
