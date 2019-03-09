// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import Layout from './layout';
import memoize from 'memize';
import _times from 'lodash/times';
import icons from './icons';
import layoutColumns from './layout-columns';
import map from 'lodash/map';

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

const {
	Placeholder,
	ButtonGroup,
	Tooltip,
	Button,
} = wp.components;

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
				columnStyle,
			},
			attributes,
			isSelected,
			edicolumn,
			className,
			setAttributes
		} = this.props;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		// Show the layout placeholder
		if ( ! columns && this.state.selectLayout ) {
			return [
				<Fragment>
					{ isSelected && (
						<Inspector
							{ ...this.props }
						/>
					) }
					<Placeholder
						key="placeholder"
						//icon={ columns ? rowIcons.layout : rowIcons.row }
						icon="welcome-widgets-menus"
						label={ columns ? __( 'Row Layout' ) : __( 'Select Column Layout' ) }
						instructions={ columns ? sprintf( __( 'Now select a layout for this %s column row.' ), this.numberToText( columns ) ) : __( 'Select the number of columns for this layout.' ) }
						//className={ '' }
					>
						{ ! columns ?
							<ButtonGroup aria-label={ __( 'Select Row Columns' ) }>
								{ map( layoutColumns, ( { name, key, icon, col, layout } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="kt-layout-btn"
											//isSmall
											// isPrimary={ selectColLayout === key }
											// aria-pressed={ selectColLayout === key }
											onClick={ () => this.props.setAttributes( {
												layoutClass: layout,
												columns: col,
											} ) }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
						:
							<Fragment>
								<ButtonGroup aria-label={ __( 'Select Row Layout' ) }>
									<IconButton
										icon="exit"
										className=""
										onClick={ () => {
											setAttributes( {
												columns: null,
											} );
											this.setState( { 'layoutSelection' : true } );
										} }
										label={ __( 'Back to Columns' ) }
									/>
									{ map( columnStyle[ selectedRows ], ( { name, key, icon, col, layout } ) => (
										<Tooltip text={ name }>
											<Button
												key={ key }
												className="kt-layout-btn"
												//isSmall
												// isPrimary={ selectColLayout === key }
												// aria-pressed={ selectColLayout === key }
												onClick={ () => this.props.setAttributes( {
													layoutClass: layout,
													columns: col,
												} ) }
											>
												{ icon }
											</Button>
										</Tooltip>
									) ) }
								</ButtonGroup>
							</Fragment>
						}
					</Placeholder>
				</Fragment>
			];
		}

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
