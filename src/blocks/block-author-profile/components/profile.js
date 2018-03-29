/**
 * Profile Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import * as fontSize from './../../../utils/helper';

// Create a profile box wrapper Component
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
				fontSize.fontRatioToClass( this.props.attributes.blockFontSize ),
				'ab-block-profile',
				'ab-profile-columns'
			) }>
				{ this.props.children }
			</div>
		);
	}
}
