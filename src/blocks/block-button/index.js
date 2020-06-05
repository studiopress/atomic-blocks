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
const { RichText, AlignmentToolbar, BlockControls, URLInput } = wp.blockEditor;

// Register components
const { Button, Dashicon, Icon } = wp.components;

class ABButtonBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
			},
			isSelected,
			setAttributes,
		} = this.props;

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
			<Inspector key={ 'ab-button-inspector-' + this.props.clientId } { ...this.props } />,

			// Show the button markup in the editor
			<CustomButton key={ 'ab-button-custombutton-' + this.props.clientId } { ...this.props }>
				<RichText
					tagName="span"
					placeholder={ __( 'Button text...', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ buttonText }
					allowedFormats={ [] }
					className={ classnames(
						'ab-button',
						buttonShape,
						buttonSize
					) }
					style={ {
						color: buttonTextColor ? buttonTextColor : '#ffffff',
						backgroundColor: buttonBackgroundColor
							? buttonBackgroundColor
							: '#3373dc',
					} }
					onChange={ ( value ) =>
						setAttributes( { buttonText: value } )
					}
				/>
			</CustomButton>,
			isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link ab-button-${ buttonAlignment }` }
					onSubmit={ ( event ) => event.preventDefault() }
					style={ {
						textAlign: buttonAlignment,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<URLInput
						className="button-url"
						value={ buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>
					<Button
						label={ __( 'Apply', 'atomic-blocks' ) }
						type="submit"
					>
						<Icon icon="editor-break" />
					</Button>
				</form>
			),
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-button', {
	title: __( 'Button', 'atomic-blocks' ),
	description: __( 'Add a customizable button.', 'atomic-blocks' ),
	icon: 'admin-links',
	category: 'atomic-blocks',
	keywords: [
		__( 'button', 'atomic-blocks' ),
		__( 'link', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
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
		},
		buttonTextColor: {
			type: 'string',
		},
		buttonSize: {
			type: 'string',
			default: 'ab-button-size-medium',
		},
		buttonShape: {
			type: 'string',
			default: 'ab-button-shape-rounded',
		},
		buttonTarget: {
			type: 'boolean',
			default: false,
		},
	},

	ab_settings_data: {
		ab_button_buttonOptions: {
			title: __( 'Button Options', 'atomic-blocks' ),
		},
	},

	// Render the block components
	edit: ABButtonBlock,

	// Save the attributes and markup
	save( props ) {
		// Setup the attributes
		const {
			buttonText,
			buttonUrl,
			buttonBackgroundColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonTarget,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<CustomButton { ...props }>
				{ // Check if there is button text and output
				buttonText && (
					<a
						href={ buttonUrl }
						target={ buttonTarget ? '_blank' : null }
						rel={ buttonTarget ? 'noopener noreferrer' : null }
						className={ classnames(
							'ab-button',
							buttonShape,
							buttonSize
						) }
						style={ {
							color: buttonTextColor
								? buttonTextColor
								: '#ffffff',
							backgroundColor: buttonBackgroundColor
								? buttonBackgroundColor
								: '#3373dc',
						} }
					>
						<RichText.Content value={ buttonText } />
					</a>
				) }
			</CustomButton>
		);
	},
} );
