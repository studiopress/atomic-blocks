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
	ToggleControl
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
		} = attributes;

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
											className="ab-inspector-icon-button ab-background-add-button is-button is-default is-large"
											label={ __( 'Edit image', 'atomic-blocks' ) }
											icon="format-image"
											onClick={ open }
										>
											{ __( 'Select Image', 'atomic-blocks' ) }
										</IconButton>

										{ backgroundImgURL && (
											<IconButton
												className="ab-inspector-icon-button ab-background-remove-button is-button is-default is-large"
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

							<FocalPointPicker
								label={ __( 'Focal Point Picker', 'atomic-blocks' ) }
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
						</Fragment>
					) }
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundImagePanel;
