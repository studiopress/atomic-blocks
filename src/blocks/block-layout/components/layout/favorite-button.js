/**
 * Favorite button
 */

const { __ } = wp.i18n;
const { apiFetch } = wp;
const {
	Component,
	Fragment
} = wp.element;
const {
	TextControl,
	Button,
	Spinner
} = wp.components;

/* Retrieve the setting value from the setting endpoint.  */
function getSetting() {
	return apiFetch( { path: "/favoritemeta/v1/block-setting" } )
		.then( blockSetting => blockSetting )
		.catch( error => console.error( error ) );
}

/* Set the setting when the update is triggered. */
function setSetting( setting ) {
	return apiFetch( {
		path: "/favoritemeta/v1/block-setting",
		method: "POST",
		body: setting
	} )
    .then( blockSetting => blockSetting )
	.catch( error => console.error( error ) );
}

export default class FavoriteButton extends Component {

	constructor() {
		super( ...arguments );
	}

	state = {
		blockSetting: [],
		isLoading: true,
		isSaving: false,
		isEditing: false,
		layoutArray: [1,2,3],
		layoutID: this.props.layoutId,
	};

	/* Update the global setting. */
	updateSetting = async () => {
		this.setState( { isSaving: true } );
		//const blockSetting = await setSetting( this.state.blockSetting.concat( [ this.state.layoutArrayAdd ] ) );

		const blockSetting = await setSetting( [...this.state.blockSetting, ...[this.props.layoutArrayAdd] ] );

		this.setState(prevState => ( {
			layoutArray: prevState.layoutArray.concat(this.state.layoutID),
		} ) )

		this.setState( {
			// layoutArray: [...this.state.layoutArray, {"value": } ],

			// layoutArrayAdd: [ this.state.blockSetting.concat( [ this.props.layoutId ] ) ],
			// layoutArrayAdd: [...this.state.myArray, ...[this.props.layoutId] ],
			//blockSetting,
			isLoading: false,
			isSaving: false,
			isEditing: false,
		} );
		//console.log(this.state.blockSetting);
		console.log( 'layoutArray: ' + this.state.layoutArray);
		console.log( 'layoutArrayAdd: ' + this.state.layoutArrayAdd);
		console.log( 'layoutArrayMerged: ' + this.state.layoutArrayMerged);
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
				<Button
					isPrimary
					disabled={ this.state.isSaving }
					onClick={ () => {
						this.updateSetting();
					} }
					>
					{ __( 'Add to Favorites', 'atomic-blocks' ) }
				</Button>

				{ 'Favorite IDs: ' + this.state.layoutArray }
			</Fragment>
		);
	}
}
