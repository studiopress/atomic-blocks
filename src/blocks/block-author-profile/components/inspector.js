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
} = wp.components;

// Import Inspector controls
const { 
	TextControl, 
} = InspectorControls;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
		<InspectorControls key="inspector">

			<RangeControl
				label={ __( 'Font Size' ) }
				value={ this.props.attributes.fontSize }
				onChange={ this.props.setFontRatio }
				min={ 14 }
				max={ 24 }
				step={ 1 }
			/>

			<SelectControl
				label={ __( 'Avatar Shape' ) }
				description={ __( 'Choose between a round or square avatar shape.' ) }
				options={ this.props.avatarShapeOptions }
				value={ this.props.attributes.avatarShape }
				onChange={ this.props.onChangeAvatarShape }
			/>
			
			<PanelColor 
				title={ __( 'Background Color' ) }
				colorValue={ this.props.attributes.blockBackgroundColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ this.props.attributes.blockBackgroundColor }
					onChange={ ( value ) => this.props.setAttributes( { blockBackgroundColor: value } ) }
				/>
			</PanelColor>

			<PanelColor 
				title={ __( 'Text Color' ) }
				colorValue={ this.props.attributes.blockTextColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ this.props.attributes.blockTextColor }
					onChange={ ( value ) => this.props.setAttributes( { blockTextColor: value } ) }
				/>
			</PanelColor>

			<PanelColor 
				title={ __( 'Link Color' ) }
				colorValue={ this.props.attributes.blockLinkColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Link Color' ) }
					value={ this.props.attributes.blockLinkColor }
					onChange={ ( value ) => this.props.setAttributes( { blockLinkColor: value } ) }
					colors={['#392F43', '#3373dc', '#2DBAA3', '#209cef', '#2BAD59', '#ff3860', '#7941b6', '#F7812B']}
				/>
			</PanelColor>

			<PanelBody 
				title={ __( 'Social Links' ) } 
				initialOpen={ false }
				>
				<BlockDescription>
					<p>{ __( 'Add links to your social media site and they will appear in the bottom of the profile box.' ) }</p>
				</BlockDescription>
				<TextControl
					label={ __( 'Twitter URL' ) }
					type="url"
					value={ this.props.attributes.twitter }
					onChange={ ( value ) => this.props.setAttributes( { twitter: value } ) }
				/>

				<TextControl
					label={ __( 'Facebook URL' ) }
					type="url"
					value={ this.props.attributes.facebook }
					onChange={ ( value ) => this.props.setAttributes( { facebook: value } ) }
				/>

				<TextControl
					label={ __( 'Instagram URL' ) }
					type="url"
					value={ this.props.attributes.instagram }
					onChange={ ( value ) => this.props.setAttributes( { instagram: value } ) }
				/>

				<TextControl
					label={ __( 'Pinterest URL' ) }
					type="url"
					value={ this.props.attributes.pinterest }
					onChange={ ( value ) => this.props.setAttributes( { pinterest: value } ) }
				/>

				<TextControl
					label={ __( 'Google URL' ) }
					type="url"
					value={ this.props.attributes.google }
					onChange={ ( value ) => this.props.setAttributes( { google: value } ) }
				/>

				<TextControl
					label={ __( 'YouTube URL' ) }
					type="url"
					value={ this.props.attributes.youtube }
					onChange={ ( value ) => this.props.setAttributes( { youtube: value } ) }
				/>

				<TextControl
					label={ __( 'Github URL' ) }
					type="url"
					value={ this.props.attributes.github }
					onChange={ ( value ) => this.props.setAttributes( { github: value } ) }
				/>

				<TextControl
					label={ __( 'Email URL' ) }
					type="url"
					value={ this.props.attributes.email }
					onChange={ ( value ) => this.props.setAttributes( { email: value } ) }
				/>

				<TextControl
					label={ __( 'Website URL' ) }
					type="url"
					value={ this.props.attributes.website }
					onChange={ ( value ) => this.props.setAttributes( { website: value } ) }
				/>	
			</PanelBody>

		</InspectorControls>
		);
	}
}
