/**
 * Inspector Controls
 */

/**
 * Internal dependencies
 */
import BackgroundImagePanel from './../../../utils/components/background-image/inspector';

/* Setup the block */
const { __ } = wp.i18n;
const { Component } = wp.element;

/* Import block components */
const { InspectorControls } = wp.editor;

/* Import Inspector components */
const {
	PanelBody,
	SelectControl,
	ToggleControl
} = wp.components;

/* Create an Inspector Controls wrapper Component */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		/* Setup the attributes */
		const { attributes } = this.props;

		/* Device type options */
		const deviceOptions = [
			{ value: 'ab-phone-mockup', label: __( 'Phone', 'atomic-blocks' ) },
			{ value: 'ab-tablet-mockup', label: __( 'Tablet', 'atomic-blocks' ) }
		];

		const deviceOrientationOptions = [
			{ value: 'ab-device-vertical', label: __( 'Vertical', 'atomic-blocks' ) },
			{ value: 'ab-device-horizontal', label: __( 'Horizontal', 'atomic-blocks' ) }
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<SelectControl
					label={ __( 'Device Type', 'atomic-blocks' ) }
					description={ __( 'Choose between a mobile or tablet mockup.', 'atomic-blocks' ) }
					options={ deviceOptions }
					value={ attributes.deviceType }
					onChange={ ( value ) => this.props.setAttributes({ deviceType: value }) }
				/>

				<SelectControl
					label={ __( 'Device Orientation', 'atomic-blocks' ) }
					description={ __( 'Choose between vertical or horizontal orientation.', 'atomic-blocks' ) }
					options={ deviceOrientationOptions }
					value={ attributes.deviceOrientation }
					onChange={ ( value ) => this.props.setAttributes({ deviceOrientation: value }) }
				/>

				<ToggleControl
					label={ __( 'Enable Drop Shadow', 'atomic-blocks' ) }
					checked={ attributes.deviceShadow }
					onChange={ () => this.props.setAttributes({ deviceShadow: ! attributes.deviceShadow }) }
				/>
			</PanelBody>

			<BackgroundImagePanel { ...this.props }>
			</BackgroundImagePanel>
		</InspectorControls>
		);
	}
}
