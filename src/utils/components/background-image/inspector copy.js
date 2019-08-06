const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
	PanelBody,
	RangeControl,
	IconButton,
	FocalPointPicker,
	ToggleControl
} = wp.components;
const {
	PanelColorSettings,
	MediaUpload
} = wp.editor;

export default function BackgroundImageSettings( props ) {
	const {
		enableButtonBackgroundColor,
		buttonBackgroundColor,
		onChangeButtonColor = () => {},
		enableButtonTextColor,
		buttonTextColor,
		onChangeButtonTextColor = () => {},
		enableButtonSize,
		buttonSize,
		onChangeButtonSize = () => {},
		enableButtonShape,
		buttonShape,
		onChangeButtonShape = () => {},
		enableButtonTarget,
		buttonTarget,
		onChangeButtonTarget = () => {}
	} = props;

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
		<Fragment>
			<PanelBody title={ __( 'Background Options', 'atomic-blocks' ) } initialOpen={ false }>
				<p>{ __( 'Select a background image:', 'atomic-blocks' ) }</p>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ backgroundImgID }
					render={ ({ open }) => (
						<div>
							<IconButton
								className="ab-container-inspector-media"
								label={ __( 'Edit image', 'atomic-blocks' ) }
								icon="format-image"
								onClick={ open }
							>
								{ __( 'Select Image', 'atomic-blocks' ) }
							</IconButton>

							{ backgroundImgURL && !! backgroundImgURL.length && (
								<IconButton
									className="ab-container-inspector-media"
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

				<ToggleControl
					label={ __( 'Fixed Background', 'atomic-blocks' ) }
					checked={ hasParallax }
					onChange={ toggleParallax }
				/>

				<FocalPointPicker
					label={ __( 'Focal Point Picker', 'atomic-blocks' ) }
					url={ url }
					value={ focalPoint }
					onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
				/>

				{ backgroundImgURL && !! backgroundImgURL.length && (
					<RangeControl
						label={ __( 'Image Opacity', 'atomic-blocks' ) }
						value={ backgroundDimRatio }
						onChange={ ( value ) => this.props.setAttributes({ backgroundDimRatio: value }) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				) }

				<PanelColorSettings
					title={ __( 'Background Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: backgroundColor,
						label: __( 'Background Color', 'atomic-blocks' ),
						onChange: onChangeBackgroundColor
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</Fragment>
	);
}
