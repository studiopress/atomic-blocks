/**
 * Avatar Column Wrapper
 */

/* Setup the block */
const { Component } = wp.element;

/* Create an SocialIcons wrapper Component */
export default class AvatarColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div className="ab-profile-column ab-profile-avatar-wrap">
				<div className="ab-profile-image-wrap">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
