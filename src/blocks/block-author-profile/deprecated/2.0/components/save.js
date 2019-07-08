/**
 * Internal dependencies
 */
import classnames from 'classnames';
import ProfileBox_2_0 from './profile';
import SocialIcons from '../../../components/social';
import AvatarColumn from '../../../components/avatar';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
	RichText
} = wp.editor;

export default class Save_2_0 extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			profileName,
			profileTitle,
			profileContent,
			profileImgURL,
			profileImgAlt,
			profileImgID,
			profileTextColor
		} = this.props.attributes;

		return (

			/* Save the block markup for the front end */
			<ProfileBox_2_0 { ...this.props }>
				{ profileImgURL && (
					<AvatarColumn { ...this.props }>
						<figure className="ab-profile-image-square">
							<img
								className={ classnames(
									'ab-profile-avatar',
									'wp-image-' + profileImgID
								) }
								src={ profileImgURL }
								alt={ profileImgAlt }
							/>
						</figure>
					</AvatarColumn>
				) }

				<div
					className={ classnames(
						'ab-profile-column ab-profile-content-wrap'
					) }
				>
					{ profileName && (
						<RichText.Content
							tagName="h2"
							className="ab-profile-name"
							style={ {
								color: profileTextColor
							} }
							value={ profileName }
						/>
					) }

					{ profileTitle && (
						<RichText.Content
							tagName="p"
							className="ab-profile-title"
							style={ {
								color: profileTextColor
							} }
							value={ profileTitle }
						/>
					) }

					{ profileContent && (
						<RichText.Content
							tagName="div"
							className="ab-profile-text"
							value={ profileContent }
						/>
					) }

					<SocialIcons { ...this.props } />
				</div>
			</ProfileBox_2_0>
		);
	}
}
