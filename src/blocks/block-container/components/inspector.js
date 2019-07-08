/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
  PanelColorSettings,
  MediaUpload
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	FormToggle,
	RangeControl,
	SelectControl,
	ToggleControl,
	IconButton
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerMaxWidth, containerBackgroundColor, containerDimRatio, containerImgURL, containerImgID, containerImgAlt } = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null
			});
		};

		// Update color values
		const onChangeBackgroundColor = value => setAttributes({ containerBackgroundColor: value });

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Container Options' ) } initialOpen={ true }>
				<RangeControl
					label={ __( 'Padding Top (%)' ) }
					value={ containerPaddingTop }
					onChange={ ( value ) => this.props.setAttributes({ containerPaddingTop: value }) }
					min={ 0 }
					max={ 30 }
					step={ .5 }
				/>

				<RangeControl
					label={ __( 'Padding Bottom (%)' ) }
					value={ containerPaddingBottom }
					onChange={ ( value ) => this.props.setAttributes({ containerPaddingBottom: value }) }
					min={ 0 }
					max={ 30 }
					step={ .5 }
				/>

				<RangeControl
					label={ __( 'Padding Left (%)' ) }
					value={ containerPaddingLeft }
					onChange={ ( value ) => this.props.setAttributes({ containerPaddingLeft: value }) }
					min={ 0 }
					max={ 30 }
					step={ .5 }
				/>

				<RangeControl
					label={ __( 'Padding Right (%)' ) }
					value={ containerPaddingRight }
					onChange={ ( value ) => this.props.setAttributes({ containerPaddingRight: value }) }
					min={ 0 }
					max={ 30 }
					step={ .5 }
				/>

				<RangeControl
					label={ __( 'Margin Top (%)' ) }
					value={ containerMarginTop }
					onChange={ ( value ) => this.props.setAttributes({ containerMarginTop: value }) }
					min={ 0 }
					max={ 30 }
					step={ 1 }
				/>

				<RangeControl
					label={ __( 'Margin Bottom (%)' ) }
					value={ containerMarginBottom }
					onChange={ ( value ) => this.props.setAttributes({ containerMarginBottom: value }) }
					min={ 0 }
					max={ 30 }
					step={ .5 }
				/>

				<RangeControl
					label={ __( 'Inside Container Max Width (px)' ) }
					value={ containerMaxWidth }
					onChange={ ( value ) => this.props.setAttributes({ containerMaxWidth: value }) }
					min={ 500 }
					max={ 1600 }
					step={ 1 }
				/>
			</PanelBody>

			<PanelBody title={ __( 'Background Options' ) } initialOpen={ false }>
				<p>{ __( 'Select a background image:' ) }</p>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ containerImgID }
					render={ ({ open }) => (
						<div>
							<IconButton
								className="ab-container-inspector-media"
								label={ __( 'Edit image' ) }
								icon="format-image"
								onClick={ open }
							>
								{ __( 'Select Image' ) }
							</IconButton>

							{ containerImgURL && !! containerImgURL.length && (
								<IconButton
									className="ab-container-inspector-media"
									label={ __( 'Remove Image' ) }
									icon="dismiss"
									onClick={ onRemoveImage }
								>
									{ __( 'Remove' ) }
								</IconButton>
							) }
						</div>
					) }
				>
				</MediaUpload>

				{ containerImgURL && !! containerImgURL.length && (
					<RangeControl
						label={ __( 'Image Opacity' ) }
						value={ containerDimRatio }
						onChange={ ( value ) => this.props.setAttributes({ containerDimRatio: value }) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				) }

				<PanelColorSettings
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: containerBackgroundColor,
						label: __( 'Background Color' ),
						onChange: onChangeBackgroundColor
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</InspectorControls>
		);
	}
}
