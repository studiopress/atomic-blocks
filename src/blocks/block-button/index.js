/**
 * BLOCK: LSX Blocks Button
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CustomButton from './components/button';
import icons from './components/icons';

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
	BlockAlignmentToolbar,
	URLInput,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

class LSXButtonBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonTextColor, buttonSize, buttonShape, buttonGhost, buttonLine, buttonHoverColor, buttonTarget }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ buttonAlignment }
					onChange={ ( value ) => {
						setAttributes( { buttonAlignment: value } );
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
					placeholder={ __( 'Button text...', 'lsx-blocks' ) }
					keepPlaceholderOnFocus
					value={ buttonText }
					formattingControls={ [] }
					className={ classnames(
						'lsx-button',
						buttonShape,
						buttonSize,
						'lsx-border' + buttonGhost,
					) }
					style={ {
						color: buttonTextColor,
                        boxShadow: '2px 2px 0 0 ' + buttonShadowColor,
						backgroundColor: buttonBackgroundColor,
					} }
					onChange={ (value) => setAttributes( { buttonText: value } ) }
				/>
			</CustomButton>,
			isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link lsx-button-${buttonAlignment}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: buttonAlignment,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<URLInput
						className="button-url"
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
					/>
					<IconButton
						icon="editor-break"
						label={ __( 'Apply', 'lsx-blocks' ) }
						type="submit"
					/>
				</form>
			)
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-button', {
	title: __( 'LSX Button', 'lsx-blocks' ),
	description: __( 'Add a customizable button.', 'lsx-blocks' ),
	icon: 'admin-links',
	category: 'lsx-blocks',
	keywords: [
		__( 'button', 'lsx-blocks' ),
		__( 'link', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	attributes: {
		buttonText: {
			type: 'string',
		},
		buttonUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		buttonAlignment: {
			type: 'string',
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#418AD0',
		},
		buttonShadowColor: {
			type: 'string',
			default: '#27639e',
		},
		buttonHoverColor: {
			type: 'string',
			default: '#27639D',
		},
		buttonTextColor: {
			type: 'string',
			default: '#ffffff',
		},
		buttonSize: {
			type: 'string',
			default: 'lsx-button-size-medium',
		},
		buttonShape: {
			type: 'string',
			default: 'lsx-button-shape-rounded',
		},
		buttonGhost: {
			type: 'string',
			default: '',
		},
		buttonLine: {
			type: 'string',
			default: 'lsx-button-no-line',
		},
		buttonTarget: {
			type: 'boolean',
			default: false,
		},
	},

	// Render the block components
	edit: LSXButtonBlock,

	onMouseEnterHandler: function() {
		console.log( 'testing the hover' );
	},

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonShape, buttonGhost, buttonLine, buttonTarget } = props.attributes;

		// Save the block markup for the front end
		return (
			<CustomButton { ...props }>
				{	// Check if there is button text and output
					buttonText && (
						<a
							href={ buttonUrl }
							target={ buttonTarget ? '_blank' : '_self' }
							className={ classnames(
								'lsx-button',
								buttonShape,
								buttonSize,
								'lsx-border' + buttonGhost,
							) }
							style={ {
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
								background: buttonGhost,
								boxShadow: '2px 2px 0 0 ' + buttonShadowColor,
								borderColor: buttonBackgroundColor,
							} }
							data-onhover={ buttonHoverColor }
							data-offhover={ buttonBackgroundColor }
							data-offhoverghost={ buttonGhost }
							onMouseEnter="this.style.backgroundColor=this.getAttribute('data-offhoverghost');"
							onMouseLeave="this.style.backgroundColor=this.getAttribute('data-offhover');"
						>
							<RichText.Content
								value={ buttonText }
							/>
						</a>
					) }
			</CustomButton>
		);
	},
} );
