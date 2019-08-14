/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Device from './device';
import icons from './../../../utils/components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

const { Button, Dashicon } = wp.components;

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


		return [

			/* Show the block alignment controls on focus */
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ this.props.attributes.deviceAlignment }
					onChange={ ( value ) => this.props.setAttributes({ deviceAlignment: value }) }
				/>
			</BlockControls>,

			/* Show the block controls on focus */
			<Inspector
				{ ...{ ...this.props.setAttributes, ...this.props } }
			/>,

			/* Show the block markup in the editor */
			<Device { ...this.props }>
				<MediaUpload
					buttonProps={ {
						className: 'change-image'
					} }
					onSelect={ ( img ) => this.props.setAttributes({ backgroundImgURL: img.url }) }
					allowed={ 'image' }
					type="image"
					value={ this.props.attributes.backgroundImgURL }
					render={ ({ open }) => (
						<Fragment>
							{ ! this.props.attributes.backgroundImgURL && (
								<Button
									onClick={ open }
									className="ab-device-add-image"
								>
									{ ! this.props.attributes.backgroundImgURL ? icons.upload : null }
								</Button>
							) }
							{ this.props.attributes.backgroundImgURL && (
								<Button
									className="ab-remove-image"
									onClick={ () => {
										this.props.setAttributes({
											backgroundImgURL: null
										});
									} }
								>
									<Dashicon icon={ 'dismiss' } />
								</Button>
							) }
						</Fragment>
					) }
				>
				</MediaUpload>
			</Device>
		];
	}
}
