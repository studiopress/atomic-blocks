/**
 * BLOCK: Team Shortcode Block
 *
 * Registering a team shortcode block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	InspectorControls,
	AlignmentToolbar,
} = wp.editor;
const {
	PanelBody,
	RangeControl,
	TextControl,
	Dashicon,
	Toolbar,
	Button,
	Tooltip,
} = wp.components;


/**
 * Register: a Gutenberg Block.
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	width: {
		type: 'string',
		default: 'center',
	},
	ctaBackgroundColor: {
		type: 'string',
		default: '#f2f2f2',
	},
	buttonAlignment: {
		type: 'string',
		default: 'center',
	},
};

registerBlockType( 'lsx-blocks/team-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LSX TEAM Shortcode' ), // Block title.
	icon: 'groups', // Block icon
	category: 'common', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'TEAM' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit: props => {
		const {
			attributes: {
				title,
				alignment,
				columns = 4,
			},
		} = props;

		const onChangeAlignment = newAlignment => {
			props.setAttributes( { alignment: newAlignment } );
		};

		const onChangeTitle = newTitle => {
			props.setAttributes( { title: newTitle } );
		};

		const onChangeColumns = newColumn => {
			props.setAttributes( { columns: newColumn } );
		};

		return (
			<div>
				<InspectorControls>
					<PanelBody title={ __( 'Shortcode Settings' ) } >
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
						<TextControl
							label={ __( 'Title' ) }
							placeholder={ 'Enter Title' }
							onChange={ onChangeTitle }
						/>
						<RangeControl
							label={ __( 'Columns' ) }
							initialPosition={ 3 }
							value={ columns }
							onChange={ onChangeColumns }
							min={ 1 }
							max={ 6 }
						/>
					</PanelBody>
				</InspectorControls>
				<div style={ { textAlign: alignment } }>
					[lsx_team title=&quot;{ title }&quot; columns=&quot;{ columns }&quot; ]
				</div>
			</div>
		);
	},

	save: props => {
		const {
			attributes: {
				title,
				columns,
			},
		} = props;

		return (
			<div className="lsx-team-container">
				[lsx_team title=&quot;{ title }&quot; columns=&quot;{ columns }&quot; ]
			</div>
		);
	},
} );
