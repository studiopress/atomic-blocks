/**
 * Layout modal window with tab panel.
 */

import LayoutLibrary from './layout-library';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Button, Dashicon, Modal, TabPanel } = wp.components;

class LayoutModal extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			currentTab: 'ab-layout-tab-sections',
		};
	}

	componentDidMount() {
		this.setState( { modalOpen: true } );
	}
	render() {
		const tabs = [
			{
				name: 'ab-layout-tab-sections',
				title: __( 'Sections', 'atomic-blocks' ),
				className: 'ab-layout-tab-sections',
			},
			{
				name: 'ab-layout-tab-layouts',
				title: __( 'Layouts', 'atomic-blocks' ),
				className: 'ab-layout-tab-layouts',
			},
			{
				name: 'ab-layout-tab-favorites',
				title: __( 'Favorites', 'atomic-blocks' ),
				className: 'ab-layout-tab-favorites',
			},
		];

		if ( this.props.context.reusableBlocks.length ) {
			tabs.push( {
				name: 'ab-layout-tab-reusable-blocks',
				title: __( 'Reusable Blocks', 'atomic-blocks' ),
				className: 'ab-layout-tab-reusable-blocks',
			} );
		}

		return (
			<Fragment key={ 'layout-modal-fragment-' + this.props.clientId }>
				{ /* Launch the layout modal window */ }
				<Button
					key={ 'layout-modal-library-button-' + this.props.clientId }
					isPrimary
					className="ab-layout-modal-button"
					onClick={ () =>
						this.setState( {
							modalOpen: true,
						} )
					}
				>
					{ __( 'Layout Library', 'atomic-blocks' ) }
				</Button>
				{ this.state.modalOpen ? (
					<Modal
						key={
							'layout-modal-modal-component-' +
							this.props.clientId
						}
						className="ab-layout-modal"
						title={ __( 'Layout Selector', 'atomic-blocks' ) }
						onRequestClose={ () =>
							this.setState( {
								modalOpen: false,
								currentTab: null,
							} )
						}
					>
						{ atomic_globals.pro_activated && (
							<div className="ab-layout-modal-footer">
								<Dashicon icon={ 'editor-help' } />
								<a
									href={
										'https://developer.wpengine.com/genesis-pro/genesis-page-builder/layouts-block/'
									}
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __(
										'Add Custom Layouts',
										'atomic-blocks'
									) }
								</a>
								<span>&middot;</span>
								<a
									href={
										'https://developer.wpengine.com/genesis-pro/genesis-page-builder/reusable-blocks/'
									}
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'Reusable Blocks', 'atomic-blocks' ) }
								</a>
								<a
									href={
										'https://www.research.net/r/genesispro'
									}
									target="_blank"
									rel="noopener noreferrer"
									className="ab-pro-feedback"
								>
									<Dashicon icon={ 'admin-comments' } />{ ' ' }
									{ __( 'Send Feedback', 'atomic-blocks' ) }
								</a>
							</div>
						) }
						<TabPanel
							key={
								'layout-modal-tabpanel-' + this.props.clientId
							}
							className="ab-layout-modal-panel"
							activeClass="ab-layout-modal-active-tab"
							onSelect={ ( tabName ) =>
								this.setState( {
									currentTab: tabName,
								} )
							}
							tabs={ tabs }
						>
							{ ( tab ) => {
								const tabContent = __(
									'Default tab content',
									'atomic-blocks'
								);

								if ( tab.name ) {
									if (
										'ab-layout-tab-sections' === tab.name
									) {
										return [
											<LayoutLibrary
												key={
													'layout-library-sections-' +
													this.props.clientId
												}
												clientId={ this.props.clientId }
												currentTab={
													this.state.currentTab
												}
												data={
													this.props.context.sections
												}
												context={ this.props.context }
											/>,
										];
									}

									if (
										'ab-layout-tab-layouts' === tab.name
									) {
										return [
											<LayoutLibrary
												key={
													'layout-library-layouts-' +
													this.props.clientId
												}
												clientId={ this.props.clientId }
												currentTab={
													this.state.currentTab
												}
												data={
													this.props.context.layouts
												}
												context={ this.props.context }
											/>,
										];
									}

									if (
										'ab-layout-tab-favorites' === tab.name
									) {
										return [
											<LayoutLibrary
												key={
													'layout-library-favorites-' +
													this.props.clientId
												}
												clientId={ this.props.clientId }
												currentTab={
													this.state.currentTab
												}
												data={
													this.props.context.favorites
												}
												context={ this.props.context }
											/>,
										];
									}

									if (
										'ab-layout-tab-reusable-blocks' ===
										tab.name
									) {
										return [
											<LayoutLibrary
												key={
													'layout-library-reusable-blocks-' +
													this.props.clientId
												}
												clientId={ this.props.clientId }
												currentTab={
													this.state.currentTab
												}
												data={
													this.props.context
														.reusableBlocks
												}
												context={ this.props.context }
											/>,
										];
									}
								}
								return <div>{ tabContent }</div>;
							} }
						</TabPanel>
					</Modal>
				) : null }
			</Fragment>
		);
	}
}
export default LayoutModal;
