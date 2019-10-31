/**
 * Layout Library Section and Layout Item.
 */

 /**
 * Dependencies.
 */
import LayoutLibraryItemCard from './layout-library-item-card';
import LayoutLibraryItemList from './layout-library-item-list';

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

class LayoutLibraryItem extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		return (
			<Fragment>
				{ /* Insert the selected layout. */ }
				{ ( 'ab-layout-tab-reusable-blocks' ) != this.props.currentTab ?
					<LayoutLibraryItemCard { ...this.props }/> :
					<LayoutLibraryItemList { ...this.props }/>
				}
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
