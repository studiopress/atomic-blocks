/**
 * BLOCK: Basic
 *
 * FAQ's Block
 *
 * Styles:
 *        faq-editor.css — Editor styles for the block.
 *        faq-style.css  — Editor & Front end styles for the block.
 */

( function( blocks, element, editor, components, i18n ) {
	const { registerBlockType } = blocks;
	const { RichText } = editor;
	const { createElement } = element;
	const { InspectorControls } = editor;
	const { SelectControl, ToggleControl } = components;
	const { __ } = i18n;

	registerBlockType( 'lsx-blocks/faq-block', { // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		title: __( 'LSX FAQ Block', 'lsx-blocks' ), // Block title.
		icon: 'format-status', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
		category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
		customClassName: false,
		className: false,
		attributes: {
			question: {
				source: 'children',
				selector: '.faq-question',
				default: 'Question...'
			},
			answer: {
				source: 'children',
				selector: '.tab-content',
				default: 'Answer...'
			},
		},

		save: function( props ) {
			const question = props.attributes.question;
			const answer = props.attributes.answer;
			const container = createElement(
				'div', { className: 'faq-block' }, 
				React.createElement('div', { className: 'tab-question' },
					createElement( RichText.Content, { tagName: 'h3', className: 'faq-question', value: question })
				),
				React.createElement('div', { className: 'tab-answer' },
					createElement( RichText.Content, { tagName: 'p', className: 'tab-content', value: answer })
				)
			);
			return container;
		},

		edit: function( props ) {
			const question = props.attributes.question;
			const answer = props.attributes.answer;
			const focus = props.focus;

			function onChangeQuestion( newContent ) {
				props.setAttributes( { question: newContent } );
			}

			function onChangeAnswer( newContent ) {
				props.setAttributes( { answer: newContent } );
			}

			const editQuestion = createElement(
				RichText,
				{
					tagName: 'h3',
					onChange: onChangeQuestion,
					value: question,
					focus: focus,
					onFocus: props.setFocus,
				}
			);
			const editAnswer = createElement(
				RichText,
				{
					tagName: 'p',
					onChange: onChangeAnswer,
					value: answer,
					focus: focus,
					onFocus: props.setFocus,
				}
			);
			return createElement(
				'div', { key: 'faq-block-div', className: 'faq-block' },
				editQuestion, 
				editAnswer
			);
		},
	} );
})(
	window.wp.blocks, 
	window.wp.element,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
