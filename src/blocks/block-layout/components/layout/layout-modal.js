/**
 * Layout modal window with tab panel.
 */

import LayoutLibrary from './layout-library';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;
const {
	Button,
	Modal,
	TabPanel,
} = wp.components;

class LayoutModal extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			modalOpen: false,
			currentTab: 'ab-layout-tab-sections',
		};
	}

	render() {
		//console.log(this.state.currentTab);
		return (
			<Fragment>
				{ /* Launch the layout modal window */ }
				<Button
					isPrimary
					isLarge
					className="ab-layout-modal-button"
					onClick={ () => this.setState( {
						modalOpen: true
					} ) }
				>
					{ __( 'Layout Library', 'atomic-blocks' ) }
				</Button>
					{ this.state.modalOpen ?
						<Modal
							className="ab-layout-modal"
							title={ __( 'Layout Selector', 'atomic-blocks' ) }
							onRequestClose={ () => this.setState( { modalOpen: false } ) }
						>
							<TabPanel
								className="ab-layout-modal-panel"
								activeClass="ab-layout-modal-active-tab"
								onSelect={ ( tabName ) => this.setState( {
									currentTab: tabName
								} ) }
								tabs={ [
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
									{
										name: 'ab-layout-tab-reusable',
										title: __( 'Reusable Blocks', 'atomic-blocks' ),
										className: 'ab-layout-tab-reusable',
									},
								] }>
								{
									( tab ) => {
										let tabContent;
										if ( tab.name ) {
											if ( 'ab-layout-tab-sections' === tab.name ) {
												return [
													<LayoutLibrary
														clientId={ this.props.clientId }
														currentTab={ this.state.currentTab }
														content={ 'section' }
													/>
												]
											} else if ( 'ab-layout-tab-layouts' === tab.name ) {
												return [
													<LayoutLibrary
														clientId={ this.props.clientId }
														currentTab={ this.state.currentTab }
														content={ 'layout' }
														blockLayout={ 'blockLayout' }
													/>
												]
											} else if ( 'ab-layout-tab-favorites' === tab.name ) {
												tabContent = __( 'Add layout and section favorites here' );
											} else if ( 'ab-layout-tab-reusable' === tab.name ) {
												tabContent = __( 'Add access to reusable blocks here' );
											} else {
												tabContent = __( 'Default tab content' );
											}
										}
										return <div>{ tabContent }</div>;
									}
								}
							</TabPanel>
						</Modal>
					: null }
			</Fragment>
		);
	}
}
export default LayoutModal;
