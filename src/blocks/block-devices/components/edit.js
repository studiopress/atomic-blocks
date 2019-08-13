/**
 * Internal dependencies
 */
import classnames from 'classnames';
import Inspector from './inspector';
import Device from './device';
import SocialIcons from './social';
import AvatarColumn from './avatar';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	MediaUpload
} = wp.editor;

const { Button, Dashicon } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				profileName,
				profileTitle,
				profileContent,
				profileAlignment,
				profileImgURL,
				profileImgID,
				profileImgAlt,
				profileTextColor
			},
			setAttributes
		} = this.props;

		return [

			/* Show the block alignment controls on focus */
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ profileAlignment }
					onChange={ ( value ) => setAttributes({ profileAlignment: value }) }
				/>
			</BlockControls>,

			/* Show the block controls on focus */
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,

			/* Show the block markup in the editor */
			<Device { ...this.props }>
				<figure className="ab-device-mockup-wrap">
						<MediaUpload
							buttonProps={ {
								className: 'change-image'
							} }
							onSelect={ ( img ) => setAttributes(
								{
									profileImgID: img.id,
									profileImgURL: img.url,
									profileImgAlt: img.alt
								}
							) }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="image"
							value={ profileImgID }
							render={ ({ open }) => (
								<Fragment>
									<Button
										onClick={ open }
									>
										{ ! profileImgID ? icons.upload : <img
											className={ classnames(
												'ab-profile-avatar',
												'ab-change-image',
												'wp-image-' + profileImgID
											) }
											src={ profileImgURL }
											alt={ profileImgAlt }
											/>
										}
									</Button>
									{ profileImgID && (
										<Button
											className="ab-remove-image"
											onClick={ () => {
												setAttributes({
													profileImgID: null,
													profileImgURL: null,
													profileImgAlt: null
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
					</figure>

				<div class='ab-phone-mockup'>iPhone XS</div>
				<div class='ab-tablet-mockup'>iPad Pro</div>
			</Device>
		];
	}
}
