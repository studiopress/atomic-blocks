/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Device from './device';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	AlignmentToolbar,
	BlockControls,
	MediaUpload
} = wp.editor;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				deviceAlignment,
			},
			attributes,
			setAttributes
		} = this.props;

		return [

			/* Show the block alignment controls on focus */
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ deviceAlignment }
					onChange={ ( value ) => setAttributes({ deviceAlignment: value }) }
				/>
			</BlockControls>,

			/* Show the block controls on focus */
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,

			/* Show the block markup in the editor */
			<Device { ...this.props }></Device>
		];
	}
}
