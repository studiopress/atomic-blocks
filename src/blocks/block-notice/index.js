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

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
} = wp.blocks;

// Register components
const {
	Button,
	SelectControl,
	withFallbackStyles,
} = wp.components;

class ABNoticeBlock extends Component {
	
	render() {
		
		// Setup the attributes
		const { attributes: { noticeTitle, noticeContent, noticeAlignment, noticeBackgroundColor, noticeTextColor, noticeTitleColor, noticeFontSize, noticeDismiss }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ noticeAlignment }
						onChange={ ( value ) => this.props.setAttributes( { noticeAlignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the block markup in the editor
			<NoticeBox { ...this.props }>
				{	// Check if the notice is dismissable and output the button
					noticeDismiss && (
					<DismissButton { ...this.props }>
						{ icons.dismiss }
					</DismissButton>
				) }
				
				<RichText
					tagName="p"
					placeholder={ __( 'Notice Title' ) }
					value={ noticeTitle }
					className={ classnames(
						'ab-notice-title'
					) }
					style={ {
						color: noticeTitleColor,
					} }
					onChange={ ( value ) => this.props.setAttributes( { noticeTitle: value } ) }
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add notice text...' ) }
					value={ noticeContent }
					isSelected={ isSelected }
					keepPlaceholderOnFocus
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'ab-notice-text'
					) }
					style={ {
						borderColor: noticeBackgroundColor,
					} }
					onChange={ ( value ) => this.props.setAttributes( { noticeContent: value } ) }
				/>
			</NoticeBox>
		];
	}
}

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
	edit: ABNoticeBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { noticeTitle, noticeContent, noticeAlignment, noticeBackgroundColor, noticeTextColor, noticeTitleColor, noticeFontSize, noticeDismiss } = props.attributes;
		
		// Save the block markup for the front end
		return (
			<NoticeBox { ...props }>			
				{	// Check if the notice is dismissable and output the button
					noticeDismiss && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				{	// Check if there is a notice title
					noticeTitle && (
					<div
						class="ab-notice-title"
						style={ {
							color: noticeTitleColor,
						} }
					>
						<p>{ noticeTitle }</p>
					</div>
				) }

				{	// Check if there is notice content and output
					noticeContent && (
					<div 
						class="ab-notice-text" 
						style={ {
							borderColor: noticeBackgroundColor,
						} }
					>
						{ noticeContent }
					</div>
				) }	
			</NoticeBox>
		);
	},
} );