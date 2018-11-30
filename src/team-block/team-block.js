/**
 * BLOCK: Team Shortcode Block
 *
 * Registering a team shortcode block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
//import Inspector from './inspector.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	InspectorControls,
	BlockControls,
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
	columns: {
		type: 'number',
		default: 3,
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

	edit( { attributes, className, setAttributes } ) {
		const { alignment, columns } = attributes;

		function onChangeAlignment( updatedAlignment ) {
			setAttributes( { alignment: updatedAlignment } );
		}

		function onChangeColumns( updatedColumns ) {
			setAttributes( { columns: updatedColumns } );
		}

		return (
			<div>
				{
					<InspectorControls key="inspector">
						<PanelBody title={ __( 'Shortcode Settings' ) } >
							<AlignmentToolbar
								value={ alignment }
								onChange={ onChangeAlignment }
							/>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ columns }
								onChange={ onChangeColumns }
								min={ 1 }
								max={ 6 }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className={ className }>
					<p style={ { textAlign: alignment } }>Toolbar control block example built with JSX.</p>
				</div>
				<div style={ { textAlign: alignment } }>
					[lsx_team back columns=&quot;{ columns }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { alignment, columns } = attributes;
		return (
			<div className={ className }>
				<div>
					<p style={ { textAlign: alignment } }>Toolbar control block example built with JSX.</p>
				</div>
				<div style={ { textAlign: alignment } }>
					[lsx_team back columns=&quot;{ columns }&quot; ]
				</div>
			</div>
		);
	},
} );
