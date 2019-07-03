/**
 * Layout Library Section and Layout Item.
 */

 /**
 * Dependencies.
 */
import classnames from 'classnames';
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies.
 */
const { compose } = wp.compose;
const { rawHandler } = wp.blocks;
const {
	withSelect,
	withDispatch
} = wp.data;
const { __ } = wp.i18n;
const {
	Component,
	Fragment
} = wp.element;
const {
	Button,
	Dashicon,
	Tooltip
} = wp.components;

class LayoutLibraryItem extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<Fragment>
				<div key={ 'ab-layout-design-' + this.props.itemKey } className="ab-layout-design">
					<div className="ab-layout-design-inside">
						<div className="ab-layout-design-item">
							{ /* Insert the selected layout. */ }
							<Button
								key={ this.props.itemKey }
								className="ab-layout-insert-button"
								isSmall
								onClick={ () => {
 this.props.import( this.props.content );
} }
							>
								<LazyLoad>
									<img
										src={ this.props.image }
										alt={ this.props.name }
									/>
								</LazyLoad>
							</Button>

							<div className="ab-layout-design-info">
								<div className="ab-layout-design-title">{ this.props.name }
									{ <Tooltip text={ this.props.context.favoriteKeys.includes( this.props.itemKey ) ? __( 'Remove from Favorites', 'atomic-blocks' ) : __( 'Add to Favorites', 'atomic-blocks' ) }>
										<Button
											key={ 'buttonFavorite' }
											className='ab-layout-favorite-button'
											isSmall
											onClick={ () => {
												this.props.context.toggleFavorite( this.props.itemKey );
											} }
										>
											<Dashicon
												icon={ 'heart' }
												className={ classnames(
													'ab-layout-icon-favorite',
													this.props.context.favoriteKeys.includes( this.props.itemKey ) && 'ab-layout-icon-favorite-active'
												) }
											/>
										</Button>
									</Tooltip> }
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(

	/**
	 * Use rawHandler to parse html layouts to blocks
	 * See https://git.io/fjqGc for details
	 */
	withSelect( ( select, { clientId }) => {
		const {
			getBlock,
			canUserUseUnfilteredHTML
		} = select( 'core/editor' );
		const block = getBlock( clientId );
		return {
			block,
			canUserUseUnfilteredHTML: canUserUseUnfilteredHTML()
		};
	}),
	withDispatch( ( dispatch, { block, canUserUseUnfilteredHTML }) => ({
		import: ( blockLayout ) => dispatch( 'core/editor' ).replaceBlocks(
			block.clientId,
			rawHandler({
				HTML: blockLayout,
				mode: 'BLOCKS',
				canUserUseUnfilteredHTML
			}),
		)
	}) ),
)( LayoutLibraryItem );
