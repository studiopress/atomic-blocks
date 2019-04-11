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
import layoutArray from './layout-array';
import sectionArray from './layout-section-array';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;
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
} = wp.components;

class LayoutLibrary extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			category: 'all',
			search: null,
		};
	}

	/* Conditionally load the layout array based on the tab */
	getLayoutArray() {
		let component;
		switch ( this.props.currentTab ) {
			case 'ab-layout-tab-layouts' :
				component = layoutArray;
				break;
			case 'ab-layout-tab-sections' :
				component = sectionArray;
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

	render() {
		/* Grab the layout array. */
		const blockLayout = applyFilters( 'ab.layout_array', this.getLayoutArray() ? this.getLayoutArray() : layoutArray );

		/* Set a default category. */
		const cats = [ 'all' ];

		/* Show the filtered layout category. */
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

		return (
			<Fragment>
				{ /* Category filter and search header. */ }
				<div className="ab-layout-modal-header">
					<SelectControl
						label={ __( 'Category', 'atomic-blocks' ) }
						value={ this.state.category }
						options={ catOptions }
						onChange={ value => this.setState( { category: value } ) }
					/>
					<TextControl
					label={ __( 'Category', 'atomic-blocks' ) }
						type="text"
						value={ this.state.search }
						placeholder={ __( 'Search', 'atomic-blocks' ) }
						onChange={ value => this.setState( { search: value } ) }
					/>
				</div>

				<ButtonGroup
					className={ "ab-layout-choices" }
					aria-label={ __( 'Layout Options', 'atomic-blocks' ) }
				>
					{ map( blockLayout, ( { name, key, id, image, content, category, keywords, favorite } ) => {
						if ( ( 'all' === this.state.category || category.includes( this.state.category ) ) && ( ! this.state.search || ( keywords && keywords.some( x => x.toLowerCase().includes( this.state.search.toLowerCase() ) ) ) ) ) {
							return (
								<div className="ab-layout-design">
									<div class="ab-layout-design-item">
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

										<div class="ab-layout-design-info">
											<div className="ab-layout-design-title">{ name }</div>
											{ /* Favorite button */ }
											<Button
												key={ key }
												className="ab-layout-favorite-button"
												isSmall
												onClick={ () => {
													alert( 'Oh, hello. This is not done yet.' )
												} }
											>
												<Dashicon
													icon={ 'heart' }
													className={ 'ab-layout-favorite' }
												/>
											</Button>
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
