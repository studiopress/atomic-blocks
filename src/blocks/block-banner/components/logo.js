/**
 * Logo Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import icons from './icons';

// Import block components
const {
	MediaUpload,
} = wp.editor;

// Create an SocialIcons wrapper Component
export default class LogoColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const { bannerAlignment, bannerImgURL, bannerLogoID, bannerLogoURL, bannerFontSize, bannerBackgroundColor, bgPosition, bannerTextColor, bannerTitlePosition } = this.props.attributes;

		return (
			<div className="lsx-banner-logo-wrap">
				{ this.props.children }
			</div>
		);
	}
}
