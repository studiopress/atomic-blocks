/**
 * Inspector Controls
 */

 // Import icons
import icons from './icons';
import map from 'lodash/map';
import layoutColumns from './layout-columns';
import Padding from './../../../utils/inspector/padding';
import MarginSettings from './../../../utils/components/margin/margin';
import marginAttributes from '../../../utils/components/margin/attributes';

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
	Toolbar,
	PanelBody,
	PanelRow,
	RangeControl,
	ButtonGroup,
	Button,
	Tooltip,
	Dashicon
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
			},
			isSelected,
			className,
			setAttributes
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<Fragment>
				{ layout &&
					// Show the column settings once a layout is selected
					<PanelBody>
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
					</PanelBody>
				}
				<PanelBody
					title={ __( 'Margin Settings', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<MarginSettings
						// Top margin
						marginEnableTop={ true }
						marginTop={ marginTop }
						marginTopMin="0"
						marginTopMax="100"
						onChangemarginTop={ marginTop => setAttributes( { marginTop } ) }
						// Right margin
						marginEnableRight={ false }
						marginRight={ marginRight }
						marginRightMin="0"
						marginRightMax="100"
						onChangemarginRight={ marginRight => setAttributes( { marginRight } ) }
						// Bottom margin
						marginEnableBottom={ true }
						marginBottom={ marginBottom }
						marginBottomMin="0"
						marginBottomMax="100"
						onChangemarginBottom={ marginBottom => setAttributes( { marginBottom } ) }
						// Left margin
						marginEnableLeft={ false }
						marginLeft={ marginLeft }
						marginLeftMin="0"
						marginLeftMax="100"
						onChangemarginLeft={ marginLeft => setAttributes( { marginLeft } ) }
					/>
				</PanelBody>
			</Fragment>
		</InspectorControls>
		);
	}
}
