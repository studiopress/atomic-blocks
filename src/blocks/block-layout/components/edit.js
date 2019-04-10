// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import _times from 'lodash/times';
import LayoutModal from './modal';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Register editor components
const {
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	Placeholder,
} = wp.components;

export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		} else if ( this.props.attributes.uniqueID && this.props.attributes.uniqueID !== '_' + this.props.clientId.substr( 2, 9 ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		}
	}

	render() {

		// Setup the attributes
		const {
			attributes,
			isSelected,
			setAttributes,
			clientId,
		} = this.props;

		// Show the layout placeholder
		return [
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ attributes.align }
					onChange={ align => setAttributes( { align } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
			</BlockControls>,
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			<Fragment>
				<Placeholder
					key="placeholder"
					icon="welcome-widgets-menus"
					label={ __( 'Column Layout', 'atomic-blocks' ) }
					instructions={ __( 'Select a layout, bro.', 'atomic-blocks' ) }
					className={ 'ab-layout-selector-placeholder' }
				>
					<LayoutModal
						clientId={ clientId }
					/>
				</Placeholder>
			</Fragment>
		];
	}
}
