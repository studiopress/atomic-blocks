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

		// this.state = {
		// 	blockSetting: '',
		// 	isLoading: true,
		// 	isSaving: false,
		// 	isEditing: false
		// };
	}

	state = {
		blockSetting: [],
		isLoading: true,
		isSaving: false,
		isEditing: false,
		layoutArray: [],
		layoutArrayAdd: [],
	};

	// mergeArray() {
	// 	// const oldList = this.state.blockSetting;
	// 	// const newList = this.state.layoutArray;
	// 	// const mergedList = oldList.push( newList );

	// 	console.log( mergedList );

	// 	this.setState({ priceLog: this.state.pricelog.concat(this.props.price)});
	// };

	/* Update the global setting. */
	updateSetting = async () => {
		this.setState( { isSaving: true } );
		//const blockSetting = await setSetting( this.state.blockSetting.concat( [ this.state.layoutArrayAdd ] ) );

		const blockSetting = await setSetting( [...this.state.blockSetting, ...[this.props.layoutArrayAdd] ] );

		this.setState(prevState => ( {
			layoutArray: [...prevState.layoutArray, [ this.props.layoutId ]]
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
		console.log(this.state.layoutArray);
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
				<TextControl
					label={ __( 'Global setting', 'atomic-blocks' ) }
					value={ this.props.layoutId }
					onChange={ blockSetting => {
						if ( !this.state.isSaving ) {
							this.setState({
								blockSetting,
								isEditing: true,
							});
						}
					} }
				/>

				<Button
					isPrimary
					disabled={ this.state.isSaving }
					onClick={ () => {
						this.updateSetting();
					} }
					>
					{ __( 'Save Setting', 'atomic-blocks' ) }
				</Button>

				{ this.state.blockSetting }
			</Fragment>
		);
	}
}
