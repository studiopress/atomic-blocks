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
  	PanelColorSettings,
} = wp.editor;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelRow,
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
		const { cardName, cardTitle, cardContent, cardAlignment, cardImgURL, cardImgID, cardFontSize, cardBackgroundColor, cardTextColor, cardLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, cardAvatarShape  } = this.props.attributes;
		const { setAttributes } = this.props;

		// Avatar shape options
		const cardAvatarShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round', label: __( 'Round' ) },
		];

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { cardBackgroundColor: value } );
		const onChangeCardTextColor = value => setAttributes( { cardTextColor: value } );




		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ cardFontSize }
					onChange={ ( value ) => this.props.setAttributes( { cardFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Avatar Shape' ) }
					description={ __( 'Choose between a round or square avatar shape.' ) }
					options={ cardAvatarShapeOptions }
					value={ cardAvatarShape }
					onChange={ ( value ) => this.props.setAttributes( { cardAvatarShape: value } ) }
				/>

				<PanelColorSettings
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: cardBackgroundColor,
						onChange: onChangeBackgroundColor,
						label: __( 'Background Color' ),
					} ] }
				>
				</PanelColorSettings>

				<PanelColorSettings
					title={ __( 'Text Color' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: cardTextColor,
						onChange: onChangeCardTextColor,
						label: __( 'Text Color' ),
					} ] }
				>
				</PanelColorSettings>


			</PanelBody>


		</InspectorControls>
		);
	}
}
