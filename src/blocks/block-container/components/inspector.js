/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;

// Import Inspector components
const { Button, Icon, PanelBody, RangeControl } = wp.components;

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
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerMaxWidth,
			containerBackgroundColor,
			containerDimRatio,
			containerImgURL,
			containerImgID,
		} = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = ( img ) => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			} );
		};

		// Update color values
		const onChangeBackgroundColor = ( value ) =>
			setAttributes( { containerBackgroundColor: value } );

		return (
			<InspectorControls key="inspector">
				<RenderSettingControl id="ab_container_containerOptions">
					<PanelBody
						title={ __( 'Container Options', 'atomic-blocks' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Padding Top (%)', 'atomic-blocks' ) }
							value={ containerPaddingTop }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerPaddingTop: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 0.5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (%)',
								'atomic-blocks'
							) }
							value={ containerPaddingBottom }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerPaddingBottom: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 0.5 }
						/>

						<RangeControl
							label={ __( 'Padding Left (%)', 'atomic-blocks' ) }
							value={ containerPaddingLeft }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerPaddingLeft: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 0.5 }
						/>

						<RangeControl
							label={ __( 'Padding Right (%)', 'atomic-blocks' ) }
							value={ containerPaddingRight }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerPaddingRight: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 0.5 }
						/>

						<RangeControl
							label={ __( 'Margin Top (%)', 'atomic-blocks' ) }
							value={ containerMarginTop }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerMarginTop: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Margin Bottom (%)', 'atomic-blocks' ) }
							value={ containerMarginBottom }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerMarginBottom: value,
								} )
							}
							min={ 0 }
							max={ 30 }
							step={ 0.5 }
						/>

						<RangeControl
							label={ __(
								'Inside Container Max Width (px)',
								'atomic-blocks'
							) }
							value={ containerMaxWidth }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									containerMaxWidth: value,
								} )
							}
							min={ 500 }
							max={ 1600 }
							step={ 1 }
						/>
					</PanelBody>
				</RenderSettingControl>

				<RenderSettingControl id="ab_container_backgroundOptions">
					<PanelBody
						title={ __( 'Background Options', 'atomic-blocks' ) }
						initialOpen={ false }
					>
						<p>
							{ __(
								'Select a background image:',
								'atomic-blocks'
							) }
						</p>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ containerImgID }
							render={ ( { open } ) => (
								<div>
									<Button
										className="ab-container-inspector-media"
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

									{ containerImgURL &&
										!! containerImgURL.length && (
											<Button
												className="ab-container-inspector-media"
												label={ __(
													'Remove Image',
													'atomic-blocks'
												) }
												onClick={ onRemoveImage }
											>
												<Icon icon="dismiss" />
												{ __(
													'Remove',
													'atomic-blocks'
												) }
											</Button>
										) }
								</div>
							) }
						></MediaUpload>

						{ containerImgURL && !! containerImgURL.length && (
							<RangeControl
								label={ __( 'Image Opacity', 'atomic-blocks' ) }
								value={ containerDimRatio }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										containerDimRatio: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>
						) }

						<PanelColorSettings
							title={ __( 'Background Color', 'atomic-blocks' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									value: containerBackgroundColor,
									label: __(
										'Background Color',
										'atomic-blocks'
									),
									onChange: onChangeBackgroundColor,
								},
							] }
						></PanelColorSettings>
					</PanelBody>
				</RenderSettingControl>
			</InspectorControls>
		);
	}
}
