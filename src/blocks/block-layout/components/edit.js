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
	IconButton,
	Dashicon,
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

		const columnOptions = [
			{ columns: 1, name: __( 'One Column' ), icon: icons.row, key: '100', },
			{ columns: 2, name: __( 'Two Columns' ), icon: icons.twocol },
			{ columns: 3, name: __( 'Three Columns' ), icon: icons.threecol },
			{ columns: 4, name: __( 'Four Columns' ), icon: icons.fourcol },
		];

		console.log( icons.twocol );

		// Show the layout placeholder
		if ( ! layout && this.state.selectLayout ) {
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
						instructions={ columns ? sprintf( __( 'Select a layout for this column.' ) ) : __( 'Select the number of columns for this layout.' ) }
						//className={ '' }
					>
						{ ! columns ?
							<ButtonGroup aria-label={ __( 'Select Row Columns' ) } className="ab-layout-selector-group">
								{ map( columnOptions, ( { name, key, icon, columns } ) => (
									<Tooltip text={ name }>
										<div className="ab-layout-selector">
											<Button
												className="ab-layout-selector-button"
												isSmall
												onClick={ () => {
													setAttributes( {
														columns: columns,
														layout: columns === 1 ? key : null,
													} );

													{ columns === 1 &&
														this.setState( { 'selectLayout' : false } );
													}
												} }
											>
												{ icon }
											</Button>
										</div>
									</Tooltip>

								) ) }
							</ButtonGroup>
						:
							<Fragment>
								<ButtonGroup
									aria-label={ __( 'Select Row Layout' ) } className="ab-layout-selector-group"
									>
									{ map( layoutColumns[ selectedRows ], ( { name, key, icon, col } ) => (
										<Tooltip text={ name }>
											<div className="ab-layout-selector">
												<Button
													key={ key }
													className="ab-layout-selector-button"
													isSmall
													onClick={ () => {
														setAttributes( {
															layout: key,
														} );
														this.setState( { 'selectLayout' : false } );
													} }
												>
													{ icon }
												</Button>
											</div>
										</Tooltip>
									) ) }
									<Button
										className="ab-layout-selector-button-back"
										onClick={ () => {
											setAttributes( {
												columns: null,
											} );
											this.setState( { 'selectLayout' : true } );
										} }
									>
										<Dashicon icon="arrow-left-alt" /> { __( 'Return to Column Selection' ) }
									</Button>
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
