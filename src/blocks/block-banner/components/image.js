/**
 * Image Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
//import icons from './icons';

// Import block components
const {
	MediaUpload,
} = wp.editor;

// Create an SocialIcons wrapper Component
export default class ImageColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { bannerBackgroundColor } = this.props.attributes;

		return (
			<div className="lsx-banner-column"
				style={ {
					backgroundColor: bannerBackgroundColor,
				} }>
				<div className="lsx-banner-image-wrap">
					{ this.props.children }
				</div>
			</div>

		);
	}
}
