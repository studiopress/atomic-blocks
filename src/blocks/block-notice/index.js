/**
 * BLOCK: Atomic Blocks Notice
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import NoticeBox from './components/notice';
import DismissButton from './components/button';
import icons from './components/icons';
import * as fontSize from './../../utils/helper';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n; 

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	SelectControl,
} = wp.blocks;

// Register components
const {
	Button,
	withFallbackStyles
} = wp.components;

// Register the block
registerBlockType( 'atomic/atomic-notice', {
	title: __( 'Notice' ),
	description: __( 'Add a stylized text notice.' ),
	icon: 'format-aside',
	category: 'common',
	keywords: [
		__( 'notice' ),
		__( 'message' ),
		__( 'atomic' ),
	],
	attributes: {
		title: {
			type: 'string',
			selector: '.notice-title',
		},
		content: {
			type: 'array',
			selector: '.notice-text',
			source: 'children',
		},
		alignment: {
			type: 'string',
		},
		blockBackgroundColor: {
			type: 'string',
			default: '#00d1b2'
		},
		blockTextColor: {
			type: 'string',
			default: '#32373c'
		},
		blockTitleColor: {
			type: 'string',
			default: '#fff'
		},
		fontSize: {
			type: 'number',
			default: 18
		},
		noticeDismiss: {
            type: 'string',
            default: '',
        },
	},

	edit: function( props ) {
		// Change the text alignment
		const onChangeAlignment = value =>  {
			props.setAttributes( { alignment: value } );
		};

		// Change the background color
		const onChangeBackgroundColor = value => {
			props.setAttributes( { blockBackgroundColor: value } );
		};

		// Change the title color
		const onChangeTitleColor = value => {
			props.setAttributes( { blockTitleColor: value } );
		};

		// Change the text color
		const onChangeTextColor = value => {
			props.setAttributes( { blockTextColor: value } );
		};

		// Calculate the font size 
		const setFontRatio = ( ratio ) => props.setAttributes( { fontSize: ratio } );

		// Message dismiss options
		const noticeDismissOptions = [
			{ value: '', label: __( 'Always Show' ) },
			{ value: 'dismissable', label: __( 'Dismissable' ) },
		];

		// Change message dismiss value
		const onChangeNoticeDismiss = value => {
			props.setAttributes( { noticeDismiss: value } );
		};

		return [
			// Show the alignment toolbar on focus
			!! props.focus && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ props.attributes.alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			!! props.focus && (
				<Inspector
					{ ...{ onChangeBackgroundColor, onChangeTextColor, setFontRatio, noticeDismissOptions, onChangeNoticeDismiss, onChangeTitleColor, onChangeTextColor, ...props} }
				/>
			),
			// Show the block markup in the editor
			<NoticeBox { ...props }>
				{ 	// Check if the notice is dismissable and output the button
					props.attributes.noticeDismiss && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }
				
				<RichText
					tagName="p"
					placeholder={ __( 'Notice Title' ) }
					value={ props.attributes.title }
					className={ classnames(
						'notice-title'
					) }
					style={ {
						color: props.attributes.blockTitleColor,
					} }
					onChange={ ( value ) => props.setAttributes( { title: value } ) }
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add notice text...' ) }
					value={ props.attributes.content }
					className={ classnames(
						'notice-text'
					) }
					style={ {
						borderColor: props.attributes.blockBackgroundColor,
					} }
					onChange={ ( value ) => props.setAttributes( { content: value } ) }
				/>
			</NoticeBox>
		];
	},

	// Save the attributes and markup
	save: function( props ) {
		return (
			// Save the block markup for the front end
			<NoticeBox { ...props }>
				{	// Check if the notice is dismissable and output the button
					props.attributes.noticeDismiss && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				{	// Check if there is a notice title
					props.attributes.title && (
					<div
						class="notice-title"
						style={ {
							color: props.attributes.blockTitleColor,
						} }
					>
						<p>{ props.attributes.title }</p>
					</div>
				) }

				{	// Check if there is notice content and output
					props.attributes.content && (
					<div 
						class="notice-text" 
						style={ {
							borderColor: props.attributes.blockBackgroundColor,
						} }
					>
						{ props.attributes.content }
					</div>
				) }
			</NoticeBox>
		);
	},
} );