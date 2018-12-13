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
		const { attributes: { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget }, isSelected, className, setAttributes } = this.props;

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
					) }
					style={ {
						color: buttonTextColor,
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
			default: '#3373dc'
		},
		buttonTextColor: {
			type: 'string',
			default: '#ffffff'
		},
		buttonSize: {
			type: 'string',
			default: 'lsx-button-size-medium'
		},
		buttonShape: {
			type: 'string',
			default: 'lsx-button-shape-rounded'
		},
		buttonTarget: {
			type: 'boolean',
			default: false
		},
	},

	// Render the block components
	edit: LSXButtonBlock,

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
						target={ buttonTarget ? '_blank' : '_self' }
						className={ classnames(
							'lsx-button',
							buttonShape,
							buttonSize,
						) }
						style={ {
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						} }
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
