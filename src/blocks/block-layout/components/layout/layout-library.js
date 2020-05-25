/**
 * Layout Library UI.
 *
 * Interface for browsing, searching, filtering and inserting sections and layouts.
 */

/**
 * Dependencies.
 */
import map from 'lodash/map';
import classnames from 'classnames';
import LayoutLibraryItem from './layout-library-item';
import { LayoutsContext } from '../layouts-provider';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { addQueryArgs } = wp.url;
const { Component, Fragment } = wp.element;
const {
	ButtonGroup,
	TextControl,
	SelectControl,
} = wp.components;

export default class LayoutLibrary extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			category: 'all',
			search: undefined,
			activeView: 'grid',
		};
	}

	/* Conditionally load the layout array based on the tab. */
	getLayoutArray() {
		let component = [];

		switch ( this.props.currentTab ) {
			case 'ab-layout-tab-layouts':
				component = this.props.context.layouts;
				break;
			case 'ab-layout-tab-sections':
				component = this.props.context.sections;
				break;
			case 'ab-layout-tab-favorites':
				component = this.props.context.favorites;
				break;
			case 'ab-layout-tab-reusable-blocks':
				component = this.props.context.reusableBlocks;
		}

		return component;
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
			return {
				value: item,
				label: item.charAt( 0 ).toUpperCase() + item.slice( 1 ),
			};
		} );

		return (
			<Fragment key={ 'layout-library-fragment-' + this.props.clientId }>
				{ /* Category filter and search header. */ }
				{ 'ab-layout-tab-reusable-blocks' !== this.props.currentTab ? (
					<Fragment>
						<div className="ab-layout-modal-header">
							<SelectControl
								key={
									'layout-library-select-categories-' +
									this.props.clientId
								}
								label={ __(
									'Layout Categories',
									'atomic-blocks'
								) }
								value={ this.state.category }
								options={ catOptions }
								onChange={ ( value ) =>
									this.setState( { category: value } )
								}
							/>
							<TextControl
								key={
									'layout-library-search-layouts-' +
									this.props.clientId
								}
								type="text"
								value={ this.state.search }
								placeholder={ __(
									'Search Layouts',
									'atomic-blocks'
								) }
								onChange={ ( value ) =>
									this.setState( { search: value } )
								}
							/>
						</div>
					</Fragment>
				) : (
					<Fragment>
						{ /* Header for reusable blocks. */ }
						<div className="ab-layout-modal-header ab-layout-modal-header-reusable">
							<div>
								{ __( 'Reusable Blocks', 'atomic-blocks' ) }
							</div>
							<div className="ab-layout-modal-header-reusable-actions">
								<a
									className="editor-inserter__manage-reusable-blocks block-editor-inserter__manage-reusable-blocks"
									href={ addQueryArgs( 'edit.php', {
										post_type: 'wp_block',
									} ) }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __(
										'Manage All Reusable Blocks',
										'atomic-blocks'
									) }
								</a>
							</div>
						</div>
					</Fragment>
				) }

				<LayoutsContext.Consumer>
					{ ( context ) => (
						<ButtonGroup
							key={
								'layout-library-context-button-group-' +
								this.props.clientId
							}
							className={ classnames(
								'ab-layout-choices',
								'current-tab-' + this.props.currentTab,
								'full' === this.state.activeView
									? 'ab-layout-view-full'
									: null
							) }
							aria-label={ __(
								'Layout Options',
								'atomic-blocks'
							) }
						>
							{ map(
								this.props.data,
								( {
									name,
									key,
									image,
									content,
									category,
									keywords,
								} ) => {
									if (
										( 'all' === this.state.category ||
											category.includes(
												this.state.category
											) ) &&
										( ! this.state.search ||
											( keywords &&
												keywords.some( ( x ) =>
													x
														.toLowerCase()
														.includes(
															this.state.search.toLowerCase()
														)
												) ) )
									) {
										return (
											/* Section and layout items. */
											<LayoutLibraryItem
												key={
													'layout-library-item-' + key
												}
												name={ name }
												itemKey={
													key
												} /* 'key' is reserved, so we use itemKey. */
												image={ image }
												content={ content }
												context={ context }
												clientId={ this.props.clientId }
												currentTab={
													this.props.currentTab
												}
											/>
										);
									}
								}
							) }
						</ButtonGroup>
					) }
				</LayoutsContext.Consumer>
			</Fragment>
		);
	}
}
