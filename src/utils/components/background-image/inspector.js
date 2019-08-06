const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const {
	PanelBody,
	RangeControl,
	IconButton,
	FocalPointPicker,
	ToggleControl
} = wp.components;
const {
	PanelColorSettings,
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
			backgroundImgID,
			backgroundImgURL,
			backgroundImgAlt,
			backgroundDimRatio,
			backgroundColor
		} = attributes;

		const toggleParallax = () => {
			setAttributes( {
				hasParallax: ! hasParallax,
				...( ! hasParallax ? { focalPoint: undefined } : {} ),
			} );
		};

		// Update color values
		const onChangeBackgroundColor = value => setAttributes({ backgroundColor: value });

		return (
			<Fragment>
				<PanelBody title={ __( 'Background Image', 'atomic-blocks' ) } initialOpen={ false }>
					<p>{ __( 'Select a background image:', 'atomic-blocks' ) }</p>

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
									<IconButton
										className="ab-background-inspector-media"
										label={ __( 'Edit image', 'atomic-blocks' ) }
										icon="format-image"
										onClick={ open }
									>
										{ __( 'Select Image', 'atomic-blocks' ) }
									</IconButton>
								</div>
							) }
						>
						</MediaUpload>
					</MediaUploadCheck>

					<hr />

					<ToggleControl
						label={ __( 'Fixed Background', 'atomic-blocks' ) }
						checked={ hasParallax }
						onChange={ toggleParallax }
					/>

					<hr />

					{ backgroundImgURL && (
						<FocalPointPicker
							label={ __( 'Focal Point Picker', 'atomic-blocks' ) }
							url={ backgroundImgURL }
							value={ focalPoint }
							onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
						/>
					) }

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
}

export default BackgroundImagePanel;
