/**
 * Layout Library UI.
 *
 * Interface for browsing, searching, filtering and inserting sections and layouts.
 */

 /**
 * Dependencies.
 */
import map from 'lodash/map';
import layoutArray from './layouts';
//import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;
const { compose } = wp.compose;
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
	Tooltip,
	TextControl,
	SelectControl,
	Dashicon,
} = wp.components;
const {
	rawHandler,
	createBlock,
} = wp.blocks;

class LayoutLibrary extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			category: 'all',
			search: null,
		};
	}

	/* Insert the block layout. */
	onInsertContent( blockcode ) {
		this.props.import( blockcode );
	}

	/* Capitalize category labels in drop down. */
	capitalizeFirstLetter( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}

	render() {
		/* Grab the layout array. */
		const blockLayout = applyFilters( 'ab.layout_array', layoutArray );

		/* Set a default category. */
		const cats = [ 'all' ];

		/* Create a category array. */
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
				{ /* Category filter and search header */ }
				<div className="ab-layout-modal-header">
					<SelectControl
						label={ __( 'Category', 'atomic-blocks' ) }
						value={ this.state.category }
						options={ catOptions }
						onChange={ value => this.setState( { category: value } ) }
					/>
					<TextControl
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
											<img
												src={ image }
												alt={ name }
											/>
										</Button>

										<div class="ab-layout-design-info">
											<div className="ab-layout-design-title">{ name }</div>
											{ /* Favorite button */ }
											<Button
												key={ key }
												className="ab-layout-favorite-button"
												isSmall
												onClick={ () => {
												// Get the ID from layouts.js and add to global favorite setting

												// this.setState(previousState => ({
												// 	myArray: [...previousState.myArray, 'new value']
												// }));

												//or

												// var newArray = this.state.arr.slice();
												// newArray.push("new value");
												// this.setState({arr:newArray})
												alert( id )
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
	withSelect( ( select, { clientId } ) => {
		const { getBlock, canUserUseUnfilteredHTML } = select( 'core/editor' );
		const block = getBlock( clientId );
		return {
			block,
			canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
		};
	} ),
	withDispatch( ( dispatch, { block, canUserUseUnfilteredHTML } ) => ( {
		import: ( blockcode ) => dispatch( 'core/editor' ).replaceBlocks(
			block.clientId,
			rawHandler( {
				HTML: blockcode,
				mode: 'BLOCKS',
				canUserUseUnfilteredHTML,
			} ),
		),
	} ) ),
)( LayoutLibrary );
