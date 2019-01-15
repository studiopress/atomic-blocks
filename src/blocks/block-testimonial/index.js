/**
 * BLOCK: Testimonials Shortcode Block
 *
 * Registering a testimonials shortcode block with Gutenberg.
 */

// Import styles
import './styles/style.scss';
import './styles/editor.scss';
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
	SelectControl,
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
		default: 'Testimonial',
	},
	displaylimit: {
		type: 'string',
		default: '',
	},
		displayorder: {
		type: 'string',
		default: 'ASC',
	},
	orderby: {
         type: 'string',
         default: 'none',
        },
    include: {
        type: 'string',
        default: '',
        },
       imagesize: {
		type: 'number',
		default: 150,
	},
};

registerBlockType( 'lsx-blocks/block-testimonials', {
	title: __( 'LSX Testimonials Shortcode' ), // Block title.
	icon: 'format-quote', // Block icon
	category: 'lsx-blocks', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'TESTIMONIALS' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { alignment, columns, shortcodetitle, displaylimit, displayorder, orderby, include, imagesize } = attributes;

		function onChangeTitle( updatedTitle ) {
			setAttributes( { shortcodetitle: updatedTitle } );
		}

		function onChangeAlignment( updatedAlignment ) {
			setAttributes( { alignment: updatedAlignment } );
		}

		function onChangeColumns( updatedColumns ) {
			setAttributes( { columns: updatedColumns } );
		}
		
		function onChangeLimit( updatedLimit ) {
			setAttributes( { displaylimit: updatedLimit } );
		}
		
		function onChangeOrder( updatedOrder ) {
			setAttributes( { displayorder: updatedOrder } );
		}
		
		function onChangeInclude( updatedInclude ) {
			setAttributes( { include: updatedInclude } );
		}
		
		function onChangeImagesize( updatedImagesize ) {
			setAttributes( { imagesize: updatedImagesize } );
		}
		// Orderby options
		const orderbyOptions = [
			{ value: 'none', label: __( 'None' ) },
			{ value: 'ID', label: __( 'Post ID' ) },
			{ value: 'name', label: __( 'Name' ) },
			{ value: 'date', label: __( 'Date' ) },
		];

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
							<RangeControl
								label={ __( 'Columns' ) }
								value={ columns }
								onChange={ onChangeColumns }
								min={ 1 }
								max={ 6 }
							/>
							<AlignmentToolbar
								value={ alignment }
								onChange={ onChangeAlignment }
							/>
							 <TextControl
								label={ __( 'Display Limit' ) }
								value={ displaylimit }
								onChange={ onChangeOrder }
							/>
							<TextControl
								label={ __( 'Display Order (Choose between ASC or DESC' ) }
								value={ displayorder }
								onChange={ onChangeLimit }
							/>
							<TextControl
								label={ __( 'Include only from comma seperated List of IDs' ) }
								value={ include }
								onChange={ onChangeInclude }
							/>
							<RangeControl
								label={ __( 'Image Size' ) }
								value={ imagesize }
								onChange={ onChangeImagesize }
								min={ 100 }
								max={ 300 }
							/>
							<SelectControl
								label={ __( 'Orderby' ) }
								description={ __( 'Choose the parameter you wish your testimonials to be ordered by' ) }
								options={ orderbyOptions }
								value={ orderby }
								onChange={ ( value ) => setAttributes( { orderby: value } ) }
							/>

						</PanelBody>
					</InspectorControls>
				}
				<div className={ className }>
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
						[lsx_team back colns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; order=&quot;{ displayorder }&quot; orderby=&quot;{ orderby }&quot; include=&quot;{ include }&quot; size=&quot;{ imagesize }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { alignment, columns, shortcodetitle, displaylimit, displayorder, orderby, include, imagesize  } = attributes;
		return (
			<div className={ className }>
				<div>
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
						[lsx_team back colns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; order=&quot;{ displayorder }&quot; orderby=&quot;{ orderby }&quot; include=&quot;{ include }&quot; size=&quot;{ imagesize }&quot; ]
				</div>
			</div>
		);
	},
} );
