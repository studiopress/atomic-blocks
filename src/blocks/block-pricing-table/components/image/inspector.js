/**
 * Inspector Controls
 */

// Import block dependencies and components
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;

const {
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
} = wp.components;


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
			attributes: {
				images,
				url,
				id,
				alt,
			},
			isSelected,
			setAttributes,
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Text Settings', 'atomic-blocks' ) }>

			</PanelBody>
		</InspectorControls>
		);
	}
}