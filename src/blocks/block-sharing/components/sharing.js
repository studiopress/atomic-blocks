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
export default class ShareLinks extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		return (	
			<div 
				style={ {
					//textAlign: this.props.attributes.buttonAlignment,
				} }
				className={ classnames(
					this.props.className,
					'ab-block-sharing'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
