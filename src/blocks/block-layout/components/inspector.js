/**
 * Inspector Controls
 */

 // Import icons
import map from 'lodash/map';
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

			</Fragment>
		</InspectorControls>
		);
	}
}
