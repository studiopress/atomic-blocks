/**
 * BLOCK: Bloc Posts Shortcode Block
 *
 * Registering a blog post shortcode block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
//import Inspector from './inspector.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InspectorControls,
} = wp.editor;
const {
	PanelBody,
	SelectControl,
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
	image: {
		type: 'string',
		default: 'true',
	},
	carousel: {
		type: 'string',
		default: 'true',
	},
	display: {
		type: 'string',
		default: 'excerpt',
	},
	columns: {
		type: 'number',
		default: 3,
	},
	meta: {
		type: 'string',
		default: 'meta-on',
	},
	shortcodetitle: {
		type: 'string',
		default: 'Blog Posts',
	},
	category: {
		type: 'string',
		default: 'All',
	},
};

registerBlockType( 'lsx-blocks/post-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LSX BLOG POSTS Shortcode' ), // Block title.
	icon: 'screenoptions', // Block icon
	category: 'common', // Block category
	keywords: [
		__( 'LSX' ),
		__( 'BLOG' ),
		__( 'Shortcode' ),
	],
	attributes: blockAttributes,

	edit( { attributes, className, setAttributes } ) {
		const { image, category, carousel, columns, display, shortcodetitle, meta } = attributes;

		function onChangeTitle( updatedTitle ) {
			setAttributes( { shortcodetitle: updatedTitle } );
		}

		function onChangeCategory( updatedCategory ) {
			setAttributes( { category: updatedCategory } );
		}

		function onChangeCarousel( updatedCarousel ) {
			setAttributes( { carousel: updatedCarousel } );
		}

		function onChangeDisplay( updatedDisplay ) {
			setAttributes( { display: updatedDisplay } );
		}

		function onChangeImage( updatedImage ) {
			setAttributes( { image: updatedImage } );
		}

		function onChangeMeta( updatedMeta ) {
			setAttributes( { meta: updatedMeta } );
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
							<TextControl
								label={ __( 'Category Number' ) }
								type="text"
								value={ category }
								onChange={ onChangeCategory }
							/>
							<SelectControl
								label="Show Image"
								value={ image }
								options={ [
									{ label: 'Yes', value: 'true' },
									{ label: 'No', value: 'false' },
								] }
								onChange={ onChangeImage }
							/>
							<SelectControl
								label="Carousel"
								value={ carousel }
								options={ [
									{ label: 'Yes', value: 'true' },
									{ label: 'No', value: 'false' },
								] }
								onChange={ onChangeCarousel }
							/>
							<SelectControl
								label="Display"
								value={ display }
								options={ [
									{ label: 'Excerpt', value: 'excerpt' },
									{ label: 'Full Content', value: 'full' },
								] }
								onChange={ onChangeDisplay }
							/>
							<SelectControl
								label="Show Meta"
								value={ meta }
								options={ [
									{ label: 'Yes', value: 'meta-on' },
									{ label: 'No', value: 'meta-off' },
								] }
								onChange={ onChangeMeta }
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
					<h2 className="lsx-title">{ shortcodetitle }</h2>
				</div>
				<div>
					[lsx_posts back columns=&quot;{ columns }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ image }&quot; display=&quot;{ display }&quot; taxonomy=&quot;{ category }&quot; ]
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { image, category, carousel, columns, display, shortcodetitle, meta } = attributes;
		return (
			<div className={ className }>
				<div>
					<h2 className="lsx-title">{ shortcodetitle }</h2>
				</div>
				<div className={ meta }>
					[lsx_posts back columns=&quot;{ columns }&quot; carousel=&quot;{ carousel }&quot; show_image=&quot;{ image }&quot; display=&quot;{ display }&quot; taxonomy=&quot;{ category }&quot; ]
				</div>
			</div>
		);
	},
} );
