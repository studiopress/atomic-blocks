/**
 * Layout Library Card Item.
 */

 /**
 * Dependencies.
 */
import classnames from 'classnames';
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies.
 */
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

export default class LayoutLibraryItemCard extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<Fragment>
				<div key={ 'ab-layout-design-' + this.props.itemKey } className="ab-layout-design">
					<div className="ab-layout-design-inside">
						<div className="ab-layout-design-item">
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
