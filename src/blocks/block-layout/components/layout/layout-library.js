/**
 * Layout Library UI.
 *
 * Interface for browsing, searching, filtering and inserting sections and layouts.
 */

 /**
 * Dependencies.
 */
import map from 'lodash/map';
import LazyLoad from 'react-lazy-load';
import { atomic_blocks_sections, atomic_blocks_layouts } from './layout-functions';
import favoriteButton from './favorite-button';
import classnames from 'classnames';
import FavoriteButton from './favorite-button';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { rawHandler } = wp.blocks;
const {
	withSelect,
	withDispatch
} = wp.data;
const {
	Component,
	Fragment,
} = wp.element;
const {
	Button,
	ButtonGroup,
	TextControl,
	SelectControl,
	Dashicon,
	Tooltip,
} = wp.components;

class LayoutLibrary extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			category: 'all',
			search: null,
			activeView: 'grid',
			layoutCount: '',
			favoriteLayouts: '',
		};
	}

	componentDidMount() {
		/* Fetch the user's favorites and save to state for use in the Favorites tab */
		wp.apiFetch(
			{
				'method': 'GET',
				'path': '/atomicblocks/v1/layouts/favorites',
			}
		).then( response => {

			const combined = atomic_blocks_layouts().concat( atomic_blocks_sections() );

			let favorites = combined.filter( ( item ) => {
				return response.includes( item.key );
			} );

			this.setState( { favoriteLayouts: favorites } );
		} );
	}

	/* Conditionally load the layout array based on the tab */
	getLayoutArray() {
		let component = [];
		switch ( this.props.currentTab ) {
			case 'ab-layout-tab-layouts' :
				component = atomic_blocks_layouts();
				break;
			case 'ab-layout-tab-sections' :
				component = atomic_blocks_sections();
				break;
			case 'ab-layout-tab-favorites' :
				component = this.state.favoriteLayouts;
				break;
		}
		return component;
	}

	/* Insert the block layout. */
	onInsertContent( blockLayout ) {
		this.props.import( blockLayout );
	}

	/* Capitalize category labels in drop down. */
	capitalizeFirstLetter( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}

	/* Insert the block layout. */
	countLayouts( layoutInt ) {
		this.setState( { layoutCount: layoutInt } );
	}

	render() {
		/* Grab the layout array. */
		const blockLayout = this.getLayoutArray();

		/* Set a default category. */
		const cats = [ 'all' ];

		/* Build a category array. */
		for ( let i = 0; i < blockLayout.length; i++ ) {
			for ( let c = 0; c < blockLayout[ i ].category.length; c++ ) {
				if ( ! cats.includes( blockLayout[ i ].category[ c ] ) ) {
					cats.push( blockLayout[ i ].category[ c ] );
				}
			}
		}

		/* Setup categories for select menu. */
		const catOptions = cats.map( ( item ) => {
			return { value: item, label: this.capitalizeFirstLetter( item ) }
		} );

		/* Expand each layout full width. */
		const onZoom = () => {
			const imageZoom = document.querySelector('.ab-layout-zoom-button');
			imageZoom.parentNode.classList.toggle('ab-layout-zoom-layout');
		};

		return (
			<Fragment>
				{ /* Category filter and search header. */ }
				<div className="ab-layout-modal-header">
					<SelectControl
						label={ __( 'Layout Categories', 'atomic-blocks' ) }
						value={ this.state.category }
						options={ catOptions }
						onChange={ value => this.setState( { category: value } ) }
					/>
					<TextControl
						type="text"
						value={ this.state.search }
						placeholder={ __( 'Search Layouts', 'atomic-blocks' ) }
						onChange={ value => this.setState( { search: value } ) }
					/>
				</div>

				<div className={ 'ab-layout-view' }>
					{ <div className={ 'ab-layout-view-left' }><p>{ __( 'Showing: ', 'atomic-blocks' ) + blockLayout.length }</p></div> }

					{ /* Grid width view */ }
					<div className={ 'ab-layout-view-right' }>
						<Tooltip text={ __( 'Grid View', 'atomic-blocks' ) }>
							<Button
								key={ 'buttonGridView' }
								className={ classnames(
									this.state.activeView === 'grid' ? 'is-primary' : null,
									'ab-layout-grid-view-button'
								) }
								isSmall
								onClick={ () => this.setState( {
									activeView: 'grid'
								} ) }
							>
								<Dashicon
									icon={ 'screenoptions' }
									className={ 'ab-layout-icon-grid' }
								/>
							</Button>
						</Tooltip>

						{ /* Full width layout view */ }
						<Tooltip text={ __( 'Full Width View', 'atomic-blocks' ) }>
							<Button
								key={ 'buttonGridView' }
								className={ classnames(
									this.state.activeView === 'full' ? 'is-primary' : null,
									'ab-layout-full-view-button'
								) }
								isSmall
								onClick={ () => this.setState( {
									activeView: 'full'
								} ) }
							>
								<Dashicon
									icon={ 'tablet' }
									className={ 'ab-layout-icon-tablet' }
								/>
							</Button>
						</Tooltip>
					</div>
				</div>

				<ButtonGroup
					className={ classnames(
						'ab-layout-choices',
						this.state.activeView === 'full' ? 'ab-layout-view-full' : null,
					) }
					aria-label={ __( 'Layout Options', 'atomic-blocks' ) }
				>
					{ map( blockLayout, ( { name, key, id, image, content, category, keywords } ) => {
						if ( ( 'all' === this.state.category || category.includes( this.state.category ) ) && ( ! this.state.search || ( keywords && keywords.some( x => x.toLowerCase().includes( this.state.search.toLowerCase() ) ) ) ) ) {
							return (
								<div className="ab-layout-design">
									<div className="ab-layout-design-inside">
										{ /* Zoom button */ }
										<Button
											key={ 'buttonZoom' }
											className="ab-layout-zoom-button"
											isSmall
											onClick={ onZoom }
										>
											<Dashicon
												icon={ 'editor-expand' }
												className={ 'ab-layout-icon-expand' }
											/>
										</Button>

										<div className="ab-layout-design-item">
											{ /* Insert the selected layout */ }
											<Button
												key={ key }
												className="ab-layout-insert-button"
												isSmall
												onClick={ () => { this.onInsertContent( content ) } }
											>
												<LazyLoad>
													<img
														src={ image }
														alt={ name }
													/>
												</LazyLoad>
											</Button>

											<div className="ab-layout-design-info">
												<div className="ab-layout-design-title">{ name }</div>
												{ /* Favorite button */ }
												{ <Button
													key={ 'buttonFavorite' }
													className="ab-layout-favorite-button"
													isSmall
													onClick={ () => {
														// alert( 'Oh, hello. This is not done yet.' )
													} }
												>
													<Dashicon
														icon={ 'heart' }
														className={ 'ab-layout-icon-favorite' }
													/>
												</Button> }

												{ <FavoriteButton
													layoutId={ id }
												/> }
											</div>
										</div>
									</div>
								</div>
							);
						}
					} ) }
				</ButtonGroup>
			</Fragment>
		);
	}
}

export default compose(
	/**
	 * Use rawHandler to parse html layouts to blocks
	 * See https://git.io/fjqGc for details
	 */
	withSelect( ( select, { clientId } ) => {
		const {
			getBlock,
			canUserUseUnfilteredHTML
		} = select( 'core/editor' );
		const block = getBlock( clientId );
		return {
			block,
			canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
		};
	} ),
	withDispatch( ( dispatch, { block, canUserUseUnfilteredHTML } ) => ( {
		import: ( blockLayout ) => dispatch( 'core/editor' ).replaceBlocks(
			block.clientId,
			rawHandler( {
				HTML: blockLayout,
				mode: 'BLOCKS',
				canUserUseUnfilteredHTML,
			} ),
		),
	} ) ),
)( LayoutLibrary );
