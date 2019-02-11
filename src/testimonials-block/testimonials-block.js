/**
 * BLOCK: Testimonials Shortcode Block
 *
 * Registering a testimonials shortcode block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
//import Inspector from './inspector.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InspectorControls,
	AlignmentToolbar,
} = wp.editor;
const {
	PanelBody,
	RangeControl,
	TextControl,
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
	alignment: {
		type: 'string',
		default: 'center',
	},
	columns: {
		type: 'number',
		default: 3,
	},
	shortcodetitle: {
		type: 'string',
		default: 'Testimonials',
	},
};

registerBlockType( 'lsx-blocks/testimonials-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LSX Testimonials Shortcode' ), // Block title.
	icon: 'format-quote', // Block icon
	category: 'common', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'TESTIMONIALS' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { alignment, columns, shortcodetitle } = attributes;

		function onChangeTitle( updatedTitle ) {
			setAttributes( { shortcodetitle: updatedTitle } );
		}

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
							<TextControl
								label={ __( 'Title' ) }
								type="text"
								value={ shortcodetitle }
								onChange={ onChangeTitle }
							/>
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
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
					[lsx_testimonials back columns=&quot;{ columns }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { alignment, columns, shortcodetitle } = attributes;
		return (
			<div className={ className }>
				<div>
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
					[lsx_testimonials back columns=&quot;{ columns }&quot; ]
				</div>
			</div>
		);
	},
} );
