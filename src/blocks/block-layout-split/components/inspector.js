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
} = wp.editor;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelRow,
	PanelColor,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileFontSize, profileBackgroundColor, profileTextColor, profileLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, profileAvatarShape, layoutToggle  } = this.props.attributes;

		// Avatar shape options
		const profileAvatarShapeOptions = [
			{ value: 'top', label: __( 'Top' ) },
			{ value: 'center', label: __( 'Center' ) },
			{ value: 'flex', label: __( 'Flex' ) },
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ToggleControl
					label={ __( 'Reverse Layout' ) }
					checked={ !! layoutToggle }
					onChange={ () => this.props.setAttributes( { layoutToggle: ! layoutToggle } ) }
				/>

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
			</PanelBody>
		</InspectorControls>
		);
	}
}
