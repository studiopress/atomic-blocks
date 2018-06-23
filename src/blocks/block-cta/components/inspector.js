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
  MediaUpload,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	PanelColor,
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
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonTextColor, buttonSize, buttonShape, buttonTarget, ctaTitle, ctaText, ctaTitleFontSize, ctaTextFontSize, ctaBackgroundColor, ctaTextColor, dimRatio, imgURL, imgID, imgAlt } = this.props.attributes;
		const { setAttributes } = this.props;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'ab-button-size-small', label: __( 'Small' ) },
			{ value: 'ab-button-size-medium', label: __( 'Medium' ) },
			{ value: 'ab-button-size-large', label: __( 'Large' ) },
			{ value: 'ab-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'ab-button-shape-square', label: __( 'Square' ) },
			{ value: 'ab-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'ab-button-shape-circular', label: __( 'Circular' ) },
		];

		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		}

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Options' ) } initialOpen={ true }>
				<RangeControl
					label={ __( 'Title Font Size' ) }
					value={ ctaTitleFontSize }
					onChange={ ( value ) => this.props.setAttributes( { ctaTitleFontSize: value } ) }
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

				<PanelColor
					title={ __( 'Text Color' ) }
					colorValue={ ctaTextColor }
					initialOpen={ false }
				>
					<ColorPalette
						label={ __( 'Text Color' ) }
						value={ ctaTextColor }
						onChange={ ( value ) => this.props.setAttributes( { ctaTextColor: value } ) }
					/>
				</PanelColor>
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
								className="ab-cta-inspector-media"
								label={ __( 'Edit image' ) }
								icon="format-image"
								onClick={ open }
							>
								{ __( 'Select Image' ) }
							</IconButton>

							{ imgURL && !! imgURL.length && (
								<IconButton
									className="ab-cta-inspector-media"
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

				<PanelColor
					title={ __( 'Background Color' ) }
					colorValue={ ctaBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette
						label={ __( 'Background Color' ) }
						value={ ctaBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { ctaBackgroundColor: value } ) }
					/>
				</PanelColor>
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

				<PanelColor
					title={ __( 'Button Color' ) }
					colorValue={ buttonBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette
						label={ __( 'Button Color' ) }
						value={ buttonBackgroundColor }
						onChange={ ( value ) => { this.props.setAttributes( { buttonBackgroundColor: value } ) } }
						colors={[
							{ color: '#392F43', name: 'black' },
							{ color: '#3373dc', name: 'royal blue' },
							{ color: '#2DBAA3', name: 'teal' },
							{ color: '#209cef', name: 'sky blue' },
							{ color: '#2BAD59', name: 'green' },
							{ color: '#ff3860', name: 'pink' },
							{ color: '#7941b6', name: 'purple' },
							{ color: '#F7812B', name: 'orange' },
						]}
					/>
				</PanelColor>

				<PanelColor
					title={ __( 'Button Text Color' ) }
					colorValue={ buttonTextColor }
					initialOpen={ false }
				>
					<ColorPalette
						label={ __( 'Button Text Color' ) }
						value={ buttonTextColor }
						onChange={ ( value ) => { this.props.setAttributes( { buttonTextColor: value } ) } }
						colors={[
							{ color: '#32373c', name: 'black' },
							{ color: '#fff', name: 'white' },
						]}
					/>
				</PanelColor>
			</PanelBody>
		</InspectorControls>
		);
	}
}
