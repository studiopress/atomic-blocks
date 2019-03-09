/**
 * Inspector Controls
 */

 // Import icons
import icons from './icons';
import map from 'lodash/map';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

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
			},
			isSelected,
			className,
			setAttributes
		} = this.props;


		//let layoutOptions;
		const startlayoutOptions = [
			{ key: 'equal', col: 1, name: __( 'Row' ), icon: icons.row },
			{ key: 'equal', col: 2, name: __( 'Two: Equal' ), icon: icons.twocol },
		];


		const layoutOptions = [
			{ key: 'equal', col: 1, name: __( 'Row' ), icon: icons.row },
			{ key: 'equal', col: 2, name: __( 'Two: Equal' ), icon: icons.twocol },
			{ key: 'center-wide', col: 3, name: __( 'Three: Wide Center' ), icon: icons.widecenter, layout: 'wide-center' },
		];


		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Layout Columns', 'atomic-blocks' ) }
					value={ columns }
					onChange={ ( value ) => this.props.setAttributes( { columns: value } ) }
					min={ 1 }
					max={ 4 }
				/>
				<RangeControl
					label={ __( 'Layout Columns Gap', 'atomic-blocks' ) }
					value={ columnsGap }
					onChange={ ( value ) => this.props.setAttributes( { columnsGap: value } ) }
					min={ 0 }
					max={ 5 }
					step={ 1 }
				/>

				<ButtonGroup aria-label={ __( 'Column Layout' ) }>
					{ map( layoutOptions, ( { name, key, icon, col, layout } ) => (
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
			</PanelBody>
		</InspectorControls>
		);
	}
}
