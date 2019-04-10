const { withSelect, withDispatch } = wp.data;
const {
	rawHandler,
	createBlock,
} = wp.blocks;
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
	applyFilters,
} = wp.hooks;
const { compose } = wp.compose;
import map from 'lodash/map';
//import LazyLoad from 'react-lazy-load';

import layoutArray from './layouts';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

class LayoutLibrary extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			category: 'all',
			search: null,
		};
	}
	onInsertContent( blockcode ) {
		this.props.import( blockcode );
	}
	// Capitalize category text
	capitalizeFirstLetter( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}
	render() {
		// Setup the library
		const blockLayout = applyFilters( 'ab.layout_array', layoutArray );

		// Set a defaut category
		const cats = [ 'all' ];

		for ( let i = 0; i < blockLayout.length; i++ ) {
			for ( let c = 0; c < blockLayout[ i ].category.length; c++ ) {
				if ( ! cats.includes( blockLayout[ i ].category[ c ] ) ) {
					cats.push( blockLayout[ i ].category[ c ] );
				}
			}
		}

		// Setup categories for select menu
		const catOptions = cats.map( ( item ) => {
			return { value: item, label: this.capitalizeFirstLetter( item ) }
		} );

		return (
			<Fragment>
				<div className="ab-layout-modal-header">
					<SelectControl
						label={ __( 'Category' ) }
						value={ this.state.category }
						options={ catOptions }
						onChange={ value => this.setState( { category: value } ) }
					/>
					<TextControl
						type="text"
						value={ this.state.search }
						placeholder={ __( 'Search' ) }
						onChange={ value => this.setState( { search: value } ) }
					/>
				</div>

				<ButtonGroup
					className={ "ab-layout-choices" }
					aria-label={ __( 'Layout Options' ) }
				>

					{ map( blockLayout, ( { name, key, image, content, background, category, keywords, id, favorite } ) => {
						if ( ( 'all' === this.state.category || category.includes( this.state.category ) ) && ( ! this.state.search || ( keywords && keywords.some( x => x.toLowerCase().includes( this.state.search.toLowerCase() ) ) ) ) ) {

							return (
								<div className="ab-layout-design" data-background-style={ background }>
									<div class="ab-layout-design-item">
										<Button
											key={ key }
											className="ab-layout-insert-button"
											isSmall
											onClick={ () => {
												this.onInsertContent( content )
											}  }
										>
											<img src={ image } alt={ name } />
										</Button>

										<div class="ab-layout-design-info">
											<div className="ab-layout-design-title">{ name }</div>
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
											}  }
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
