/**
 * Notice Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import * as fontSize from './../../../utils/helper';

/**
 * Create a Testimonial wrapper Component
 */
export default class NoticeBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div 
				style={ {
					color: this.props.attributes.blockTextColor,
					textAlign: this.props.attributes.alignment,
					backgroundColor: this.props.attributes.blockBackgroundColor,
				} }
				className={ classnames(
					this.props.className,
					this.props.attributes.noticeDismiss,
					fontSize.fontRatioToClass( this.props.attributes.fontSize ),
					'block-notice'
				) 
				}
				data-id="someId-1234"
			>
				{ this.props.children }
			</div>
		);
	}
}
