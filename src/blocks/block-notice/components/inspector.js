/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  BlockDescription,
  ColorPalette,
  PanelColorSettings,
  InspectorControls,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	FormToggle,
	RangeControl,
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Notice dismiss options
		const noticeDismissOptions = [
			{ value: null, label: __( 'Always Show' ) },
			{ value: 'lsx-dismissable', label: __( 'Dismissable' ) },
		];

		// Notice colors
		const noticeColors = [
			{ color: '#F7941D', name: 'yellow' },
			{ color: '#C4771B', name: 'dark yellow' },
			{ color: '#418AD0', name: 'blue' },
			{ color: '#27639D', name: 'dark blue' },
			{ color: '#6BA913', name: 'green' },
			{ color: '#3f640b', name: 'dark green' },
			{ color: '#000000', name: 'black' },
			{ color: '#ffffff', name: 'white' },
		];

		// Setup the attributes
		const { attributes: { noticeTitle, noticeContent, noticeAlignment, noticeBackgroundColor, noticeTextColor, noticeTitleColor, noticeFontSize, noticeDismiss } } = this.props;
		const { setAttributes } = this.props;

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { noticeBackgroundColor: value } );
		const onChangeTextColor = value => setAttributes( { noticeTextColor: value } );
		const onChangeTitleColor = value => setAttributes( { noticeTitleColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ noticeFontSize }
						onChange={ ( value ) => this.props.setAttributes( { noticeFontSize: value } ) }
						min={ 14 }
						max={ 24 }
						step={ 1 }
					/>

					<SelectControl
						label={ __( 'Notice Display' ) }
						description={ __( 'Do you want the message to always show or dismissable?' ) }
						options={ noticeDismissOptions }
						value={ noticeDismiss }
						onChange={ ( value ) => this.props.setAttributes( { noticeDismiss: value } ) }
					/>

					<PanelColorSettings
						title={ __( 'Notice Color' ) }
						colorValue={ noticeBackgroundColor }
						initialOpen={ false }
						colorSettings={ [ {
							value: noticeBackgroundColor,
							onChange: onChangeBackgroundColor,
							colors: noticeColors,
							label: __( 'Notice Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings
						title={ __( 'Title Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: noticeTitleColor,
							onChange: onChangeTitleColor,
							label: __( 'Title Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings
						title={ __( 'Text Color' ) }
						colorValue={ noticeTextColor }
						initialOpen={ false }
						colorSettings={ [ {
							value: noticeTextColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color' ),
						} ] }
					>
					</PanelColorSettings>
				</PanelBody>
			</InspectorControls>
		);
	}
}
