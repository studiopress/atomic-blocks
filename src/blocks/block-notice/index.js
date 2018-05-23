/**
 * BLOCK: Atomic Blocks Notice
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import NoticeBox from './components/notice';
import DismissButton from './components/button';
import icons from './components/icons';
import * as uniqueID from './../../utils/helper';
import md5 from 'md5';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
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
	MediaUpload,
} = wp.editor;

// Register components
const {
	Button,
	SelectControl,
	withFallbackStyles,
	withState,
} = wp.components;

// Register the block
registerBlockType( 'atomic-blocks/ab-notice', {
	title: __( 'AB Notice' ),
	description: __( 'Add a stylized text notice.' ),
	icon: 'format-aside',
	category: 'common',
	keywords: [
		__( 'notice' ),
		__( 'message' ),
		__( 'atomic' ),
	],
	attributes: {
		noticeTitle: {
			type: 'string',
			selector: '.ab-notice-title',
		},
		noticeContent: {
			type: 'array',
			selector: '.ab-notice-text',
			source: 'children',
		},
		noticeAlignment: {
			type: 'string',
		},
		noticeBackgroundColor: {
			type: 'string',
			default: '#00d1b2'
		},
		noticeTextColor: {
			type: 'string',
			default: '#32373c'
		},
		noticeTitleColor: {
			type: 'string',
			default: '#fff'
		},
		noticeFontSize: {
			type: 'number',
			default: 18
		},
		noticeDismiss: {
            type: 'string',
            default: '',
        },
	},

	// Render the block components
	edit: withState( { editable: 'content', } )( ( props ) => {
		// Setup the attributes
		const { 
			noticeTitle, 
			noticeContent, 
			noticeAlignment, 
			noticeBackgroundColor, 
			noticeTextColor, 
			noticeTitleColor, 
			noticeFontSize, 
			noticeDismiss
		} = props.attributes;
		
		// Setup the props
		const {
			attributes,
			isSelected,
			editable,
			setState,
			className,
			setAttributes
		} = props;

		const onSetActiveEditable = ( newEditable ) => () => {
			setState( { editable: newEditable } );
		};

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ noticeAlignment }
						onChange={ ( value ) => setAttributes( { noticeAlignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
				{ ...{ setAttributes, ...props } }
				/>
			),
			// Show the block markup in the editor
			<NoticeBox { ...props }>
				{	// Check if the notice is dismissable and output the button
					noticeDismiss && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }
				
				<RichText
					tagName="p"
					placeholder={ __( 'Notice Title' ) }
					value={ noticeTitle }
					isSelected={ isSelected && editable === 'noticeTitle' }
					keepPlaceholderOnFocus
					className={ classnames(
						'ab-notice-title'
					) }
					style={ {
						color: noticeTitleColor,
					} }
					onChange={ ( value ) => setAttributes( { noticeTitle: value } ) }
					onFocus={ onSetActiveEditable( 'noticeTitle' ) }
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add notice text...' ) }
					value={ noticeContent }
					isSelected={ isSelected && editable === 'noticeContent' }
					keepPlaceholderOnFocus
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'ab-notice-text'
					) }
					style={ {
						borderColor: noticeBackgroundColor,
					} }
					onChange={ ( value ) => setAttributes( { noticeContent: value } ) }
					onFocus={ onSetActiveEditable( 'noticeContent' ) }
				/>
			</NoticeBox>
		];
	} ),

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { 
			noticeTitle, 
			noticeContent, 
			noticeAlignment, 
			noticeBackgroundColor, 
			noticeTextColor, 
			noticeTitleColor, 
			noticeFontSize, 
			noticeDismiss
		} = props.attributes;
		
		// Save the block markup for the front end
		return (
			<NoticeBox { ...props }>			
				{ noticeDismiss && !! noticeDismiss.length && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				{ noticeTitle && !! noticeTitle.length && (
					<div
						class="ab-notice-title"
						style={ {
							color: noticeTitleColor
						} }
					>
						<p>{ noticeTitle }</p>
					</div>
				) }

				{ noticeContent && !! noticeContent.length && (
					<div 
						class="ab-notice-text" 
						style={ {
							borderColor: noticeBackgroundColor
						} }
					>
						{ noticeContent }
					</div>
				) }
			</NoticeBox>
		);
	},
} );