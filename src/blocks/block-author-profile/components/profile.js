/**
 * Profile Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create a profile box wrapper Component
export default class ProfileBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div 
			style={ {
				backgroundColor: this.props.attributes.profileBackgroundColor,
				color: this.props.attributes.profileTextColor,
			} }
			className={ classnames(
				this.props.className,
				this.props.attributes.profileAlignment,
				this.props.attributes.profileAvatarShape,
				{ 'ab-has-avatar': this.props.attributes.profileImgURL },
				'ab-font-size-' + this.props.attributes.profileFontSize,
				'ab-block-profile',
				'ab-profile-columns',
			) }>
				{ this.props.children }
			</div>
		);
	}
}
