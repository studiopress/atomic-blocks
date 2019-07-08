/**
 * Layout modal window with tab panel.
 */

import LayoutLibrary from './layout-library';
import { LayoutsContext } from '../layouts-provider';

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
	Modal,
	TabPanel
} = wp.components;

class LayoutModal extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			modalOpen: true,
			currentTab: 'ab-layout-tab-sections'
		};
	}

	render() {
		return (
			<Fragment key={ 'layout-modal-fragment-' + this.props.clientId }>
				{ /* Launch the layout modal window */ }
				<Button
					key={ 'layout-modal-library-button-' + this.props.clientId }
					isPrimary
					isLarge
					className="ab-layout-modal-button"
					onClick={ () => this.setState({
						modalOpen: true
					}) }
				>
					{ __( 'Layout Library', 'atomic-blocks' ) }
				</Button>
				{ this.state.modalOpen ?
					<LayoutsContext.Consumer key={ 'layouts-context-provider-' + this.props.clientId }>
						{ ( context ) => (
							<Modal
								key={ 'layout-modal-modal-component-' + this.props.clientId }
								className="ab-layout-modal"
								title={ __( 'Layout Selector', 'atomic-blocks' ) }
								onRequestClose={ () => this.setState({ modalOpen: false }) }
							>
								<TabPanel
									key={ 'layout-modal-tabpanel-' + this.props.clientId }
									className="ab-layout-modal-panel"
									activeClass="ab-layout-modal-active-tab"
									onSelect={ ( tabName ) => this.setState({
										currentTab: tabName
									}) }
									tabs={ [
										{
											name: 'ab-layout-tab-sections',
											title: __( 'Sections', 'atomic-blocks' ),
											className: 'ab-layout-tab-sections'
										},
										{
											name: 'ab-layout-tab-layouts',
											title: __( 'Layouts', 'atomic-blocks' ),
											className: 'ab-layout-tab-layouts'
										},
										{
											name: 'ab-layout-tab-favorites',
											title: __( 'Favorites', 'atomic-blocks' ),
											className: 'ab-layout-tab-favorites'
										}
									] }>
									{
										( tab ) => {

											let tabContent = __( 'Default tab content', 'atomic-blocks' );

											if ( tab.name ) {
												if ( 'ab-layout-tab-sections' === tab.name ) {
													return [
														<LayoutLibrary
															key={ 'layout-library-sections-' + this.props.clientId }
															clientId={ this.props.clientId }
															currentTab={ this.state.currentTab }
															data={ context.sections }
															context={ context }
														/>
													];
												}

												if ( 'ab-layout-tab-layouts' === tab.name ) {
													return [
														<LayoutLibrary
															key={ 'layout-library-layouts-' + this.props.clientId }
															clientId={ this.props.clientId }
															currentTab={ this.state.currentTab }
															data={ context.layouts }
															context={ context }
														/>
													];
												}

												if ( 'ab-layout-tab-favorites' === tab.name ) {
													return [
														<LayoutLibrary
															key={ 'layout-library-favorites-' + this.props.clientId }
															clientId={ this.props.clientId }
															currentTab={ this.state.currentTab }
															data={ context.favorites }
															context={ context }
														/>
													];
												}
											}
											return <div>{ tabContent }</div>;
										}
									}
								</TabPanel>
							</Modal>
						)}
					</LayoutsContext.Consumer> :
					null }
			</Fragment>
		);
	}
}
export default LayoutModal;
