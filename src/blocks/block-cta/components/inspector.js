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
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	FormToggle,
	RangeControl,
	SelectControl,
	ToggleControl,
	IconButton,
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
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonShape, buttonTarget, ctaTitle, ctaText, ctaTitleFontSize, ctaTextFontSize, ctaBackgroundColor, ctaTextColor, dimRatio, imgURL, imgID, imgAlt } = this.props.attributes;
		const { setAttributes } = this.props;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'lsx-button-size-small', label: __( 'Small' ) },
			{ value: 'lsx-button-size-medium', label: __( 'Medium' ) },
			{ value: 'lsx-button-size-large', label: __( 'Large' ) },
			{ value: 'lsx-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'lsx-button-shape-square', label: __( 'Square' ) },
			{ value: 'lsx-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'lsx-button-shape-circular', label: __( 'Circular' ) },
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

		// Change the image
		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		// Clear the image
		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		}

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { ctaBackgroundColor: value } );
		const onChangeTextColor = value => setAttributes( { ctaTextColor: value } );
		const onChangeButtonColor = value => setAttributes( { buttonBackgroundColor: value } );
		const onChangeButtonShadowColor = value => setAttributes( { buttonShadowColor: value } );
		const onChangeButtonHoverColor = value => setAttributes( { buttonHoverColor: value } );
		const onChangeButtonTextColor = value => setAttributes( { buttonTextColor: value } );

		const onChangectaTitleFontSize = value => setAttributes( { ctaTitleFontSize: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Text Options' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Title Font Size' ) }
						value={ ctaTitleFontSize }
						onChange={ onChangectaTitleFontSize }
						min={ 24 }
						max={ 60 }
						step={ 2 }
					/>

					<RangeControl
						label={ __( 'Text Font Size' ) }
						value={ ctaTextFontSize }
						onChange={ ( value ) => this.props.setAttributes( { ctaTextFontSize: value } ) }
						min={ 14 }
						max={ 24 }
						step={ 2 }
					/>

					<PanelColorSettings
						title={ __( 'Text Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: ctaTextColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color' ),
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>

				<PanelBody title={ __( 'Background Options' ) } initialOpen={ false }>
					<p>{ __( 'Select a background image:' ) }</p>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imgID }
						render={ ( { open } ) => (
							<div>
								<IconButton
									className="lsx-cta-inspector-media"
									label={ __( 'Edit image' ) }
									icon="format-image"
									onClick={ open }
								>
									{ __( 'Select Image' ) }
								</IconButton>

								{ imgURL && !! imgURL.length && (
									<IconButton
										className="lsx-cta-inspector-media"
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

					{ imgURL && !! imgURL.length && (
						<RangeControl
							label={ __( 'Image Opacity' ) }
							value={ dimRatio }
							onChange={ ( value ) => this.props.setAttributes( { dimRatio: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
					) }

					<PanelColorSettings
						title={ __( 'Background Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: ctaBackgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Overlay Color' ),
							colors: buttonColors,
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>

				<PanelBody title={ __( 'Button Options' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Open link in new window' ) }
						checked={ buttonTarget }
						onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
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
						options={ buttonShapeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
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
			</InspectorControls>
		);
	}
}
