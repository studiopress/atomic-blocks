/**
 * Edit component.
 */

 /**
 * Import dependencies.
 */
import classnames from 'classnames';
import Inspector from './inspector';
import _times from 'lodash/times';
import LayoutModal from './modal';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Placeholder } = wp.components;
const { Component, Fragment } = wp.element;
const {
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

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

		const {
			attributes,
			isSelected,
			setAttributes,
			clientId,
		} = this.props;

		/* Placeholder with layout modal */
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
					label={ __( 'Layout Selector', 'atomic-blocks' ) }
					icon="layout"
					instructions={ __( 'Select a layout, bro.', 'atomic-blocks' ) }
					className={ 'ab-layout-selector-placeholder' }
				>
					<LayoutModal clientId={ clientId } />
				</Placeholder>
			</Fragment>
		];
	}
}
