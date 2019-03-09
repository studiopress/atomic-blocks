// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import Layout from './layout';
import memoize from 'memize';
import _times from 'lodash/times';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
} = wp.editor;

// Set allowed blocks and media
const ALLOWED_BLOCKS = [ 'atomic-blocks/ab-layout-column' ];

// Get the layout template
const getLayoutTemplate = memoize( ( columns ) => {
	return _times( columns, () => [ 'atomic-blocks/ab-layout-column' ] );
} );

export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			selectLayout: true,
		}
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				columnsGap,
				align,
				layoutClass,
				layout,
			},
			attributes,
			isSelected,
			edicolumn,
			className,
			setAttributes
		} = this.props;

		// Show the layout placeholder
		// if ( ! layout && this.state.selectLayout ) {
		// 	return [
		// 		<Fragment>
		// 			{ isSelected && (
		// 				<Inspector
		// 					{ ...this.props }
		// 				/>
		// 			) }
		// 			<Placeholder
		// 				key="placeholder"
		// 				icon={ columns ? rowIcons.layout : rowIcons.row }
		// 				label={ columns ? __( 'Row Layout' ) : __( 'Row' ) }
		// 				instructions={ columns ? sprintf( __( 'Now select a layout for this %s column row.' ), this.numberToText( columns ) ) : __( 'Select the number of columns for this row.' ) }
		// 				className={ 'components-coblocks-visual-dropdown' }
		// 			>
		// 				{ ! columns ?
		// 					<ButtonGroup aria-label={ __( 'Select Row Columns' ) }>
		// 						{ map( columnOptions, ( { name, key, icon, columns } ) => (
		// 							<Tooltip text={ name }>
		// 								<div className="components-coblocks-visual-dropdown__button-wrapper">
		// 									<Button
		// 										className="components-coblocks-visual-dropdown__button"
		// 										isSmall
		// 										onClick={ () => {
		// 											setAttributes( {
		// 												columns: columns,
		// 												layout: columns === 1 ? key : null,
		// 											} );

		// 											{ columns === 1 &&
		// 												this.setState( { 'layoutSelection' : false } );
		// 											}
		// 										} }
		// 									>
		// 										{ icon }
		// 									</Button>
		// 								</div>
		// 							</Tooltip>
		// 						) ) }
		// 					</ButtonGroup>
		// 				:
		// 					<Fragment>
		// 						<ButtonGroup aria-label={ __( 'Select Row Layout' ) }>
		// 							<IconButton
		// 								icon="exit"
		// 								className="components-coblocks-visual-dropdown__back"
		// 								onClick={ () => {
		// 									setAttributes( {
		// 										columns: null,
		// 									} );
		// 									this.setState( { 'layoutSelection' : true } );
		// 								} }
		// 								label={ __( 'Back to Columns' ) }
		// 							/>
		// 							{ map( layoutOptions[ selectedRows ], ( { name, key, icon, cols } ) => (
		// 								<Tooltip text={ name }>
		// 									<div className="components-coblocks-visual-dropdown__button-wrapper">
		// 										<Button
		// 											key={ key }
		// 											className="components-coblocks-visual-dropdown__button"
		// 											isSmall
		// 											onClick={ () => {
		// 												setAttributes( {
		// 													layout: key,
		// 												} );
		// 												this.setState( { 'layoutSelection' : false } );
		// 											} }
		// 										>
		// 											{ icon }
		// 										</Button>
		// 									</div>
		// 								</Tooltip>
		// 							) ) }
		// 						</ButtonGroup>
		// 					</Fragment>
		// 				}
		// 			</Placeholder>
		// 		</Fragment>
		// 	];
		// }

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ align }
					onChange={ align => setAttributes( { align } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the block markup in the editor
			<Layout { ...this.props }>
				<div
					className={ classnames(
						'ab-layout-column-wrap-admin',
						'ab-block-layout-column-gap-' + columnsGap
					) }
				>
					<InnerBlocks
						template={ getLayoutTemplate( columns ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</Layout>
		];
	}
}
