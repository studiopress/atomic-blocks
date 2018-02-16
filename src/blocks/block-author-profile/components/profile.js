/**
 * Profile Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create an SocialIcons wrapper Component
export default class ProfileBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div 
			style={ {
				backgroundColor: this.props.attributes.blockBackgroundColor,
				color: this.props.attributes.blockTextColor,
			} }
			className={ classnames(
				this.props.className,
				this.props.attributes.alignment,
				this.props.attributes.avatarShape,
				{ 'has-avatar': this.props.attributes.imgURL },
				'block-profile',
				'columns is-variable is-4'
			) }>
				{ this.props.children }
			</div>
		);
	}
}
