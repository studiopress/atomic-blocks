/**
 * External dependencies.
 */
import RenderSettingControl from '../../utils/components/settings/renderSettingControl';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RangeControl } = wp.components;

export default function Margin( props ) {
	const {

		// Margin top props
		marginTop,
		marginTopLabel,
		marginTopMin,
		marginTopMax,
		marginEnableTop,
		onChangeMarginTop = () => {},

		// Margin right props
		marginRight,
		marginRightLabel,
		marginRightMin,
		marginRightMax,
		marginEnableRight,
		onChangeMarginRight = () => {},

		// Margin bottom props
		marginBottom,
		marginBottomLabel,
		marginBottomMin,
		marginBottomMax,
		marginEnableBottom,
		onChangeMarginBottom = () => {},

		// Margin left props
		marginLeft,
		marginLeftLabel,
		marginLeftMin,
		marginLeftMax,
		marginEnableLeft,
		onChangeMarginLeft = () => {},

		// Margin vertical props
		marginVertical,
		marginVerticalLabel,
		marginEnableVertical,
		marginVerticalMin,
		marginVerticalMax,
		onChangeMarginVertical = () => {},

		// Margin horizontal props
		marginHorizontal,
		marginHorizontalLabel,
		marginEnableHorizontal,
		marginHorizontalMin,
		marginHorizontalMax,
		onChangeMarginHorizontal = () => {}
	} = props;

	return (
		<Fragment>
			{ marginEnableTop && (
				<RenderSettingControl id="ab_marginTop">
					<RangeControl
						label={ marginTopLabel ? marginTopLabel : __( 'Margin Top', 'atomic-blocks' ) }
						value={ marginTop }
						min={ marginTopMin }
						max={ marginTopMax }
						onChange={ onChangeMarginTop }
					/>
				</RenderSettingControl>
			) }
			{ marginEnableRight && (
				<RenderSettingControl id="ab_marginRight">
					<RangeControl
						label={ marginRightLabel ? marginRightLabel : __( 'Margin Right', 'atomic-blocks' ) }
						value={ marginRight }
						min={ marginRightMin }
						max={ marginRightMax }
						onChange={ onChangeMarginRight }
					/>
				</RenderSettingControl>
			) }
			{ marginEnableBottom && (
				<RenderSettingControl id="ab_marginBottom">
					<RangeControl
						label={ marginBottomLabel ? marginBottomLabel : __( 'Margin Bottom', 'atomic-blocks' ) }
						value={ marginBottom }
						min={ marginBottomMin }
						max={ marginBottomMax }
						onChange={ onChangeMarginBottom }
					/>
				</RenderSettingControl>
			) }
			{ marginEnableLeft && (
				<RenderSettingControl id="ab_marginLeft">
					<RangeControl
						label={ marginLeftLabel ? marginLeftLabel : __( 'Margin Left', 'atomic-blocks' ) }
						value={ marginLeft }
						min={ marginLeftMin }
						max={ marginLeftMax }
						onChange={ onChangeMarginLeft }
					/>
				</RenderSettingControl>
			) }
			{ marginEnableVertical && (
				<RenderSettingControl id="ab_marginVertical">
					<RangeControl
						label={ marginVerticalLabel ? marginVerticalLabel : __( 'Margin Vertical', 'atomic-blocks' ) }
						value={ marginVertical }
						min={ marginVerticalMin }
						max={ marginVerticalMax }
						onChange={ onChangeMarginVertical }
					/>
				</RenderSettingControl>
			) }
			{ marginEnableHorizontal && (
				<RenderSettingControl id="ab_marginHorizontal">
					<RangeControl
						label={ marginHorizontalLabel ? marginHorizontalLabel : __( 'Margin Horizontal', 'atomic-blocks' ) }
						value={ marginHorizontal }
						min={ marginHorizontalMin }
						max={ marginHorizontalMax }
						onChange={ onChangeMarginHorizontal }
					/>
				</RenderSettingControl>
			) }
		</Fragment>
	);
}
