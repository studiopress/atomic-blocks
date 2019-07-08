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
		const {
			buttonText,
			buttonUrl,
			buttonAlignment,
			buttonBackgroundColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonTarget,
			ctaTitle,
			ctaText,
			titleFontSize,
			ctaTextFontSize,
			ctaBackgroundColor,
			ctaTextColor,
			dimRatio,
			imgURL,
			imgID,
			imgAlt
		} = this.props.attributes;
		const { setAttributes } = this.props;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'ab-button-size-small', label: __( 'Small' ) },
			{ value: 'ab-button-size-medium', label: __( 'Medium' ) },
			{ value: 'ab-button-size-large', label: __( 'Large' ) },
			{ value: 'ab-button-size-extralarge', label: __( 'Extra Large' ) }
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'ab-button-shape-square', label: __( 'Square' ) },
			{ value: 'ab-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'ab-button-shape-circular', label: __( 'Circular' ) }
		];

		// Change the image
		const onSelectImage = img => {
			setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt
			});
		};

		// Clear the image
		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null
			});
		};

		// Update color values
		const onChangeBackgroundColor = value => setAttributes({ ctaBackgroundColor: value });
		const onChangeTextColor = value => setAttributes({ ctaTextColor: value });
		const onChangeButtonColor = value => setAttributes({ buttonBackgroundColor: value });
		const onChangeButtonTextColor = value => setAttributes({ buttonTextColor: value });

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Options', 'atomic-blocks' ) } initialOpen={ true }>
				<RangeControl
					label={ __( 'Title Font Size', 'atomic-blocks' ) }
					value={ titleFontSize }
					onChange={ ( value ) => this.props.setAttributes({ titleFontSize: value }) }
					min={ 24 }
					max={ 60 }
					step={ 2 }
				/>

				<RangeControl
					label={ __( 'Text Font Size', 'atomic-blocks' ) }
					value={ ctaTextFontSize }
					onChange={ ( value ) => this.props.setAttributes({ ctaTextFontSize: value }) }
					min={ 14 }
					max={ 24 }
					step={ 2 }
				/>

				<PanelColorSettings
					title={ __( 'Text Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: ctaTextColor,
						onChange: onChangeTextColor,
						label: __( 'Text Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>

			<PanelBody title={ __( 'Background Options', 'atomic-blocks' ) } initialOpen={ false }>
				<p>{ __( 'Select a background image:', 'atomic-blocks' ) }</p>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ imgID }
					render={ ({ open }) => (
						<div>
							<IconButton
								className="ab-cta-inspector-media"
								label={ __( 'Edit image', 'atomic-blocks' ) }
								icon="format-image"
								onClick={ open }
							>
								{ __( 'Select Image', 'atomic-blocks' ) }
							</IconButton>

							{ imgURL && !! imgURL.length && (
								<IconButton
									className="ab-cta-inspector-media"
									label={ __( 'Remove Image', 'atomic-blocks' ) }
									icon="dismiss"
									onClick={ onRemoveImage }
								>
									{ __( 'Remove', 'atomic-blocks' ) }
								</IconButton>
							) }
						</div>
					) }
				>
				</MediaUpload>

				{ imgURL && !! imgURL.length && (
					<RangeControl
						label={ __( 'Image Opacity', 'atomic-blocks' ) }
						value={ dimRatio }
						onChange={ ( value ) => this.props.setAttributes({ dimRatio: value }) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				) }

				<PanelColorSettings
					title={ __( 'Background Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: ctaBackgroundColor,
						onChange: onChangeBackgroundColor,
						label: __( 'Overlay Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>

			<PanelBody title={ __( 'Button Options', 'atomic-blocks' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Open link in new window', 'atomic-blocks' ) }
					checked={ buttonTarget }
					onChange={ () => this.props.setAttributes({ buttonTarget: ! buttonTarget }) }
				/>

				<SelectControl
					label={ __( 'Button Size', 'atomic-blocks' ) }
					value={ buttonSize }
					options={ buttonSizeOptions.map( ({ value, label }) => ({
						value: value,
						label: label
					}) ) }
					onChange={ ( value ) => {
 this.props.setAttributes({ buttonSize: value });
} }
				/>

				<SelectControl
					label={ __( 'Button Shape', 'atomic-blocks' ) }
					value={ buttonShape }
					options={ buttonShapeOptions.map( ({ value, label }) => ({
						value: value,
						label: label
					}) ) }
					onChange={ ( value ) => {
 this.props.setAttributes({ buttonShape: value });
} }
				/>

				<PanelColorSettings
					title={ __( 'Button Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonBackgroundColor,
						onChange: onChangeButtonColor,
						label: __( 'Button Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings
					title={ __( 'Button Text Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: buttonTextColor,
						onChange: onChangeButtonTextColor,
						label: __( 'Button Text Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</InspectorControls>
		);
	}
}
