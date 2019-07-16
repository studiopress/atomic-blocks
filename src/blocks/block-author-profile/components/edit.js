/**
 * Internal dependencies
 */
import classnames from 'classnames';
import Inspector from './inspector';
import ProfileBox from './profile';
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
			<ProfileBox { ...this.props }>
				<AvatarColumn { ...this.props }>
					<figure className="ab-profile-image-square">
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
				</AvatarColumn>

				<div
					className={ classnames(
						'ab-profile-column ab-profile-content-wrap'
					) }
				>
					<RichText
						tagName="h2"
						placeholder={ __( 'Add name', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileName }
						className='ab-profile-name'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes({ profileName: value }) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Add title', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileTitle }
						className='ab-profile-title'
						style={ {
							color: profileTextColor
						} }
						onChange={ ( value ) => setAttributes({ profileTitle: value }) }
					/>

					<RichText
						tagName="div"
						className='ab-profile-text'
						multiline="p"
						placeholder={ __( 'Add profile text...', 'atomic-blocks' ) }
						keepPlaceholderOnFocus
						value={ profileContent }
						formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
						onChange={ ( value ) => setAttributes({ profileContent: value }) }
					/>

					<SocialIcons { ...this.props } />
				</div>
			</ProfileBox>
		];
	}
}
