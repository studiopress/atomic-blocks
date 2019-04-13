/**
 * Favorite button
 */

const { __ } = wp.i18n;
const { apiFetch } = wp;
const {
	Component,
	Fragment
} = wp.element;
const { InspectorControls } = wp.editor;
const {
	PanelBody,
	PanelRow,
	TextControl,
	Button,
	Spinner
} = wp.components;

/* Retrieve the setting value from the setting endpoint.  */
function getSetting() {
	return apiFetch( { path: "/abtestsetting/v1/block-setting" } )
		.then( blockSetting => blockSetting )
		.catch( error => console.error( error ) );
}

/* Set the setting when the update is triggered. */
function setSetting( setting ) {
	return apiFetch( {
		path: "/abtestsetting/v1/block-setting",
		method: "POST",
		body: setting
	} )
    .then( blockSetting => blockSetting )
	.catch( error => console.error( error ) );
}

export default class Edit extends Component {
	state = {
		blockSetting: '',
		isLoading: true,
		isSaving: false,
		isEditing: false
	};

	/* Update the global setting. */
	updateSetting = async () => {
		this.setState( { isSaving: true } );
		const blockSetting = await setSetting( this.state.blockSetting );
		this.setState( {
			blockSetting,
			isLoading: false,
			isSaving: false,
			isEditing: false,
		} );
	};

	/* Wait for the data to be available and setup the setting. */
	async componentDidMount() {
		const blockSetting = await getSetting();
		this.setState( {
			blockSetting,
			isLoading: false
		} );
	}

	render() {
		const { className } = this.props;

		if ( this.state.isLoading ) {
			return (
				<p><Spinner /> { __( 'Loading', 'atomic-blocks' ) }</p>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Block Setting', 'atomic-blocks') }
						initialOpen={ true }
					>
						<PanelRow>
							{ this.state.isEditing || this.state.blockSetting === "" ? (
								<p>
									<TextControl
										label={ __( 'Global setting', 'atomic-blocks' ) }
										value={ this.state.blockSetting }
										onChange={ blockSetting => {
											if ( !this.state.isSaving ) {
												this.setState({
													blockSetting,
													isEditing: true,
												});
											}
										} }
									/>
									{ /* Save or update the setting */ }
									<Button
										isPrimary
										disabled={ this.state.isSaving }
										onClick={ () => {
											this.updateSetting();
										} }
										>
										{ __( 'Save Setting', 'atomic-blocks' ) }
									</Button>{ " " }
									{ this.state.blockSetting !== "" && (
										<Button
											isDefault
											disabled={ this.state.isSaving }
											onClick={ async () => {
												this.setState( { isEditing: false } );
												const blockSetting = await getSetting();
												this.setState( { blockSetting } );
											} }
										>
											{ __( 'Cancel', 'atomic-blocks' ) }
										</Button>
									) }
								</p>
							) : (
							<Fragment>
								<p>{ __( 'Global Setting Saved', 'atomic-blocks' ) }</p>
									<Button
										isDefault
										onClick={ () =>
											this.setState( {
												isEditing: true
											} )
										}
									>
										{ __( 'Edit', 'atomic-blocks' ) }
									</Button>
							</Fragment>
						) }
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className={ className }>
					{ this.state.blockSetting === "" ? (
						<p>{ __( 'Please enter a block settings value in the block settings', 'atomic-blocks' ) }</p>
					) : (
						<p>
							{ __( 'Global Setting: ', 'atomic-blocks' ) }
							{ this.state.blockSetting }
						</p>
					) }
				</div>
			</Fragment>
		);
	}
}
