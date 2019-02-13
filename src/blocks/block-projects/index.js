/**
 * BLOCK: Projects Shortcode Block
 *
 * Registering a projects shortcode block with Gutenberg.
 */

// Import styles
import './styles/style.scss';
import './styles/editor.scss';
//import Inspector from './inspector.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InspectorControls,
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
	columns: {
		type: 'number',
		default: 3,
	},
	shortcodetitle: {
		type: 'string',
		default: 'Our Projects',
	},
	shortcodeSubtitle: {
		type: 'string',
		default: 'Some of our projects...',
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
	carousel: {
		type: 'string',
		default: 'true',
	},
	showimage: {
		type: 'string',
		default: 'true',
	},
	include: {
		type: 'string',
		default: '',
	},
};

registerBlockType( 'lsx-blocks/block-projects', {
	title: __( 'LSX Projects Shortcode' ), // Block title.
	icon: 'portfolio', // Block icon
	category: 'lsx-blocks', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'PROJECTS' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { columns, shortcodetitle, shortcodeSubtitle, displaylimit, displayorder, orderby, carousel, showimage, include } = attributes;

		function onChangeTitle( updatedTitle ) {
			setAttributes( { shortcodetitle: updatedTitle } );
		}

		function onChangeSubTitle( updatedSubTitle ) {
			setAttributes( { shortcodeSubtitle: updatedSubTitle } );
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

		// Orderby options
		const orderbyOptions = [
			{ value: 'none', label: __( 'None' ) },
			{ value: 'ID', label: __( 'Post ID' ) },
			{ value: 'name', label: __( 'Name' ) },
			{ value: 'date', label: __( 'Date' ) },
		];

		// Carousel options
		const carouselOptions = [
			{ value: 'true', label: __( 'Yes' ) },
			{ value: 'false', label: __( 'No' ) },
		];

		// Show Image options
		const showimageOptions = [
			{ value: 'true', label: __( 'Yes' ) },
			{ value: 'false', label: __( 'No' ) },
		];

		return (
			<div>
				{
					<InspectorControls key="inspector">
						<PanelBody title={ __( 'Shortcode Settings test' ) } >
							<TextControl
								label={ __( 'Title' ) }
								type="text"
								value={ shortcodetitle }
								onChange={ onChangeTitle }
							/>
							<TextControl
								label={ __( 'Subtitle' ) }
								type="text"
								value={ shortcodeSubtitle }
								onChange={ onChangeSubTitle }
							/>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ columns }
								onChange={ onChangeColumns }
								min={ 1 }
								max={ 6 }
							/>
							<TextControl
								label={ __( 'Display Limit' ) }
								value={ displaylimit }
								onChange={ onChangeLimit }
							/>
							<TextControl
								label={ __( 'Display Order (Choose between ASC or DESC' ) }
								value={ displayorder }
								onChange={ onChangeOrder }
							/>
							<TextControl
								label={ __( 'Include only from comma seperated List of IDs' ) }
								value={ include }
								onChange={ onChangeInclude }
							/>
							<SelectControl
								label={ __( 'Orderby' ) }
								description={ __( 'Choose the parameter you wish your projects to be ordered by' ) }
								options={ orderbyOptions }
								value={ orderby }
								onChange={ ( value ) => setAttributes( { orderby: value } ) }
							/>
							<SelectControl
								label={ __( 'Carousel' ) }
								description={ __( 'Choose if the projects will show as carousel' ) }
								options={ carouselOptions }
								value={ carousel }
								onChange={ ( value ) => setAttributes( { carousel: value } ) }
							/>
							<SelectControl
								label={ __( 'Show Project Image' ) }
								description={ __( 'Choose if the projects will show the project image' ) }
								options={ showimageOptions }
								value={ showimage }
								onChange={ ( value ) => setAttributes( { showimage: value } ) }
							/>

						</PanelBody>
					</InspectorControls>
				}
				<div className={ className }>
					<h2 className="lsx-title">{ shortcodetitle }<small>{ shortcodeSubtitle }</small></h2>
				</div>
				<div className="lsx-testimonial-body">
						[lsx_projects back columns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; order=&quot;{ displayorder }&quot; orderby=&quot;{ orderby }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ showimage }&quot; include=&quot;{ include }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { columns, shortcodetitle, shortcodeSubtitle, displaylimit, displayorder, orderby, carousel, showimage, include } = attributes;
		return (
			<div className={ className }>
				{ shortcodetitle && (
					<div>
						<h2 className="lsx-title">{ shortcodetitle }<small>{ shortcodeSubtitle }</small></h2>
					</div>
				) }
				<div className="lsx-testimonial-body">
						[lsx_projects back columns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; order=&quot;{ displayorder }&quot; orderby=&quot;{ orderby }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ showimage }&quot; include=&quot;{ include }&quot; ]
				</div>
			</div>
		);
	},
} );
