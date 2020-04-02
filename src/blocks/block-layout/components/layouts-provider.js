/**
 * Layouts Provider for the Layout Block.
 *
 * Provides layouts, sections, and favorites to other components
 * using React's Context API.
 */

import React, { createContext, Component } from 'react';

const { apiFetch } = wp;

export const LayoutsContext = createContext( {
	favorites: '',
	favoriteKeys: '',
	layouts: '',
	sections: '',
	all: '',
	reusableBlocks: '',
} );

export default class LayoutsProvider extends Component {
	state = {
		favorites: '',
		favoriteKeys: '',
		layouts: '',
		sections: '',
		all: '',
		reusableBlocks: '',
	};

	/**
	 * Retrieves the keys of current user's favorites.
	 */
	getFavoriteKeys() {
		return apiFetch( {
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'GET',
		} )
			.then( ( favorite_keys ) => {
				return favorite_keys;
			} )
			.catch( ( error ) => console.error( error ) );
	}

	/**
	 * Returns the current user's favorite layouts and sections.
	 */
	getFavorites() {
		return apiFetch( {
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'GET',
		} )
			.then( ( favorite_keys ) => {
				const favorites = [];

				Object.values( this.state.all ).forEach( function( item ) {
					if ( favorite_keys.includes( item.key ) ) {
						favorites.push( item );
					}
				} );

				return favorites;
			} )
			.catch( ( error ) => console.error( error ) );
	}

	/**
	 * Adds a layout to the user's favorites.
	 *
	 * @param {string} key The layout's unique key.
	 * @return {Object} The user's favorite layouts.
	 */
	addFavorite( key ) {
		return apiFetch( {
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'PATCH',
			body: JSON.stringify( { atomic_blocks_favorite_key: key } ),
			_wpnonce: wpApiSettings.nonce,
		} )
			.then( ( favorites ) => {
				return favorites;
			} )
			.catch( ( error ) => console.error( error ) );
	}

	/**
	 * Removes a layout from the user's favorites.
	 *
	 * @param {string} key The layout's unique key.
	 * @return {Object} The user's favorite layouts.
	 */
	removeFavorite( key ) {
		return apiFetch( {
			path: '/atomicblocks/v1/layouts/favorites',
			method: 'DELETE',
			body: JSON.stringify( { atomic_blocks_favorite_key: key } ),
			_wpnonce: wpApiSettings.nonce,
		} )
			.then( ( favorites ) => {
				return favorites;
			} )
			.catch( ( error ) => console.error( error ) );
	}

	async componentDidMount() {
		const favoriteKeys = await this.getFavoriteKeys();

		/**
		 * Retrieve all the registered layouts, sections,
		 * and the user's favorites and save them to state.
		 */
		wp.apiFetch( {
			method: 'GET',
			path: '/atomicblocks/v1/layouts/all?filter=allowed',
		} ).then( async ( components ) => {
			const layouts = [];
			const sections = [];
			const reusableBlocks = [];
			const favorites = [];

			Object.values( components ).forEach( function( item ) {
				if ( 'layout' === item.type ) {
					layouts.push( item );
				}

				if ( 'section' === item.type ) {
					sections.push( item );
				}

				if ( 'wp_block' === item.type ) {
					reusableBlocks.push( item );
				}

				if ( favoriteKeys.includes( item.key ) ) {
					favorites.push( item );
				}
			} );

			this.setState( {
				all: components,
				layouts,
				sections,
				favorites,
				favoriteKeys,
				reusableBlocks,
			} );
		} );
	}

	render() {
		if ( this.state.all ) {
			return (
				<LayoutsContext.Provider
					value={ {
						favorites: this.state.favorites,
						favoriteKeys: this.state.favoriteKeys,
						layouts: this.state.layouts,
						sections: this.state.sections,
						all: this.state.all,
						reusableBlocks: this.state.reusableBlocks,
						toggleFavorite: async ( key ) => {
							let favoriteKeys = await this.getFavoriteKeys();

							if ( favoriteKeys.includes( key ) ) {
								favoriteKeys = await this.removeFavorite( key );
							} else {
								favoriteKeys = await this.addFavorite( key );
							}

							const favorites = await this.getFavorites();

							this.setState( {
								favorites,
								favoriteKeys,
							} );

							return favorites;
						},
					} }
				>
					{ this.props.children }
				</LayoutsContext.Provider>
			);
		}
		return null;
	}
}
