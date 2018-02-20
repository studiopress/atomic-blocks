/**
 * Avatar Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import icons from './icons';

// Import block components
const { 
	MediaUpload,
} = wp.blocks;

// Create an SocialIcons wrapper Component
export default class AvatarColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div class="column is-one-fifth profile-avatar-wrap">
				<div class="profile-image-wrap">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
