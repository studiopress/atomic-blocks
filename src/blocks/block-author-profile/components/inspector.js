/**
 * Inspector Controls
 */

/* Setup the block */
const { __ } = wp.i18n;
const { Component } = wp.element;

/* Import block components */
const {
	InspectorControls,
	PanelColorSettings
} = wp.editor;

/* Import Inspector components */
const {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl
} = wp.components;

/* Create an Inspector Controls wrapper Component */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		/* Setup the attributes */
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, linkedin, email, website, profileAvatarShape  } = this.props.attributes;
		const { setAttributes } = this.props;

		/* Avatar shape options */
		const profileAvatarShapeOptions = [
			{ value: 'square', label: __( 'Square', 'atomic-blocks' ) },
			{ value: 'round', label: __( 'Round', 'atomic-blocks' ) }
		];

		/* Update color values */
		const onChangeBackgroundColor = value => setAttributes({ profileBackgroundColor: value });
		const onChangeProfileTextColor = value => setAttributes({ profileTextColor: value });
		const onChangeSocialLinkColor = value => setAttributes({ profileLinkColor: value });

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Font Size', 'atomic-blocks' ) }
					value={ profileFontSize }
					onChange={ ( value ) => this.props.setAttributes({ profileFontSize: value }) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Avatar Shape', 'atomic-blocks' ) }
					description={ __( 'Choose between a round or square avatar shape.', 'atomic-blocks' ) }
					options={ profileAvatarShapeOptions }
					value={ profileAvatarShape }
					onChange={ ( value ) => this.props.setAttributes({ profileAvatarShape: value }) }
				/>

				<PanelColorSettings
					title={ __( 'Background Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: profileBackgroundColor,
						onChange: onChangeBackgroundColor,
						label: __( 'Background Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings
					title={ __( 'Text Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: profileTextColor,
						onChange: onChangeProfileTextColor,
						label: __( 'Text Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings
					title={ __( 'Social Link Color', 'atomic-blocks' ) }
					initialOpen={ false }
						colorSettings={ [ {
						value: profileLinkColor,
						onChange: onChangeSocialLinkColor,
						label: __( 'Social Link Color', 'atomic-blocks' )
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>

			<PanelBody title={ __( 'Social Links', 'atomic-blocks' ) } initialOpen={ false }>
				<p>{ __( 'Add links to your social media site and they will appear in the bottom of the profile box.', 'atomic-blocks' ) }</p>

				<TextControl
					label={ __( 'Twitter URL', 'atomic-blocks' ) }
					type="url"
					value={ twitter }
					onChange={ ( value ) => this.props.setAttributes({ twitter: value }) }
				/>

				<TextControl
					label={ __( 'Facebook URL', 'atomic-blocks' ) }
					type="url"
					value={ facebook }
					onChange={ ( value ) => this.props.setAttributes({ facebook: value }) }
				/>

				<TextControl
					label={ __( 'Instagram URL', 'atomic-blocks' ) }
					type="url"
					value={ instagram }
					onChange={ ( value ) => this.props.setAttributes({ instagram: value }) }
				/>

				<TextControl
					label={ __( 'Pinterest URL', 'atomic-blocks' ) }
					type="url"
					value={ pinterest }
					onChange={ ( value ) => this.props.setAttributes({ pinterest: value }) }
				/>

				<TextControl
					label={ __( 'Google URL', 'atomic-blocks' ) }
					type="url"
					value={ google }
					onChange={ ( value ) => this.props.setAttributes({ google: value }) }
				/>

				<TextControl
					label={ __( 'YouTube URL', 'atomic-blocks' ) }
					type="url"
					value={ youtube }
					onChange={ ( value ) => this.props.setAttributes({ youtube: value }) }
				/>

				<TextControl
					label={ __( 'Github URL', 'atomic-blocks' ) }
					type="url"
					value={ github }
					onChange={ ( value ) => this.props.setAttributes({ github: value }) }
				/>

				<TextControl
					label={ __( 'LinkedIn URL', 'atomic-blocks' ) }
					type="url"
					value={ linkedin }
					onChange={ ( value ) => this.props.setAttributes({ linkedin: value }) }
				/>

				<TextControl
					label={ __( 'Email URL', 'atomic-blocks' ) }
					help={ __( 'Supports a URL or an email link. Email links must be prefixed with "mailto:". Example: mailto:test@example.com', 'atomic-blocks' ) }
					type="url"
					value={ email }
					onChange={ ( value ) => this.props.setAttributes({ email: value }) }
				/>

				<TextControl
					label={ __( 'Website URL', 'atomic-blocks' ) }
					type="url"
					value={ website }
					onChange={ ( value ) => this.props.setAttributes({ website: value }) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
