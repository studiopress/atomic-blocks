/**
 * Banner Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create a banner box wrapper Component
export default class BannerBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { bannerAlignment, bannerImgURL, bannerLogoID, bannerLogoURL, bannerFontSize, bannerBackgroundColor, bgPosition, bannerTextColor, bannerTitlePosition } = this.props.attributes;

		return (
			<div
				style={ {
					color: bannerTextColor,
					backgroundColor: bannerBackgroundColor,
				} }
				className={ classnames(
					this.props.className,
					bannerAlignment,
					bannerTitlePosition,
					{ 'lsx-has-image': bannerImgURL },
					'lsx-font-size-' + bannerFontSize,
					'lsx-block-banner',
					'lsx-banner-columns',
					'alignfull',
					bgPosition,
				) }>
				{ this.props.children }
			</div>
		);
	}
}
