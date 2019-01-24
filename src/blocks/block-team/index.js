/**
 * BLOCK: Team Members Shortcode Block
 *
 * Registering a team members shortcode block with Gutenberg.
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
		default: 2,
	},
	shortcodetitle: {
		type: 'string',
		default: 'Team',
	},
	displaylimit: {
		type: 'string',
		default: '',
	},
	displayexcerpt: {
		type: 'string',
		default: 'excerpt',
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
	imagesize: {
		type: 'number',
		default: 150,
	},
};

registerBlockType( 'lsx-blocks/block-team', {
	title: __( 'LSX Team Members Shortcode' ), // Block title.
	icon: 'groups', // Block icon
	category: 'lsx-blocks', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'Team Members' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { alignment, columns, shortcodetitle, displaylimit, displayexcerpt, orderby, carousel, showimage, include, imagesize } = attributes;

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

		function onChangeExcerpt( updatedExcerpt ) {
			setAttributes( { displayexcerpt: updatedExcerpt } );
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
								onChange={ onChangeLimit }
							/>
							<TextControl
								label={ __( 'Display Excerpt? (Choose between "excerpt" or "full"' ) }
								value={ displayexcerpt }
								onChange={ onChangeExcerpt }
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
								description={ __( 'Choose the parameter you wish your teams to be ordered by' ) }
								options={ orderbyOptions }
								value={ orderby }
								onChange={ ( value ) => setAttributes( { orderby: value } ) }
							/>
							<SelectControl
								label={ __( 'Carousel' ) }
								description={ __( 'Choose if the teams will show as carousel' ) }
								options={ carouselOptions }
								value={ carousel }
								onChange={ ( value ) => setAttributes( { carousel: value } ) }
							/>
							<SelectControl
								label={ __( 'Show Avatar' ) }
								description={ __( 'Choose if the teams will show the avatar' ) }
								options={ showimageOptions }
								value={ showimage }
								onChange={ ( value ) => setAttributes( { showimage: value } ) }
							/>

						</PanelBody>
					</InspectorControls>
				}
				<div className={ className }>
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
						[lsx_team back columns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; display=&quot;{ displayexcerpt }&quot; orderby=&quot;{ orderby }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ showimage }&quot; include=&quot;{ include }&quot; size=&quot;{ imagesize }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { alignment, columns, shortcodetitle, displaylimit, displayexcerpt, orderby, carousel, showimage, include, imagesize } = attributes;
		return (
			<div className={ className }>
				<div>
					<h2 className="lsx-title" style={ { textAlign: alignment } }>{ shortcodetitle }</h2>
				</div>
				<div style={ { textAlign: alignment } }>
						[lsx_team back columns=&quot;{ columns }&quot; limit=&quot;{ displaylimit }&quot; display=&quot;{ displayexcerpt }&quot; orderby=&quot;{ orderby }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ showimage }&quot; include=&quot;{ include }&quot; size=&quot;{ imagesize }&quot; ]
				</div>
			</div>
		);
	},
} );
