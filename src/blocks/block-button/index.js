/**
 * BLOCK: Atomic Blocks Button
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CustomButton from './components/button';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	URLInput
} = wp.editor;

// Register components
const {
	IconButton,
	Dashicon
} = wp.components;

class ABButtonBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget }, isSelected, className, setAttributes } = this.props;

		return [

			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ buttonAlignment }
					onChange={ ( value ) => {
						setAttributes({ buttonAlignment: value });
					} }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...this.props }
			/>,

			// Show the button markup in the editor
			<CustomButton { ...this.props }>
				<RichText
					tagName="span"
					placeholder={ __( 'Button text...', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ buttonText }
					formattingControls={ [] }
					className={ classnames(
						'ab-button',
						buttonShape,
						buttonSize,
					) }
					style={ {
						color: buttonTextColor,
						backgroundColor: buttonBackgroundColor
					} }
					onChange={ ( value ) => setAttributes({ buttonText: value }) }
				/>
			</CustomButton>,
			isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link ab-button-${buttonAlignment}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: buttonAlignment
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<URLInput
						className="button-url"
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes({ buttonUrl: value }) }
					/>
					<IconButton
						icon="editor-break"
						label={ __( 'Apply', 'atomic-blocks' ) }
						type="submit"
					/>
				</form>
			)
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-button', {
	title: __( 'AB Button', 'atomic-blocks' ),
	description: __( 'Add a customizable button.', 'atomic-blocks' ),
	icon: 'admin-links',
	category: 'atomic-blocks',
	keywords: [
		__( 'button', 'atomic-blocks' ),
		__( 'link', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],
	attributes: {
		buttonText: {
			type: 'string'
		},
		buttonUrl: {
			type: 'string',
            source: 'attribute',
            selector: 'a',
            attribute: 'href'
		},
		buttonAlignment: {
			type: 'string'
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#3373dc'
		},
		buttonTextColor: {
			type: 'string',
			default: '#ffffff'
		},
		buttonSize: {
			type: 'string',
			default: 'ab-button-size-medium'
		},
		buttonShape: {
			type: 'string',
			default: 'ab-button-shape-rounded'
		},
		buttonTarget: {
			type: 'boolean',
			default: false
		}
	},

	// Render the block components
	edit: ABButtonBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget } = props.attributes;

		// Save the block markup for the front end
		return (
			<CustomButton { ...props }>
				{	// Check if there is button text and output
					buttonText && (
					<a
						href={ buttonUrl }
						target={ buttonTarget ? '_blank' : null }
						rel={ buttonTarget ? 'noopener noreferrer' : null }
						className={ classnames(
							'ab-button',
							buttonShape,
							buttonSize,
						) }
						style={ {
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor
						} }
					>
						<RichText.Content
							value={ buttonText }
						/>
					</a>
				) }
			</CustomButton>
		);
	}
});
