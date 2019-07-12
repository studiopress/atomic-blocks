/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Accordion_2_0 extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { accordionAlignment, accordionFontSize } = this.props.attributes;

		return (
			<div
				style={ {

				} }
				className={ classnames(
					this.props.className,
					accordionAlignment,
					'ab-block-accordion',
					'ab-font-size-' + accordionFontSize,
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
