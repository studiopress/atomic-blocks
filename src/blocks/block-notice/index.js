/**
 * BLOCK: Atomic Blocks Notice
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import NoticeBox from './components/notice';
import DismissButton from './components/button';
import icons from './components/icons';

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
	BlockControls
} = wp.editor;

class ABNoticeBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				noticeTitle,
				noticeContent,
				noticeAlignment,
				noticeBackgroundColor,
				noticeTitleColor,
				noticeDismiss
			},
			setAttributes
		} = this.props;

		return [

			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ noticeAlignment }
					onChange={ ( value ) => setAttributes({ noticeAlignment: value }) }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,

			// Show the block markup in the editor
			<NoticeBox { ...this.props }>
				{	// Check if the notice is dismissible and output the button
					( noticeDismiss && 'ab-dismissable' === noticeDismiss ) && (
					<DismissButton { ...this.props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				<RichText
					tagName="p"
					placeholder={ __( 'Notice Title', 'atomic-blocks' ) }
					keepPlaceholderOnFocus
					value={ noticeTitle }
					className={ classnames(
						'ab-notice-title'
					) }
					style={ {
						color: noticeTitleColor
					} }
					onChange={ ( value ) => setAttributes({ noticeTitle: value }) }
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add notice text...', 'atomic-blocks' ) }
					value={ noticeContent }
					className={ classnames(
						'ab-notice-text'
					) }
					style={ {
						borderColor: noticeBackgroundColor
					} }
					onChange={ ( value ) => setAttributes({ noticeContent: value }) }
				/>
			</NoticeBox>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-notice', {
	title: __( 'AB Notice', 'atomic-blocks' ),
	description: __( 'Add a stylized text notice.', 'atomic-blocks' ),
	icon: 'format-aside',
	category: 'atomic-blocks',
	keywords: [
		__( 'notice', 'atomic-blocks' ),
		__( 'message', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' )
	],
	attributes: {
		noticeTitle: {
			type: 'string',
			selector: '.ab-notice-title'
		},
		noticeContent: {
			type: 'array',
			selector: '.ab-notice-text',
			source: 'children'
		},
		noticeAlignment: {
			type: 'string'
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
            default: ''
        }
	},

	// Render the block components
	edit: ABNoticeBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			noticeTitle,
			noticeContent,
			noticeBackgroundColor,
			noticeTitleColor,
			noticeDismiss
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<NoticeBox { ...props }>
				{ ( noticeDismiss && 'ab-dismissable' === noticeDismiss ) && (
					<DismissButton { ...props }>
						{ icons.dismiss }
					</DismissButton>
				) }

				{ noticeTitle && (
					<div
						className="ab-notice-title"
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
						className="ab-notice-text"
						style={ {
							borderColor: noticeBackgroundColor
						} }
						value={ noticeContent }
					/>
				) }
			</NoticeBox>
		);
	}
});
