/**
 * External dependencies.
 */
import classnames from 'classnames';
import Columns from './column-wrap';
import icons from './icons';
import Inspector from './inspector';
import columnLayouts from './column-layouts';
import memoize from 'memize';
import map from 'lodash/map';
import _times from 'lodash/times';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const {
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	withColors,
} = wp.editor;
const {
	Placeholder,
	ButtonGroup,
	Tooltip,
	Button,
} = wp.components;

/* Set allowed blocks and media. */
const ALLOWED_BLOCKS = [ 'atomic-blocks/ab-column' ];

/* Get the column template. */
const getLayoutTemplate = memoize( ( columns ) => {
	return _times( columns, () => [ 'atomic-blocks/ab-column' ] );
} );

class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			selectLayout: true,
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		let selectedRows = 1;

		if ( attributes.columns ) {
			selectedRows = parseInt( attributes.columns.toString().split('-') );
		}

		const columnOptions = [
			{
				name: __( '1 Column', 'atomic-blocks' ),
				key: 'one-column',
				columns: 1,
				icon: icons.oneEqual,
			},
			{
				name: __( '2 Columns', 'atomic-blocks' ),
				key: 'two-column',
				columns: 2,
				icon: icons.twoEqual
			},
			{
				name: __( '3 Columns', 'atomic-blocks' ),
				key: 'three-column',
				columns: 3,
				icon:icons.threeEqual
			},
			{
				name: __( '4 Columns', 'atomic-blocks' ),
				key: 'four-column',
				columns: 4,
				icon: icons.fourEqual
			},
			{
				name: __( '5 Columns', 'atomic-blocks' ),
				key: 'five-column',
				columns: 5,
				icon: icons.fiveEqual,
			},
			{
				name: __( '6 Columns', 'atomic-blocks' ),
				key: 'six-column',
				columns: 6,
				icon: icons.sixEqual,
			},
		];

		/* Show the layout placeholder. */
		if ( ! attributes.layout && this.state.selectLayout ) {
			return [
				<Placeholder
					key="placeholder"
					icon="welcome-widgets-menus"
					label={ attributes.columns ? __( 'Column Layout', 'atomic-blocks' ) : __( 'Column Number', 'atomic-blocks' ) }
					instructions={ attributes.columns ? sprintf( __( 'Select a layout for this column.', 'atomic-blocks' ) ) : __( 'Select the number of columns for this layout.', 'atomic-blocks' ) }
					className={ 'ab-layout-selector-placeholder' }
				>
					{ ! attributes.columns ?
						<ButtonGroup aria-label={ __( 'Select Row Columns', 'atomic-blocks' ) } className="ab-layout-selector-group">
							{ map( columnOptions, ( { name, key, icon, columns } ) => (
								<Tooltip text={ name } key={ key }>
									<div className="ab-layout-selector">
										<Button
											className="ab-layout-selector-button"
											isSmall
											onClick={ () => {
												setAttributes( {
													columns: columns,
													layout: columns === 1 || columns === 5 || columns === 6 ? key : null,
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
								aria-label={ __( 'Select Column Layout', 'atomic-blocks' ) } className="ab-layout-selector-group"
								>
								{ map( columnLayouts[ selectedRows ], ( { name, key, icon, col } ) => (
									<Tooltip text={ name } key={ key }>
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
									{ __( 'Return to Column Selection', 'atomic-blocks' ) }
								</Button>
							</ButtonGroup>
						</Fragment>
					}
				</Placeholder>
			];
		}

		return [
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ attributes.align }
					onChange={ align => setAttributes( { align } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
			</BlockControls>,
			<Inspector { ...this.props } key="inspector"/>,
			<Columns { ...this.props } key="columns">
				<div
					className={ classnames(
						'ab-layout-column-wrap-admin',
						'ab-block-layout-column-gap-' + attributes.columnsGap,
						attributes.responsiveToggle ? 'ab-is-responsive-column' : null,
					) }
				>
					<InnerBlocks
						template={ getLayoutTemplate( attributes.columns ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</Columns>
		];
	}
}

export default compose( [
	withColors(
		'backgroundColor',
		{ textColor: 'color' },
	),
] )( Edit );
