/**
 * Button Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class customButton extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		return (
			<div
				style={ {
					textAlign: this.props.attributes.bannerAlignment,
				} }
				className={ classnames(
					this.props.className,
					'lsx-block-button lsx-block-banner-button'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
