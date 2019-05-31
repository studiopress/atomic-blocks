/**
 * Favorite button
 */

const { __ } = wp.i18n;
const { apiFetch } = wp;
const {
	Component,
	Fragment
} = wp.element;
const {
	TextControl,
	Button,
	Spinner
} = wp.components;

/**
 * Get the favorites from user meta.
 *
 * @returns {array} Array of favorite objects.
 */
function getFavorites() {
	return apiFetch(
		{
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'GET',
		}
	).then(
			favoriteLayouts => favoriteLayouts
	).catch(
		error => console.error( error )
	);
}

/**
 * Adds the specified section/layout to user meta.
 *
 * @param key The key of the section or layout to add.
 * @returns {*}
 */
function addFavorite( key ) {
	return apiFetch(
		{
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'PATCH',
			body: JSON.stringify( { 'atomic_blocks_favorite_key': key } ),
			_wpnonce: wpApiSettings.nonce
		}
	).then(
		// favoriteLayouts => favoriteLayouts
	).catch(
		error => console.error( error )
	);
}

function removeFavorite( key ) {
	return apiFetch(
		{
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'DELETE',
			body: JSON.stringify( { 'atomic_blocks_favorite_key': key } ),
			_wpnonce: wpApiSettings.nonce
		}
	).then(
		// favoriteLayouts => favoriteLayouts
	).catch(
		error => console.error( error )
	);
}

export default class FavoriteButton extends Component {

	constructor() {
		super( ...arguments );
	}

	state = {
		favoriteLayouts: [],
		isLoading: true,
		isSaving: false,
		isEditing: false,
	};

	/* Update the global setting. */
	updateSetting = async ( key ) => {
		this.setState( { isSaving: true } );

		let favorites = [];

		if ( Object.values( this.state.favoriteLayouts ).includes( key ) ) {
			favorites = await removeFavorite( key );
			this.setState( {
				favoriteLayouts: favorites,
				isLoading: false,
				isSaving: false,
				isEditing: false,
			} );
		} else {
			favorites = await addFavorite( key );
			this.setState( {
				favoriteLayouts: favorites,
				isLoading: false,
				isSaving: false,
				isEditing: false,
			} );
		}

	};

	/* Wait for the data to be available and setup the setting. */
	async componentDidMount() {
		const favoriteLayouts = await getFavorites();
		this.setState( {
			favoriteLayouts,
			isLoading: false
		} );
	}

	render() {
		const { className } = this.props;

		if ( this.state.isLoading ) {
			return (
				<p><Spinner /> { __( 'Loading', 'atomic-blocks' ) }</p>
			);
		}

		let buttonText = __( 'Add to Favorites', 'atomic-blocks' );

		if ( Object.values( this.state.favoriteLayouts ).includes( this.props.layoutKey ) ) {
			buttonText = __( 'Remove from Favorites', 'atomic-blocks' );
		}

		return (
			<Fragment>
				<Button
					isPrimary
					disabled={ this.state.isSaving }
					onClick={ () => {
						this.updateSetting( this.props.layoutKey );
					} }
					>
					{ buttonText }
				</Button>
			</Fragment>
		);
	}
}
