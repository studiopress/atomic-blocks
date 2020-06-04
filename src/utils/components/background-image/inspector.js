/**
 * Background image inspector settings.
 */

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	FocalPointPicker,
	Icon,
	ToggleControl,
	SelectControl,
} = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;

class BackgroundImagePanel extends Component {
	render() {
		const { attributes, setAttributes } = this.props;

		const backgroundRepeatOptions = [
			{ value: 'no-repeat', label: __( 'No Repeat', 'atomic-blocks' ) },
			{ value: 'repeat', label: __( 'Repeat', 'atomic-blocks' ) },
			{
				value: 'repeat-x',
				label: __( 'Repeat Horizontally', 'atomic-blocks' ),
			},
			{
				value: 'repeat-y',
				label: __( 'Repeat Vertically', 'atomic-blocks' ),
			},
		];

		const backgroundSizeOptions = [
			{ value: 'auto', label: __( 'Auto', 'atomic-blocks' ) },
			{ value: 'cover', label: __( 'Cover', 'atomic-blocks' ) },
			{ value: 'contain', label: __( 'Contain', 'atomic-blocks' ) },
		];

		let backgroundSizeHelp;

		if ( 'cover' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the image as large as possible without stretching the image. Cropped either vertically or horizontally so that no empty space remains.',
				'atomic-blocks'
			);
		}
		if ( 'contain' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the image as large as possible without cropping or stretching the image.',
				'atomic-blocks'
			);
		}
		if ( 'auto' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the background image in the corresponding direction such that its intrinsic proportions are maintained.',
				'atomic-blocks'
			);
		}

		return (
			<Fragment>
				<PanelBody
					title={ __( 'Background Image', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( img ) => {
								setAttributes( {
									backgroundImgURL: img.url,
								} );
							} }
							type="image"
							value={ attributes.backgroundImgURL }
							render={ ( { open } ) => (
								<div>
									<ButtonGroup className="ab-background-button-group">
										<Button
											className="ab-inspector-icon-button ab-background-add-button is-button is-default"
											label={ __(
												'Edit image',
												'atomic-blocks'
											) }
											onClick={ open }
										>
											<Icon icon="format-image" />
											{ __(
												'Select Image',
												'atomic-blocks'
											) }
										</Button>

										{ attributes.backgroundImgURL && (
											<Button
												className="ab-inspector-icon-button ab-background-remove-button is-button is-default"
												label={ __(
													'Remove Image',
													'atomic-blocks'
												) }
												onClick={ () =>
													setAttributes( {
														backgroundImgURL: null,
													} )
												}
											>
												<Icon icon="dismiss" />
												{ __(
													'Remove',
													'atomic-blocks'
												) }
											</Button>
										) }
									</ButtonGroup>
								</div>
							) }
						></MediaUpload>
					</MediaUploadCheck>

					{ attributes.backgroundImgURL && (
						<Fragment>
							<FocalPointPicker
								label={ __( 'Focal Point', 'atomic-blocks' ) }
								url={ attributes.backgroundImgURL }
								value={ attributes.focalPoint }
								onChange={ ( value ) =>
									setAttributes( { focalPoint: value } )
								}
							/>

							<RangeControl
								label={ __( 'Image Opacity', 'atomic-blocks' ) }
								value={ attributes.backgroundDimRatio }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										backgroundDimRatio: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>

							<ToggleControl
								label={ __(
									'Fixed Background',
									'atomic-blocks'
								) }
								checked={ attributes.hasParallax }
								onChange={ () => {
									setAttributes( {
										hasParallax: ! attributes.hasParallax,
										...( ! attributes.hasParallax
											? { focalPoint: undefined }
											: {} ),
									} );
								} }
							/>

							<SelectControl
								className="ab-inspector-help-text"
								label={ __( 'Image Display', 'atomic-blocks' ) }
								value={ attributes.backgroundSize }
								help={ backgroundSizeHelp }
								options={ backgroundSizeOptions }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										backgroundSize: value,
									} )
								}
							/>

							{ 'cover' !== attributes.backgroundSize && (
								<SelectControl
									label={ __(
										'Image Repeat',
										'atomic-blocks'
									) }
									value={ attributes.backgroundRepeat }
									options={ backgroundRepeatOptions }
									onChange={ ( value ) =>
										this.props.setAttributes( {
											backgroundRepeat: value,
										} )
									}
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
