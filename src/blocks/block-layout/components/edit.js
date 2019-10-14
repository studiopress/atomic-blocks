/**
 * Edit component.
 */

 /**
 * Import dependencies.
 */
import LayoutModal from './layout/layout-modal';
import { LayoutsContext } from './layouts-provider';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Placeholder } = wp.components;
const { Component, Fragment } = wp.element;
const {
	BlockControls,
	BlockAlignmentToolbar
} = wp.editor;

export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
			clientId
		} = this.props;

		/* Placeholder with layout modal */
		return [
			<Fragment key={ this.props.clientId }>
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ attributes.align }
						onChange={ align => setAttributes({ align }) }
						controls={ [] }
					/>
				</BlockControls>
				<Placeholder
					key="placeholder"
					label={ __( 'Layout Selector', 'atomic-blocks' ) }
					instructions={ __( 'Launch the layout library to browse pre-designed sections.', 'atomic-blocks' ) }
					className={ 'ab-layout-selector-placeholder' }
					icon="layout"
				>
					<LayoutsContext.Consumer
						key={ 'layouts-context-provider-' + this.props.clientId }
					>
						{ ( context ) => (
							<LayoutModal clientId={ clientId } context={ context } />
						) }
					</LayoutsContext.Consumer>
				</Placeholder>
			</Fragment>
		];
	}
}
