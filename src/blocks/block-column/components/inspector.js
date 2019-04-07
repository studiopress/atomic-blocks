/**
 * Inspector Controls.
 */

 /**
 * External dependencies.
 */
import map from 'lodash/map';
import columnLayouts from './column-layouts';
import Margin from './../../../utils/components/margin';
import Padding from './../../../utils/components/padding';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} = wp.editor;
const {
	PanelBody,
	RangeControl,
	ButtonGroup,
	Button,
	Tooltip,
	ToggleControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			textColor,
			setTextColor,
		} = this.props;

		let selectedRows = 1;

		if ( attributes.columns ) {
			selectedRows = parseInt( attributes.columns.toString().split('-') );
		}

		return (
			<InspectorControls key="inspector">
				{ attributes.layout &&
					/* Show the column settings once a layout is selected. */
					<PanelBody
						title={ __( 'General', 'atomic-blocks' ) }
						initialOpen={ true }
						className="ab-column-select-panel"
					>
						<p>{ __( 'Column Layout', 'atomic-blocks' ) }</p>
						<ButtonGroup aria-label={ __( 'Column Layout', 'atomic-blocks' ) }>
							{ map( columnLayouts[ selectedRows ], ( { name, key, icon, col } ) => (
								<Tooltip text={ name } key={ key }>
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
								</Tooltip>
							) ) }
						</ButtonGroup>
						<p><i>{ __( 'Change the layout of your columns.', 'atomic-blocks' ) }</i></p>

						<hr />

						<RangeControl
							label={ __( 'Column Gap', 'atomic-blocks' ) }
							help={ __( 'Adjust the spacing between columns.', 'atomic-blocks' ) }
							value={ attributes.columnsGap }
							onChange={ ( value ) => this.props.setAttributes( { columnsGap: value } ) }
							min={ 0 }
							max={ 10 }
							step={ 1 }
						/>

						<hr />

						<ToggleControl
							label={ __( 'Responsive Columns', 'atomic-blocks' ) }
							help={ __( 'Columns will be adjusted to fit on tablets and mobile devices.', 'atomic-blocks' ) }
							checked={ attributes.responsiveToggle }
							onChange={ () => this.props.setAttributes( { responsiveToggle: ! attributes.responsiveToggle } ) }
						/>
					</PanelBody>
				}
				<PanelBody
					title={ __( 'Margin and Padding', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Sync Margin', 'atomic-blocks' ) }
						help={ __( 'Top and bottom margins will have the same value.', 'atomic-blocks' ) }
						checked={ attributes.marginSync }
						onChange={ () => this.props.setAttributes( { marginSync: ! attributes.marginSync } ) }
					/>
					{ ! attributes.marginSync ?
						<Margin
							/* Margin top. */
							marginEnableTop={ true }
							marginTop={ attributes.marginTop }
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={ marginTop => setAttributes( { marginTop } ) }
							/* Margin bottom. */
							marginEnableBottom={ true }
							marginBottom={ attributes.marginBottom }
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={ marginBottom => setAttributes( { marginBottom } ) }
						/>
					:
						<Margin
							/* Margin top/bottom. */
							marginEnableVertical={ true }
							marginVerticalLabel={ __( 'Margin Top/Bottom', 'atomic-blocks' ) }
							marginVertical={ attributes.margin }
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={ margin => setAttributes( { margin } ) }
						/>
					}

					<hr />

					<ToggleControl
						label={ __( 'Sync Padding', 'atomic-blocks' ) }
						help={ __( 'Padding on all sides will have the same value.', 'atomic-blocks' ) }
						checked={ attributes.paddingSync }
						onChange={ () => this.props.setAttributes( { paddingSync: ! attributes.paddingSync } ) }
					/>

					{ ! attributes.paddingSync ?
						<Padding
							/* Padding top. */
							paddingEnableTop={ true }
							paddingTop={ attributes.paddingTop }
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={ paddingTop => setAttributes( { paddingTop } ) }
							/* Padding right. */
							paddingEnableRight={ true }
							paddingRight={ attributes.paddingRight }
							paddingRightMin="0"
							paddingRightMax="200"
							onChangePaddingRight={ paddingRight => setAttributes( { paddingRight } ) }
							/* Padding bottom. */
							paddingEnableBottom={ true }
							paddingBottom={ attributes.paddingBottom }
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={ paddingBottom => setAttributes( { paddingBottom } ) }
							/* Padding left. */
							paddingEnableLeft={ true }
							paddingLeft={ attributes.paddingLeft }
							paddingLeftMin="0"
							paddingLeftMax="200"
							onChangePaddingLeft={ paddingLeft => setAttributes( { paddingLeft } ) }
						/>
					:
						<Padding
							/* Padding. */
							paddingEnable={ true }
							padding={ attributes.padding }
							paddingMin="0"
							paddingMax="200"
							onChangePadding={ padding => setAttributes( { padding } ) }
						/>
					}
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'atomic-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'atomic-blocks' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'atomic-blocks' ),
						}
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}
