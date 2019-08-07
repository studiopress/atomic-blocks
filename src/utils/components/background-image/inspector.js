const { __ } = wp.i18n;
const {
	Fragment,
	Component
} = wp.element;
const {
	PanelBody,
	RangeControl,
	IconButton,
	ButtonGroup,
	FocalPointPicker,
	ToggleControl,
	SelectControl
} = wp.components;
const {
	MediaUpload,
	MediaUploadCheck
} = wp.editor;

class BackgroundImagePanel extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			focalPoint,
			hasParallax,
			backgroundImgURL,
			backgroundDimRatio,
			backgroundRepeat,
			backgroundSize,
		} = attributes;

		const backgroundRepeatOptions = [
			{ value: 'no-repeat', label: __( 'No Repeat', 'atomic-blocks' ) },
			{ value: 'repeat', label: __( 'Repeat', 'atomic-blocks' ) },
			{ value: 'repeat-x', label: __( 'Repeat Horizontally', 'atomic-blocks' ) },
			{ value: 'repeat-y', label: __( 'Repeat Vertically', 'atomic-blocks' ) }
		];

		const backgroundSizeOptions = [
			{ value: 'auto', label: __( 'Auto', 'atomic-blocks' ) },
			{ value: 'cover', label: __( 'Cover', 'atomic-blocks' ) },
			{ value: 'contain', label: __( 'Contain', 'atomic-blocks' ) }
		];

		let backgroundSizeHelp;

		if ( backgroundSize === 'cover' ) {
			backgroundSizeHelp = __( 'Scales the image as large as possible without stretching the image. Cropped either vertically or horizontally so that no empty space remains.', 'atomic-blocks' );
		}
		if ( backgroundSize === 'contain' ) {
			backgroundSizeHelp = __( 'Scales the image as large as possible without cropping or stretching the image.', 'atomic-blocks' );
		}
		if ( backgroundSize === 'auto' ) {
			backgroundSizeHelp = __( 'Scales the background image in the corresponding direction such that its intrinsic proportions are maintained.', 'atomic-blocks' );
		}

		return (
			<Fragment>
				<PanelBody title={ __( 'Background Image', 'atomic-blocks' ) } initialOpen={ false }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( img ) => {
								setAttributes( {
									backgroundImgURL: img.url,
								} );
							} }
							type="image"
							value={ backgroundImgURL }
							render={ ({ open }) => (
								<div>
									<ButtonGroup
										className="ab-background-button-group"
									>
										<IconButton
											className="ab-inspector-icon-button ab-background-add-button is-button is-default"
											label={ __( 'Edit image', 'atomic-blocks' ) }
											icon="format-image"
											onClick={ open }
										>
											{ __( 'Select Image', 'atomic-blocks' ) }
										</IconButton>

										{ backgroundImgURL && (
											<IconButton
												className="ab-inspector-icon-button ab-background-remove-button is-button is-default"
												label={ __( 'Remove Image', 'atomic-blocks' ) }
												icon="dismiss"
												onClick={ () => setAttributes( { backgroundImgURL: null } ) }
											>
												{ __( 'Remove', 'atomic-blocks' ) }
											</IconButton>
										) }
									</ButtonGroup>
								</div>
							) }
						>
						</MediaUpload>
					</MediaUploadCheck>

					{ backgroundImgURL && (
						<Fragment>
							<FocalPointPicker
								label={ __( 'Focal Point', 'atomic-blocks' ) }
								url={ backgroundImgURL }
								value={ focalPoint }
								onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
							/>

							<RangeControl
								label={ __( 'Image Opacity', 'atomic-blocks' ) }
								value={ backgroundDimRatio }
								onChange={ ( value ) => this.props.setAttributes({
									backgroundDimRatio: value,
								}) }
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>

							<ToggleControl
								label={ __( 'Fixed Background', 'atomic-blocks' ) }
								checked={ hasParallax }
								onChange={ () => {
									setAttributes( {
										hasParallax: ! hasParallax,
										...( ! hasParallax ? { focalPoint: undefined } : {} ),
									} );
								} }
							/>

							{ backgroundRepeat === 'no-repeat' && (
								<SelectControl
									label={ __( 'Image Display', 'atomic-blocks' ) }
									value={ backgroundSize }
									help={ backgroundSizeHelp }
									options={ backgroundSizeOptions }
									onChange={ ( value ) => this.props.setAttributes({
										backgroundSize: value,
									}) }
								/>
							) }

							{ backgroundSize != 'cover' && (
								<SelectControl
									label={ __( 'Image Repeat', 'atomic-blocks' ) }
									value={ backgroundRepeat ? backgroundRepeat : 'no-repeat' }
									options={ backgroundRepeatOptions }
									onChange={ ( value ) => this.props.setAttributes({
										backgroundRepeat: value,
									}) }
								/>
							) }
						</Fragment>
					) }
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundImagePanel;
