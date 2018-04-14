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
} = wp.blocks;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelRow,
	PanelColor,
	RangeControl, 
	SelectControl,
	TextControl,
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape  } = this.props.attributes;

		// Avatar shape options
		const profileAvatarShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round', label: __( 'Round' ) },
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ profileFontSize }
					onChange={ ( value ) => this.props.setAttributes( { profileFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Avatar Shape' ) }
					description={ __( 'Choose between a round or square avatar shape.' ) }
					options={ profileAvatarShapeOptions }
					value={ profileAvatarShape }
					onChange={ ( value ) => this.props.setAttributes( { profileAvatarShape: value } ) }
				/>
				
				<PanelColor 
					title={ __( 'Background Color' ) }
					colorValue={ profileBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Background Color' ) }
						value={ profileBackgroundColor }
						onChange={ ( value ) => this.props.setAttributes( { profileBackgroundColor: value } ) }
					/>
				</PanelColor>

				<PanelColor 
					title={ __( 'Text Color' ) }
					colorValue={ profileTextColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Background Color' ) }
						value={ profileTextColor }
						onChange={ ( value ) => this.props.setAttributes( { profileTextColor: value } ) }
					/>
				</PanelColor>

				<PanelColor 
					title={ __( 'Social Link Color' ) }
					colorValue={ profileLinkColor }
					initialOpen={ false }
				>
					<ColorPalette 
						label={ __( 'Link Color' ) }
						value={ profileLinkColor }
						onChange={ ( value ) => this.props.setAttributes( { profileLinkColor: value } ) }
						colors={['#392F43', '#3373dc', '#2DBAA3', '#209cef', '#2BAD59', '#ff3860', '#7941b6', '#F7812B']}
					/>
				</PanelColor>
			</PanelBody>

			<PanelBody title={ __( 'Social Links' ) } initialOpen={ false }>
				<p>{ __( 'Add links to your social media site and they will appear in the bottom of the profile box.' ) }</p>

				<TextControl
					label={ __( 'Twitter URL' ) }
					type="url"
					value={ twitter }
					onChange={ ( value ) => this.props.setAttributes( { twitter: value } ) }
				/>				

				<TextControl
					label={ __( 'Facebook URL' ) }
					type="url"
					value={ facebook }
					onChange={ ( value ) => this.props.setAttributes( { facebook: value } ) }
				/>

				<TextControl
					label={ __( 'Instagram URL' ) }
					type="url"
					value={ instagram }
					onChange={ ( value ) => this.props.setAttributes( { instagram: value } ) }
				/>

				<TextControl
					label={ __( 'Pinterest URL' ) }
					type="url"
					value={ pinterest }
					onChange={ ( value ) => this.props.setAttributes( { pinterest: value } ) }
				/>

				<TextControl
					label={ __( 'Google URL' ) }
					type="url"
					value={ google }
					onChange={ ( value ) => this.props.setAttributes( { google: value } ) }
				/>

				<TextControl
					label={ __( 'YouTube URL' ) }
					type="url"
					value={ youtube }
					onChange={ ( value ) => this.props.setAttributes( { youtube: value } ) }
				/>
				
				<TextControl
					label={ __( 'Github URL' ) }
					type="url"
					value={ github }
					onChange={ ( value ) => this.props.setAttributes( { github: value } ) }
				/>

				<TextControl
					label={ __( 'Email URL' ) }
					type="url"
					value={ email }
					onChange={ ( value ) => this.props.setAttributes( { email: value } ) }
				/>

				<TextControl
					label={ __( 'Website URL' ) }
					type="url"
					value={ website }
					onChange={ ( value ) => this.props.setAttributes( { website: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
