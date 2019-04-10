const {
	Component,
	Fragment,
} = wp.element;

const {
	Button,
	Modal,
	TabPanel,
} = wp.components;

import LayoutLibrary from './library';

const { __ } = wp.i18n;

const onSelect = ( tabName ) => {
	console.log( 'Selecting tab', tabName );
};

const MyTabPanel = () => (
	<TabPanel className="my-tab-panel"
		activeClass="active-tab"
		onSelect={ onSelect }
		tabs={ [
			{
				name: 'tab1',
				title: 'Layouts',
				className: 'tab-one',
			},
			{
				name: 'tab2',
				title: 'Sections',
				className: 'tab-two',
			},
			{
				name: 'tab3',
				title: 'Favorites',
				className: 'tab-three',
			},
		] }>
		{
			( tab ) => {
				let tabContent;
				if ( tab.name ) {
					if ( 'tab1' === tab.name ) {
						tabContent = __( 'Tab one content' );
					} else if ( 'tab2' === tab.name ) {
						tabContent = __( 'Tab two content' );
					} else if ( 'tab3' === tab.name ) {
						tabContent = __( 'Tab three content' );
					} else {
						tabContent = __( 'Tab three content' );
					}
				}
				return <div>{ tabContent }</div>;
			}
		}
	</TabPanel>
);

class CustomComponent extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			modalOpen: false,
			sectionTab: false,
		};
	}
	render() {
		return (
			<Fragment>
				<Button isPrimary className="" onClick={ () => this.setState( { modalOpen: true } ) }>{ __( 'Layout Library' ) }</Button>
				{ this.state.modalOpen ?
					<Modal
						className="ab-layout-modal"
						title={ __( 'Layout Selector', 'atomic-blocks' ) }
						onRequestClose={ () => this.setState( { modalOpen: false } ) }
					>
						<TabPanel className="my-tab-panel"
							activeClass="active-tab"
							onSelect={ onSelect }
							tabs={ [
								{
									name: 'tab1',
									title: 'Layouts',
									className: 'tab-one',
								},
								{
									name: 'tab2',
									title: 'Sections',
									className: 'tab-two',
								},
								{
									name: 'tab3',
									title: 'Favorites',
									className: 'tab-three',
								},
								{
									name: 'tab4',
									title: 'Reusable Blocks',
									className: 'tab-four',
								},
							] }>
							{
								( tab ) => {
									let tabContent;
									if ( tab.name ) {
										if ( 'tab1' === tab.name ) {
											return [
												<LayoutLibrary
													clientId={ this.props.clientId }
												/>
											]
										} else if ( 'tab2' === tab.name ) {
											//updateSetting();
											tabContent = __( 'Add layout sections here' );
										} else if ( 'tab3' === tab.name ) {
											tabContent = __( 'Add layout and section favorites here' );
										} else if ( 'tab4' === tab.name ) {
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
export default CustomComponent;
