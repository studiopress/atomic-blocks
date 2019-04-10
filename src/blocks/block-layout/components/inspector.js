/**
 * Inspector Controls
 */

 // Import icons
import icons from './icons';
import map from 'lodash/map';
import layoutColumns from './layout-columns';
//import MarginSettings from './../../../utils/components/margin/margin';

// Setup the block
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;

// Import block components
const {
	InspectorControls,
} = wp.editor;

// Import Inspector components
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

		// Setup the attributes
		const {
			attributes: {
				columns,
				columnsGap,
				layoutClass,
				layout,
				marginTop,
				marginRight,
				marginBottom,
				marginLeft,
				responsiveToggle,
			},
			isSelected,
			className,
			setAttributes
		} = this.props;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		return (
		<InspectorControls key="inspector">
			<Fragment>
				{ layout &&
					// Show the column settings once a layout is selected
					<PanelBody>
						<ButtonGroup aria-label={ __( 'Column Layout', 'atomic-blocks' ) }>
							{ map( layoutColumns[ selectedRows ], ( { name, key, icon, col } ) => (
								<Tooltip text={ name }>
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

						{/* <RangeControl
							label={ __( 'Layout Columns', 'atomic-blocks' ) }
							value={ columns }
							onChange={ ( value ) => this.props.setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 6 }
						/> */}
						<RangeControl
							label={ __( 'Layout Columns Gap', 'atomic-blocks' ) }
							value={ columnsGap }
							onChange={ ( value ) => this.props.setAttributes( { columnsGap: value } ) }
							min={ 0 }
							max={ 5 }
							step={ 1 }
						/>
						<ToggleControl
							label={ __( 'Responsive Columns', 'atomic-blocks' ) }
							checked={ responsiveToggle }
							onChange={ () => this.props.setAttributes( { responsiveToggle: ! responsiveToggle } ) }
						/>
					</PanelBody>
				}
			</Fragment>
		</InspectorControls>
		);
	}
}
