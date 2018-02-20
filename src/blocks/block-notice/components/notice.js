/**
 * Notice Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import * as fontSize from './../../../utils/helper';
import * as uniqueID from './../../../utils/helper';

/**
 * Create a Notice wrapper Component
 */
export default class NoticeBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const blockID = uniqueID.generateUniqueID( this.props.attributes.noticeDismiss + this.props.attributes.title )

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
				data-id={ blockID }
			>
				{ this.props.children }
			</div>
		);
	}
}
