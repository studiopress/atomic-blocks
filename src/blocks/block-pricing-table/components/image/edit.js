// Import block dependencies and components
import classnames from 'classnames';
import icons from './icons';
//import Inspector from '../global/inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;

const {
	MediaUpload,
	RichText,
} = wp.editor;

const {
	Button,
} = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default class Edit extends Component {

	constructor() {
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
			className,
			setAttributes,
		} = this.props;

		// const onSelectImage = img => {
		// 	setAttributes( {
		// 		id: img.id,
		// 		url: img.url,
		// 		alt: img.alt,
		// 	} );
		// };

		const getImageButton = (openEvent) => {
			if(url) {
				return (
					<img
						src={ url }
						onClick={ openEvent }
						className="image"
					/>
				);
			}
			else {
				return (
					<div className="button-container">
						<Button
							onClick={ openEvent }
							className="button button-large"
						>
							{ __( 'Select Image', 'atomic-blocks' ) }
						</Button>
					</div>
				);
			}
		};

		return [
			<Fragment>
				<MediaUpload
					buttonProps={ {
						className: 'change-image'
					} }
					onSelect={ ( img ) => setAttributes(
						{
							id: img.id,
							url: img.url,
							alt: img.alt,
						}
					) }
					allowed={ ALLOWED_MEDIA_TYPES }
					type="image"
					value={ id }
					render={ ({ open }) => getImageButton(open) }
				>
				</MediaUpload>
			</Fragment>
		];
	}
}