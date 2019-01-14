/**
 * BLOCK: LSX Blocks Notice
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

class LSXNoticeBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				noticeTitle,
				noticeContent,
				noticeAlignment,
				noticeBackgroundColor,
				noticeTextColor,
				noticeTitleColor,
				noticeFontSize,
				noticeDismiss
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ noticeAlignment }
					onChange={ ( value ) => setAttributes( { noticeAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<NoticeBox key="notice" { ...this.props }>
				{	// Check if the notice is dismissable and output the button
					noticeDismiss && (
						<DismissButton { ...this.props }>
							{ icons.dismiss }
						</DismissButton>
					) }

				<RichText
					tagName="p"
					placeholder={ __( 'Notice Title', 'lsx-blocks' ) }
					keepPlaceholderOnFocus
					value={ noticeTitle }
					className={ classnames(
						'lsx-notice-title'
					) }
					style={ {
						color: noticeTitleColor,
					} }
					onChange={ ( value ) => setAttributes( { noticeTitle: value } ) }
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add notice text...', 'lsx-blocks' ) }
					value={ noticeContent }
					className={ classnames(
						'lsx-notice-text'
					) }
					style={ {
						borderColor: noticeBackgroundColor,
					} }
					onChange={ ( value ) => setAttributes( { noticeContent: value } ) }
				/>
			</NoticeBox>
		];
	}
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-notice', {
	title: __( 'LSX Inline Notice', 'lsx-blocks' ),
	description: __( 'Add a stylized text notice.', 'lsx-blocks' ),
	icon: 'format-aside',
	category: 'lsx-blocks',
	keywords: [
		__( 'notice', 'lsx-blocks' ),
		__( 'message', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	attributes: {
		noticeTitle: {
			type: 'string',
			selector: '.lsx-notice-title',
		},
		noticeContent: {
			type: 'array',
			selector: '.lsx-notice-text',
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
	edit: LSXNoticeBlock,

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
				{ noticeDismiss && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				{ noticeTitle && (
					<div
						class="lsx-notice-title"
						style={ {
							color: noticeTitleColor
						} }
					>
						<RichText.Content
							tagName="p"
							value={ noticeTitle }
						/>
					</div>
				) }

				{ noticeContent && (
					<RichText.Content
						tagName="div"
						class="lsx-notice-text"
						style={ {
							borderColor: noticeBackgroundColor
						} }
						value={ noticeContent }
					/>
				) }
			</NoticeBox>
		);
	},
} );
