/**
 * card Box Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create a card box wrapper Component
export default class CardBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { cardAlignment, cardImgURL, cardFontSize, cardBackgroundColor, cardTextColor, cardAvatarShape } = this.props.attributes;

		return (
			<div
				style={ {
					backgroundColor: cardBackgroundColor,
					color: cardTextColor,
				} }
				className={ classnames(
					this.props.className,
					cardAlignment,
					cardAvatarShape,
					{ 'lsx-has-avatar': cardImgURL },
					'lsx-font-size-' + cardFontSize,
					'lsx-block-card',
					'lsx-card-columns',
				) }>
				{ this.props.children }
			</div>
		);
	}
}
