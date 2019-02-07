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
	MediaUpload,
} = wp.editor;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	IconButton,
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { bannerName, bannerTitle, bannerContent, bannerAlignment, bannerImgID, bgPosition, bannerFontSize, bannerHeight, bannerBackgroundColor, bannerImgURL, bannerTextColor, textBannerBackgroundColor, bannerFontOpacity, bannerLinkColor, bannerTitlePosition, buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonShape, buttonGhost, buttonTarget, buttonFlat } = this.props.attributes;
		const { setAttributes } = this.props;

		// Image shape options
		const bannerTitlePositionOptions = [
			{ value: 'title-centered', label: __( 'Centered' ) },
			{ value: 'title-bottom', label: __( 'Bottom' ) },
		];

		// Image position
		const bgPositionOptions = [
			{ value: 'lsx-container-bottom', label: __( 'Bottom' ) },
			{ value: 'lsx-container-top', label: __( 'Top' ) },
			{ value: 'lsx-container-center', label: __( 'Center' ) },
			{ value: 'lsx-container-left', label: __( 'Left' ) },
			{ value: 'lsx-container-right', label: __( 'Right' ) },
			{ value: 'lsx-container-initial', label: __( 'Clear' ) },
		];

		// Upload Image options
		const onSelectImage = img => {
			setAttributes( {
				bannerImgID: img.id,
				bannerImgURL: img.url,
				bannerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				bannerImgID: null,
				bannerImgURL: null,
				bannerImgAlt: null,
			} );
		};

		// Button size values
		const buttonSizeOptions = [
			{ value: 'lsx-button-size-small', label: __( 'Small' ) },
			{ value: 'lsx-button-size-medium', label: __( 'Medium' ) },
			{ value: 'lsx-button-size-large', label: __( 'Large' ) },
			{ value: 'lsx-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		const buttonFlatOptions = [
			{ value: 'lsx-button-flat', label: __( 'Yes' ) },
			{ value: 'lsx-button-normal', label: __( 'No' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'lsx-button-shape-square', label: __( 'Square' ) },
			{ value: 'lsx-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'lsx-button-shape-circular', label: __( 'Circular' ) },
		];

		const buttonGhostOptions = [
			{ value: 'lsx-button-border-btn', label: __( 'Border' ) },
			{ value: 'lsx-button-no-border', label: __( 'No Border' ) },
		];
		// Button colors
		const buttonColors = [
			{ color: '#F7941D', name: 'yellow' },
			{ color: '#C4771B', name: 'dark yellow' },
			{ color: '#418AD0', name: 'blue' },
			{ color: '#27639D', name: 'dark blue' },
			{ color: '#6BA913', name: 'green' },
			{ color: '#3f640b', name: 'dark green' },
			{ color: '#000000', name: 'black' },
			{ color: '#ffffff', name: 'white' },
		];

		// Update color values
		const onChangeButtonColor = value => setAttributes( { buttonBackgroundColor: value } );
		const onChangeButtonShadowColor = value => setAttributes( { buttonShadowColor: value } );
		const onChangeButtonHoverColor = value => setAttributes( { buttonHoverColor: value } );
		const onChangeButtonTextColor = value => setAttributes( { buttonTextColor: value } );

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { bannerBackgroundColor: value } );

		const onChangeBannerTextColor = value => setAttributes( { bannerTextColor: value } );

		const onChangeTextBackgroundColor = value => setAttributes( { textBannerBackgroundColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ bannerFontSize }
						onChange={ ( value ) => this.props.setAttributes( { bannerFontSize: value } ) }
						min={ 20 }
						max={ 60 }
						step={ 1 }
					/>

					<SelectControl
						label={ __( 'Banner content position' ) }
						description={ __( 'Choose between the banner title on top or bottom of the image' ) }
						options={ bannerTitlePositionOptions }
						value={ bannerTitlePosition }
						onChange={ ( value ) => this.props.setAttributes( { bannerTitlePosition: value } ) }
					/>

					<RangeControl
						label={ __( 'Background Height' ) }
						value={ bannerHeight }
						onChange={ ( value ) => this.props.setAttributes( { bannerHeight: value } ) }
						min={ 20 }
						max={ 100 }
						step={ 1 }
					/>
					<PanelBody title={ __( 'Banner image' ) } initialOpen={ true }>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ bannerImgID }
							render={ ( { open } ) => (
								<div>
									<IconButton
										className="lsx-banner-inspector-media"
										label={ __( 'Edit image' ) }
										icon="format-image"
										onClick={ open }
									>
										{ __( 'Select Image' ) }
									</IconButton>

									{ bannerImgURL && !! bannerImgURL.length && (
										<IconButton
											className="lsx-banner-inspector-media"
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
						{/* { bannerImgURL && (
							<SelectControl
								label={ __( 'Background Image Position' ) }
								options={ bgPositionOptions }
								value={ bgPosition }
								onChange={ ( value ) => setAttributes( { bgPosition: value } ) }
							/>
						) } */}
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Background Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: bannerBackgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings
						title={ __( 'Text Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: bannerTextColor,
							onChange: onChangeBannerTextColor,
							label: __( 'Text Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings
						title={ __( 'Text Background Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: textBannerBackgroundColor,
							onChange: onChangeTextBackgroundColor,
							label: __( 'Text Background Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelBody title={ __( 'Text Background Opacity' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Text Background Opacity' ) }
							value={ bannerFontOpacity }
							onChange={ ( value ) => this.props.setAttributes( { bannerFontOpacity: value } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Button Options' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Open link in new window' ) }
							checked={ buttonTarget }
							onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
						/>

						<SelectControl
							label={ __( 'Flat Button?' ) }
							value={ buttonFlat }
							options={ buttonFlatOptions.map( ({ value, label }) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonFlat: value } ) } }
						/>

						<SelectControl
							label={ __( 'Button Size' ) }
							value={ buttonSize }
							options={ buttonSizeOptions.map( ({ value, label }) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonSize: value } ) } }
						/>

						<SelectControl
							label={ __( 'Button Shape' ) }
							value={ buttonShape }
							options={ buttonShapeOptions.map( ( { value, label } ) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
						/>

						<SelectControl
							label={ __( 'Ghost Button' ) }
							value={ buttonGhost }
							options={ buttonGhostOptions.map( ( { value, label } ) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonGhost: value } ) } }
						/>

						<PanelColorSettings
							title={ __( 'Button Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonBackgroundColor,
								onChange: onChangeButtonColor,
								label: __( 'Button Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Shadow Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonShadowColor,
								onChange: onChangeButtonShadowColor,
								label: __( 'Button Shadow Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Hover Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonHoverColor,
								onChange: onChangeButtonHoverColor,
								label: __( 'Button Hover Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Text Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonTextColor,
								onChange: onChangeButtonTextColor,
								label: __( 'Button Text Color' ),
							} ] }
						>
						</PanelColorSettings>
					</PanelBody>

				</PanelBody>

			</InspectorControls>
		);
	}
}
